type StepCardProps = {
  step: string;
  title: string;
  children: React.ReactNode;
};

export default function StepCard({ step, title, children }: StepCardProps) {
  return (
    <section className="my-6 rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
      <p className="text-xs font-semibold tracking-wide text-emerald-300">{step}</p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-100">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-zinc-300">{children}</div>
    </section>
  );
}
