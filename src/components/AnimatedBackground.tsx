export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-radial" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,55,93,0.38),transparent_68%)]" />
      <img
        src="/logo-transparent.png"
        alt=""
        className="absolute left-1/2 top-[42%] w-[min(78vw,760px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.24] brightness-[0.72] saturate-[1.2] blur-[0.2px] sm:w-[min(62vw,820px)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(5,13,31,0.74)_100%)]" />
    </div>
  );
}

export function DimmedBackground() {
  return <div className="pointer-events-none fixed inset-0 -z-10 bg-ink-radial" aria-hidden="true" />;
}
