import HlsVideo from "./HlsVideo";

const CTA_VIDEO =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const CTAFooter = () => {
  return (
    <section className="relative overflow-hidden">
      {/* HLS Video Background */}
      <HlsVideo
        src={CTA_VIDEO}
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
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-32">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] max-w-2xl">
          Your next website starts here.
        </h2>

        <p className="mt-6 text-white/60 font-body font-light text-sm md:text-base max-w-md">
          Book a free strategy call. See what AI-powered design can do.
          No commitment, no pressure. Just possibilities.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <a
            href="#book"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body transition-colors hover:bg-white/10"
          >
            Book a Call
          </a>
          <a
            href="#pricing"
            className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body transition-colors hover:bg-white/90"
          >
            View Pricing
          </a>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-xs font-body">
            © 2026 Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/40 text-xs font-body hover:text-white/60 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;