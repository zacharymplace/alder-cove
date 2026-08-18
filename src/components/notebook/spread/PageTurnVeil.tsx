import { motion } from "framer-motion";

export function PageTurnVeil({ direction }: { direction: "previous" | "next" | null }) {
  if (!direction) return null;

  return (
    <motion.div
      key={direction}
      initial={{
        opacity: 0,
        x: direction === "next" ? 80 : -80,
        rotateY: direction === "next" ? -12 : 12,
      }}
      animate={{
        opacity: [0, 0.18, 0],
        x: 0,
        rotateY: 0,
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 z-30 rounded-xl bg-[#f0dfad]"
    />
  );
}
