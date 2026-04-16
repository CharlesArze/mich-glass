const VideoShowcase = () => {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "500px" }}>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/showcase.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
};

export default VideoShowcase;
