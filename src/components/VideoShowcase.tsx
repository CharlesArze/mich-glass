const VideoShowcase = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "500px",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/listomierda.m4v"
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
};

export default VideoShowcase;
