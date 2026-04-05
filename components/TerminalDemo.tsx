'use client'

import { useEffect, useState, useCallback } from 'react'

const PORTFOLIO_URL = 'https://luma3-portfolio.vercel.app'

const TYPE_INTERVAL = 55
const LINE_INTERVAL = 360
const STREAM_HOLD = 900
const RESULT_HOLD = 4000
const CURSOR_INTERVAL = 530
const DEMO_HEIGHT = 360

interface SceneData {
  userText: string
  lines: string[]
}

const SCENES: SceneData[] = [
  {
    userText: '홈페이지 만들어줘',
    lines: [
      '◆ 프로젝트 구조 설계 중...',
      '  index.html 생성',
      '  style.css 생성',
      '  main.js 생성',
      '✓ 파일 3개 생성 완료',
      '✓ 서버 시작 → localhost:3000',
    ],
  },
  {
    userText: '/writing 여행 블로그 써줘',
    lines: [
      '◆ writing 스킬 실행 중...',
      '  제목: 교토 3일 여행기',
      '  도입부 작성 중...',
      '  본문 섹션 3개 추가...',
      '✓ 블로그 포스트 완성 (1,240자)',
      '✓ travel-blog.md → 네이버 블로그 발행',
    ],
  },
  {
    userText: '/drawing 그림 그려줘',
    lines: [
      '◆ drawing 스킬 실행 중...',
      '  주제 분석 중...',
      '  Midjourney 프롬프트 생성...',
      '  이미지 생성 중...',
      '✓ 이미지 4종 완성',
      '✓ drawing/ 폴더에 저장',
    ],
  },
]

const RESULT_LABELS = [
  { address: 'localhost:3000', label: '홈페이지' },
  { address: 'blog.naver.com/luma3', label: '블로그' },
  { address: 'luma3.vercel.app/work/design', label: '디자인' },
]

export default function TerminalDemo() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [visibleLineCount, setVisibleLineCount] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [resultOpen, setResultOpen] = useState(false)
  const [resultVisible, setResultVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const runScene = (idx: number) => {
      if (cancelled) return
      const sceneIdx = idx % SCENES.length
      const scene = SCENES[sceneIdx]
      const FADE_OUT = 420 // opacity transition 완료 대기

      // 1. 결과 패널 페이드 아웃 (첫 씬은 즉시)
      setResultVisible(false)

      // 2. 페이드 완료 후 콘텐츠 교체 및 씬 시작
      timeouts.push(setTimeout(() => {
        if (cancelled) return
        setResultOpen(false)
        setSceneIndex(sceneIdx)
        setTypedText('')
        setVisibleLineCount(0)

        // 3. 타이핑
        for (let i = 0; i < scene.userText.length; i++) {
          timeouts.push(setTimeout(() => {
            if (!cancelled) setTypedText(scene.userText.slice(0, i + 1))
          }, 300 + TYPE_INTERVAL * (i + 1)))
        }

        const typingDone = 300 + scene.userText.length * TYPE_INTERVAL

        // 4. 응답 스트리밍
        scene.lines.forEach((_, i) => {
          timeouts.push(setTimeout(() => {
            if (!cancelled) setVisibleLineCount(i + 1)
          }, typingDone + LINE_INTERVAL * (i + 1)))
        })

        const streamingDone = typingDone + scene.lines.length * LINE_INTERVAL + STREAM_HOLD

        // 5. 결과 패널 오픈 (모바일은 스킵)
        if (!isMobile) {
          timeouts.push(setTimeout(() => {
            if (!cancelled) {
              setResultOpen(true)
              setTimeout(() => { if (!cancelled) setResultVisible(true) }, 180)
            }
          }, streamingDone))
        }

        // 6. 다음 씬 예약
        timeouts.push(setTimeout(() => {
          if (!cancelled) runScene(idx + 1)
        }, streamingDone + RESULT_HOLD))

      }, idx === 0 ? 0 : FADE_OUT))
    }

    const cursorTimer = setInterval(() => {
      if (!cancelled) setShowCursor(c => !c)
    }, CURSOR_INTERVAL)

    runScene(0)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
      clearInterval(cursorTimer)
    }
  }, [])

  const scene = SCENES[sceneIndex]
  const visibleLines = scene.lines.slice(0, visibleLineCount)
  const resultLabel = RESULT_LABELS[sceneIndex]

  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl"
      style={{ background: '#0d1117', fontFamily: 'Cascadia Code, Consolas, monospace', height: isMobile ? 280 : DEMO_HEIGHT }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: resultOpen ? '42% 58%' : '100% 0%',
          transition: 'grid-template-columns 0.55s cubic-bezier(0.4,0,0.2,1)',
          height: isMobile ? 280 : DEMO_HEIGHT,
          overflow: 'hidden',
        }}
      >
        {/* Terminal */}
        <div className="flex flex-col min-w-0 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-3 shrink-0">
            <span className="h-5 w-0.5 rounded-full bg-white/80" />
            <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">claude</span>
          </div>
          <div className="flex-1 px-5 py-5 text-sm leading-7 overflow-hidden">
            <div className="flex items-start gap-2 text-zinc-100">
              <span className="text-zinc-500 shrink-0">$</span>
              <span className="break-all">{typedText}</span>
              <span
                className="inline-block w-[2px] h-4 bg-white mt-1 shrink-0"
                style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
              />
            </div>
            <div className="mt-4 space-y-1.5">
              {visibleLines.map((line, i) => {
                const isSuccess = line.startsWith('✓')
                const isLead = line.startsWith('◆')
                const isIndent = line.startsWith('  ')
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`shrink-0 w-3 ${isSuccess ? 'text-emerald-400' : isLead ? 'text-violet-300' : 'text-zinc-600'}`}>
                      {isIndent ? '' : line[0]}
                    </span>
                    <span className={`${isSuccess ? 'text-emerald-300' : isIndent ? 'text-zinc-400 pl-2' : 'text-zinc-300'}`}>
                      {isIndent ? line.trim() : line.slice(2)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div
          className="flex flex-col border-l border-white/10 overflow-hidden"
          style={{
            opacity: resultVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-800/60 px-3 py-2 shrink-0">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex-1 rounded bg-zinc-700/60 px-3 py-1 text-[10px] text-zinc-400 truncate">
              {resultLabel.address}
            </div>
          </div>

          {/* Content area */}
          <div className="relative flex-1 overflow-hidden">
            {sceneIndex === 0 && <PortfolioGridPanel />}
            {sceneIndex === 1 && <WritingPanel />}
            {sceneIndex === 2 && <DrawingPanel />}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioGridPanel() {
  return (
    <div className="absolute inset-0 bg-white overflow-hidden">
      <iframe
        src={PORTFOLIO_URL}
        title="포트폴리오"
        style={{
          width: 1280,
          height: 2400,
          transform: 'translateY(-700px) scale(0.37)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
          border: 'none',
        }}
      />
    </div>
  )
}

function _PortfolioGridPanelStatic() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#0a0a0a', fontFamily: 'system-ui, sans-serif', padding: 6 }}>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr auto', gap: 5, height: '100%' }}>
        {/* Row 1: VIDEO + MUSIC */}
        <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 5 }}>
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: 6, padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 9, color: '#f97316', fontWeight: 700, letterSpacing: 1 }}>VIDEO</span>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700, marginTop: 2 }}>영상</span>
            <span style={{ fontSize: 9, color: '#666', marginTop: 2, lineHeight: 1.4 }}>Motion graphics, cinematic edits, and generative video work.</span>
          </div>
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: 6, padding: '8px 10px' }}>
            <span style={{ fontSize: 9, color: '#f97316', fontWeight: 700, letterSpacing: 1 }}>MUSIC</span>
            <div style={{ marginTop: 8, background: '#1a1a1a', borderRadius: 4, padding: '6px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#222', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 7, color: '#ccc' }}>▶</span>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: '#ddd', fontWeight: 600 }}>CAFE SESSION</div>
                  <div style={{ fontSize: 8, color: '#555' }}>카페 세션</div>
                </div>
              </div>
              <div style={{ marginTop: 5, height: 2, background: '#222', borderRadius: 1 }}>
                <div style={{ width: '35%', height: '100%', background: '#f97316', borderRadius: 1 }} />
              </div>
            </div>
          </div>
        </div>
        {/* Row 2: DESIGN + DEVELOPMENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 6, padding: '8px 10px' }}>
            <span style={{ fontSize: 9, color: '#f97316', fontWeight: 700, letterSpacing: 1 }}>DESIGN</span>
            <div style={{ marginTop: 6, fontSize: 20, textAlign: 'center' }}>🐱</div>
            <span style={{ fontSize: 9, color: '#555', marginTop: 4, display: 'block', lineHeight: 1.4 }}>Visual identity, editorial layout, and interface design.</span>
          </div>
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: 6, padding: '8px 10px' }}>
            <span style={{ fontSize: 9, color: '#f97316', fontWeight: 700, letterSpacing: 1 }}>DEVELOPMENT</span>
            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>A</span>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 9, color: '#fff' }}>+</span>
              </div>
            </div>
            <span style={{ fontSize: 9, color: '#555', marginTop: 4, display: 'block', lineHeight: 1.4 }}>Web applications, automation tools, and multi-agent systems.</span>
          </div>
        </div>
        {/* Row 3: BUSINESS */}
        <div style={{ background: '#f8f5f0', border: '1px solid #e8e0d0', borderRadius: 6, padding: '6px 10px' }}>
          <span style={{ fontSize: 9, color: '#f97316', fontWeight: 700, letterSpacing: 1 }}>BUSINESS</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginTop: 4 }}>
            {[
              { icon: '◎', label: '전략' },
              { icon: '↑', label: '재무' },
              { icon: '✉', label: '마케팅' },
              { icon: '⊞', label: '생산' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#f97316' }}>{icon}</div>
                <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DrawingPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#1a1a1a', fontFamily: 'system-ui, sans-serif' }}>
      {/* Midjourney-style header */}
      <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: '#000' }}>M</span>
        </div>
        <span style={{ fontSize: 10, color: '#888' }}>Midjourney</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, color: '#555' }}>Imagine • 완료</span>
      </div>
      {/* Main image */}
      <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ background: '#2a2a2a', borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3' }}>
          <img
            src={`${PORTFOLIO_URL}/images/thumbnails/v1.jpg`}
            alt="generated"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
        {/* Prompt text */}
        <div style={{ fontSize: 9, color: '#666', lineHeight: 1.5, padding: '0 2px' }}>
          A group of tiny people harvesting giant mushrooms from a mossy forest floor. Fantasy atmosphere, warm dreamy lighting...
        </div>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['Vary', 'Upscale', 'Edit'].map(btn => (
            <div key={btn} style={{ flex: 1, background: '#2a2a2a', borderRadius: 4, padding: '3px 0', textAlign: 'center', fontSize: 9, color: '#aaa' }}>{btn}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WritingPanel() {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-white" style={{ fontFamily: '"Apple SD Gothic Neo", "Malgun Gothic", sans-serif' }}>
      {/* Naver Blog header */}
      <div style={{ background: '#03C75A', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontWeight: 900, fontSize: 14, color: '#fff', letterSpacing: '-0.5px' }}>N</span>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#fff' }}>블로그</span>
      </div>

      {/* Blog title bar */}
      <div style={{ background: '#f9f9f9', borderBottom: '1px solid #e8e8e8', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#333' }}>luma3의 블로그</span>
        <span style={{ fontSize: 10, color: '#03C75A', marginLeft: 'auto', fontWeight: 600 }}>이웃추가</span>
      </div>

      <div style={{ padding: '16px 18px' }}>
        {/* Post title */}
        <h1 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4, color: '#1a1a1a', marginBottom: 6 }}>
          교토 3일 여행기
        </h1>
        <p style={{ fontSize: 11, color: '#999', marginBottom: 14 }}>2026.04.03. 14:22 · 조회 128</p>

        {/* Tag */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {['여행', '교토', '일본'].map(tag => (
            <span key={tag} style={{ fontSize: 10, color: '#03C75A', background: '#f0fdf6', border: '1px solid #b7f0d0', borderRadius: 20, padding: '2px 8px' }}>{tag}</span>
          ))}
        </div>

        {/* Body */}
        <div style={{ fontSize: 12, lineHeight: 2, color: '#333', borderTop: '1px solid #eee', paddingTop: 14 }}>
          <p style={{ marginBottom: 12 }}>
            교토역에서 내리자마자 느껴지는 공기가 다르다. 서울의 빠른 리듬과는 달리, 이곳은 마치 시간이 조금 다른 속도로 흐르는 것 같다.
          </p>
          <p style={{ marginBottom: 12, color: '#555' }}>
            첫날은 기온 강변을 따라 걸었다. 저녁 무렵 강가에 놓인 평상 위로 제철 음식이 차려졌고, 강물 소리가 배경음악이 되어주었다.
          </p>
          <p style={{ color: '#777', fontSize: 11 }}>
            <strong style={{ color: '#555' }}>둘째 날 새벽 5시</strong>, 후시미 이나리의 붉은 도리이를 혼자 걸었다. 관광객이 없는 시간, 그 공간은 완전히 달랐다.
          </p>
        </div>
      </div>
    </div>
  )
}
