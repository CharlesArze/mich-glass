import { ArrowUpRight } from "lucide-react";
import HlsVideo from "./HlsVideo";

const START_VIDEO =
  "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

const StartSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 500 }}>
      {/* HLS Video Background */}
      <HlsVideo
        src={START_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-[1]"
        style={{ height: 200, background: "linear-gradient(to top, transparent, black)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{ height: 200, background: "linear-gradient(to bottom, transparent, black)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-6">
          <span className="text-xs font-medium text-white font-body">How It Works</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-xl">
          You dream it. We ship it.
        </h2>

        <p className="mt-6 text-white/60 font-body font-light text-sm md:text-base max-w-md">
          Share your vision. Our AI handles the rest—wireframes, design, code, launch.
          All in days, not quarters.
        </p>

        <a
          href="#get-started"
          className="mt-8 liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2 transition-colors hover:bg-white/10"
        >
          Get Started
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default StartSection;