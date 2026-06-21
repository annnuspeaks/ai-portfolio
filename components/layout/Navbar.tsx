"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4">
      <div className="mx-auto max-w-7xl">
        <nav className="mt-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          
          <div className="flex items-center justify-between px-6 py-4">
            
            {/* Logo */}
            <div className="text-2xl font-bold tracking-wide">
              <span className="text-cyan-400">ANNU</span>
              <span className="text-white">.AI</span>
            </div>

            {/* Desktop Menu */}
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

            {/* Desktop CTA */}
            <button className="hidden md:block rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-400 transition hover:bg-cyan-400/20">
              Hire Me
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-cyan-400 text-3xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-white/10 px-6 py-4">
              <ul className="flex flex-col gap-5 text-slate-300">
                {navLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="block transition hover:text-cyan-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              <button className="mt-6 w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-3 text-cyan-400">
                Hire Me
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}