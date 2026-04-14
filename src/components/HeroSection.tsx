const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4";

const navLinks = ["Work", "Services", "About", "Blog", "Contact"];

const CornerAccent = ({ className }: { className: string }) => (
  <span className={`absolute w-[7px] h-[7px] bg-foreground ${className}`} />
);

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden font-barlow">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-10 py-6">
          <span className="text-xl font-semibold tracking-tight text-foreground">
            STUDIO
          </span>
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-foreground transition-colors hover:bg-white/10 rounded px-3 py-1.5"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden rounded-[2px] bg-[#f8f8f8] px-5 py-2 text-sm font-medium text-[#171717] transition-colors hover:bg-white md:inline-block"
          >
            Get in Touch
          </a>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-1 flex-col items-center justify-end pb-[250px]">
          {/* Fortune Badge */}
          <div className="mb-10 rounded-full bg-white/10 px-1 py-1 backdrop-blur-sm">
            <div className="rounded-full bg-white/90 px-5 py-1.5 backdrop-blur-md">
              <span className="text-xs font-medium tracking-wide text-[#171717]">
                ✦ Featured in Fortune
              </span>
            </div>
          </div>

          {/* Headline container with corner accents */}
          <div className="relative px-8 py-6">
            <CornerAccent className="top-0 left-0" />
            <CornerAccent className="top-0 right-0" />
            <CornerAccent className="bottom-0 left-0" />
            <CornerAccent className="bottom-0 right-0" />

            <h1 className="text-center">
              <span className="block text-[64px] font-light leading-tight text-foreground">
                Agency that makes your
              </span>
              <span className="block font-instrument text-[64px] italic leading-tight text-foreground">
                videos &amp; reels viral
              </span>
            </h1>
          </div>

          {/* Sub-headline */}
          <p className="mt-6 max-w-lg text-center text-base leading-relaxed text-foreground/75">
            We craft scroll-stopping content that drives millions of organic
            views, turning brands into cultural conversations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4">
            <a
              href="#work"
              className="rounded-[2px] bg-[#f8f8f8] px-7 py-3 text-sm font-medium text-[#171717] transition-colors hover:bg-white"
            >
              View Our Work
            </a>
            <a
              href="#services"
              className="rounded-[2px] border border-white/20 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
