import Image from 'next/image';

export default function LoaderPreview() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0d1b2e] text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,201,106,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_38%)]" />

        <div className="relative z-10 flex w-full max-w-4xl items-center justify-center">
          <div className="relative h-[min(72vw,420px)] w-[min(72vw,420px)]">
            <div className="absolute inset-0 rounded-full bg-[#081424]/45 blur-3xl" />

            <div className="loader-piece inficir-left-piece absolute inset-0">
              <Image
                src="/loader/leftlogo.png"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 72vw, 420px"
                className="object-contain"
              />
            </div>

            <div className="loader-piece inficir-right-piece absolute inset-0">
              <Image
                src="/loader/rightlogo.png"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 72vw, 420px"
                className="object-contain"
              />
            </div>
          </div>

        </div>

        <div className="absolute bottom-4 right-4 hidden w-28 overflow-hidden rounded-xl border border-white/10 opacity-40 shadow-2xl sm:block">
          <Image
            src="/loader/illus.jpg"
            alt="Loader animation reference"
            width={832}
            height={1255}
            className="h-auto w-full"
          />
        </div>
      </section>

      <style>{`
        .loader-piece {
          transform-origin: 50% 50%;
          will-change: transform;
          filter: drop-shadow(0 24px 42px rgba(0, 0, 0, 0.28));
        }

        .inficir-left-piece {
          animation: inficir-left-loop 2.8s linear infinite;
        }

        .inficir-right-piece {
          animation: inficir-right-loop 2.8s linear infinite;
        }

        @keyframes inficir-left-loop {
          0%, 71.43%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          75% { transform: translate3d(-5%, -4%, 0) scale(0.998); }
          78.57% { transform: translate3d(-13%, -7%, 0) scale(0.994); }
          82.14% { transform: translate3d(-20%, -4%, 0) scale(0.99); }
          85.71% { transform: translate3d(-23%, 0, 0) scale(0.988); }
          89.29% { transform: translate3d(-20%, 4%, 0) scale(0.99); }
          92.86% { transform: translate3d(-13%, 7%, 0) scale(0.994); }
          96.43% { transform: translate3d(-5%, 4%, 0) scale(0.998); }
        }

        @keyframes inficir-right-loop {
          0%, 71.43%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          75% { transform: translate3d(5%, 4%, 0) scale(0.998); }
          78.57% { transform: translate3d(13%, 7%, 0) scale(0.994); }
          82.14% { transform: translate3d(20%, 4%, 0) scale(0.99); }
          85.71% { transform: translate3d(23%, 0, 0) scale(0.988); }
          89.29% { transform: translate3d(20%, -4%, 0) scale(0.99); }
          92.86% { transform: translate3d(13%, -7%, 0) scale(0.994); }
          96.43% { transform: translate3d(5%, -4%, 0) scale(0.998); }
        }

        .infi-left-piece {
          animation: infi-left-loop 5.6s ease-in-out infinite;
        }

        .infi-right-piece {
          animation: infi-right-loop 5.6s ease-in-out infinite;
        }

        @keyframes infi-left-loop {
          0%, 35.71%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          51.78% { transform: translate3d(-22%, -13%, 0) scale(0.985); }
          67.85% { transform: translate3d(-38%, 0, 0) scale(0.97); }
          83.92% { transform: translate3d(-22%, 13%, 0) scale(0.985); }
        }

        @keyframes infi-right-loop {
          0%, 35.71%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          51.78% { transform: translate3d(22%, 13%, 0) scale(0.985); }
          67.85% { transform: translate3d(38%, 0, 0) scale(0.97); }
          83.92% { transform: translate3d(22%, -13%, 0) scale(0.985); }
        }

        /* Zigga and infi are preserved as alternates: swap the active classes above to test them. */
        .zigga-left-piece {
          animation: zigga-left-infinity 4.6s ease-in-out infinite;
        }

        .zigga-right-piece {
          animation: zigga-right-infinity 4.6s ease-in-out infinite;
        }

        @keyframes zigga-left-infinity {
          0%, 43.48%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          57.61% { transform: translate3d(-18%, -12%, 0) scale(0.98); }
          71.74% { transform: translate3d(0, 0, 0) scale(1); }
          85.87% { transform: translate3d(-18%, 12%, 0) scale(0.98); }
        }

        @keyframes zigga-right-infinity {
          0%, 43.48%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          57.61% { transform: translate3d(18%, 12%, 0) scale(0.98); }
          71.74% { transform: translate3d(0, 0, 0) scale(1); }
          85.87% { transform: translate3d(18%, -12%, 0) scale(0.98); }
        }

        @media (prefers-reduced-motion: reduce) {
          .inficir-left-piece,
          .inficir-right-piece,
          .infi-left-piece,
          .infi-right-piece,
          .zigga-left-piece,
          .zigga-right-piece {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
