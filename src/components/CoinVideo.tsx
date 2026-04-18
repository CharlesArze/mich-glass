const CoinVideo = () => {
  return (
    <section className="w-full bg-black flex items-center justify-center py-2">
      <video
        className="w-1/2 sm:w-full max-w-xs object-contain"
        src="/video/coin.m4v"
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
};

export default CoinVideo;
