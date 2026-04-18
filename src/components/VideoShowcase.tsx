const VideoShowcase = () => {
  return (
    <section
      className="relative overflow-hidden w-full"
      style={{ height: "clamp(400px, 60vw, 900px)", marginTop: "-120px" }}
    >
      <img
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scale(1.0)", transformOrigin: "center center" }}
        src="/video/Mi.png"
        alt=""
      />
      {/* Vignette top */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, black, transparent)" }} />
      {/* Vignette bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, black, transparent)" }} />
      {/* Vignette sides */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(to right, black, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(to left, black, transparent)" }} />
    </section>
  );
};

export default VideoShowcase;
