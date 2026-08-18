import clsx from "clsx";

export function DamageOverlay({
  intensity = "medium",
}: {
  intensity?: "light" | "medium" | "heavy";
}) {
  const opacity =
    intensity === "heavy" ? "opacity-70" : intensity === "medium" ? "opacity-45" : "opacity-25";

  return (
    <div className={clsx("pointer-events-none absolute inset-0", opacity)}>
      <div className="absolute -right-10 top-10 h-48 w-32 rotate-12 rounded-full bg-amber-900/10 blur-2xl" />
      <div className="absolute bottom-12 left-2 h-40 w-24 rounded-full bg-blue-900/10 blur-xl" />
      <div className="absolute left-6 top-1/3 h-px w-[85%] rotate-[-1deg] bg-neutral-800/10" />
      <div className="absolute right-8 top-2/3 h-px w-[65%] rotate-[1.2deg] bg-neutral-800/10" />
    </div>
  );
}

export function HandlingSmudge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "pointer-events-none absolute h-16 w-28 rounded-full bg-neutral-800/10 blur-md",
        className
      )}
    />
  );
}

export function EdgeWear() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-neutral-900/10 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-amber-950/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-blue-950/10 to-transparent" />
      <div className="absolute -right-1 top-32 h-20 w-4 rounded-l-full bg-neutral-950/10" />
      <div className="absolute -left-1 bottom-40 h-16 w-3 rounded-r-full bg-neutral-950/10" />
    </div>
  );
}

function TapeGhost({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute rounded-sm border border-neutral-900/6 bg-neutral-900/3",
        className
      )}
    />
  );
}

export function RemovedFragmentResidue() {
  return (
    <div className="pointer-events-none absolute right-8 top-[18%]">
      <TapeGhost className="h-10 w-24 rotate-[4deg]" />

      <p className="mt-2 rotate-[1deg] text-[10px] italic text-neutral-800/16">
        page removed after ferry week
      </p>
    </div>
  );
}

export function RepeatedHandlingWear() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-[32%] h-36 w-5 rounded-r-full bg-neutral-950/6 blur-[1px]" />

      <div className="pointer-events-none absolute right-0 top-[42%] h-44 w-5 rounded-l-full bg-neutral-950/5 blur-[1px]" />

      <div className="pointer-events-none absolute bottom-12 left-[18%] h-2 w-52 rotate-[0.4deg] bg-neutral-950/4 blur-sm" />
    </>
  );
}

export function MissingPageReference() {
  return (
    <div className="pointer-events-none absolute bottom-14 right-10 rotate-[2deg] text-[10px] italic text-neutral-800/10">
      see missing page 19 for original version
    </div>
  );
}
