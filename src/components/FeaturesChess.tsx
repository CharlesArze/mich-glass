import feature1 from "@/assets/feature-1.gif";
import feature2 from "@/assets/feature-2.gif";

const rows = [
  {
    title: "Designed to convert. Built to perform.",
    body: "Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all.",
    button: "Learn more",
    gif: feature1,
    reverse: false,
  },
  {
    title: "It gets smarter. Automatically.",
    body: "Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.",
    button: "See how it works",
    gif: feature2,
    reverse: true,
  },
];

const FeaturesChess = () => {
  return (
    <section className="bg-black px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 mb-6">
            <span className="text-xs font-medium text-white font-body">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Pro features. Zero complexity.
          </h2>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-20">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                row.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-heading italic text-white leading-tight">
                  {row.title}
                </h3>
                <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed">
                  {row.body}
                </p>
                <div>
                  <a
                    href="#learn"
                    className="inline-block liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body transition-colors hover:bg-white/10"
                  >
                    {row.button}
                  </a>
                </div>
              </div>

              {/* GIF */}
              <div className="flex-1">
                <div className="liquid-glass rounded-2xl overflow-hidden">
                  <img
                    src={row.gif}
                    alt={row.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesChess;