import clsx from "clsx";

export function Tape({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "absolute h-5 w-20 rotate-[-5deg] bg-neutral-100/45 shadow-sm",
        "before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.35)_0_3px,transparent_3px_8px)]",
        className
      )}
    />
  );
}

export function Sticker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700/30 bg-white/55 text-lg shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TapedFragment({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("relative rounded-sm bg-[#f4e7bd] p-4 shadow-md", className)}>
      <Tape className="-top-2 left-8" />
      {children}
    </div>
  );
}
