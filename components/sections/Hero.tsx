export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <div className="mx-auto max-w-6xl text-center">

        <p className="mb-4 text-cyan-400 uppercase tracking-[0.3em]">
          Machine Learning Engineer
        </p>

        <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
          Building
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
            {" "}
            AI Systems{" "}
          </span>
          For Real World Impact
        </h1>

        <p className="mx-auto max-w-3xl text-lg text-slate-400 md:text-xl">
          AI Engineer, Machine Learning Practitioner, and Data Science Enthusiast
          building production-ready intelligent systems, MLOps pipelines,
          forecasting platforms, recommendation engines, and generative AI
          solutions.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-2xl bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:scale-105">
            View Projects
          </button>

          <button className="rounded-2xl border border-white/20 px-8 py-4 font-semibold transition hover:border-cyan-400">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}