"use client";

const navLinks = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Resume",
  "Contact",
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          
          <div className="text-xl font-bold tracking-wide">
            <span className="text-cyan-400">ANU</span>
            <span className="text-white">.AI</span>
          </div>

          <ul className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="transition duration-300 hover:text-cyan-400"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400 transition hover:bg-cyan-400/20">
            Hire Me
          </button>
        </nav>
      </div>
    </header>
  );
}