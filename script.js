"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeNavbar();
  initializeBackToTop();
  initializeHero();
});

function initializeNavbar() {
  const toggle = document.getElementById("navToggle");
  const menu = document.querySelector(".nav-menu");
  const links = document.querySelectorAll(".nav-link");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

function initializeBackToTop() {
  const button = document.getElementById("backToTop");

  if (!button) return;

  button.hidden = true;

  window.addEventListener(
    "scroll",
    () => {
      button.hidden = window.scrollY < 400;
    },
    { passive: true },
  );

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initializeHero() {
  const hero = document.getElementById("heroVanta");

  if (!hero) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (
    typeof window.VANTA === "undefined" ||
    typeof window.VANTA.NET === "undefined" ||
    typeof window.THREE === "undefined"
  ) {
    return;
  }

  window.VANTA.NET({
    el: hero,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: 200,
    minWidth: 200,

    scale: 1,
    scaleMobile: 1,

    backgroundColor: 0x0b0d10,
    color: 0x3da9ff,
    color2: 0x1d5f91,

    points: 10,
    maxDistance: 20,
    spacing: 18,

    showDots: true,

    mouseEase: true,
  });
}
