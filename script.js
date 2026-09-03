"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeNavbar();
  initializeBackToTop();
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
