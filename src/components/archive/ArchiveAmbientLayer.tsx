export function ArchiveAmbientLayer() {
  return (
    <>
      <style jsx global>{`
        @keyframes archiveLight {
          0%,
          100% {
            opacity: 0.55;
          }

          45% {
            opacity: 0.85;
          }

          70% {
            opacity: 0.42;
          }
        }

        @keyframes paperSettle {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
            opacity: 0.18;
          }

          50% {
            transform: translateY(3px) rotate(0.4deg);
            opacity: 0.32;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-10 animate-[archiveLight_9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_62%_18%,rgba(255,220,150,0.045),transparent_32%)]" />

      <div className="pointer-events-none fixed left-[42%] top-[18%] z-20 h-px w-40 animate-[paperSettle_7s_ease-in-out_infinite] bg-amber-100/8" />

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-20 -translate-x-1/2 text-[9px] uppercase tracking-[0.28em] text-neutral-700/45">
        room tone · paper settling · archive light unstable
      </div>
    </>
  );
}
