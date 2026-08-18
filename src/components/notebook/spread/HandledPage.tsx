import { motion } from "framer-motion";
import clsx from "clsx";

export function HandledPage({
  children,
  side,
  focused,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  focused?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotateY: side === "left" ? -2 : 2 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: focused ? 1.06 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx(
        "relative origin-center transition-transform",
        side === "left" ? "drop-shadow-[8px_18px_18px_rgba(0,0,0,0.35)]" : "drop-shadow-[-8px_18px_18px_rgba(0,0,0,0.35)]"
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-y-3 z-20 w-6 rounded-full blur-md",
          side === "left"
            ? "-right-2 bg-neutral-950/10"
            : "-left-2 bg-neutral-950/10"
        )}
      />

      <div
        className={clsx(
          "pointer-events-none absolute inset-0 z-20 rounded-xl",
          side === "left"
            ? "bg-gradient-to-l from-neutral-950/8 via-transparent to-transparent"
            : "bg-gradient-to-r from-neutral-950/8 via-transparent to-transparent"
        )}
      />

      {children}
    </motion.div>
  );
}
