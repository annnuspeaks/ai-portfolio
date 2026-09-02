"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeNavbar();
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

function initializeTheme() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  }

  updateThemeButton(toggle);

  toggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme || "dark";

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton(toggle);
  });
}

function updateThemeButton(button) {
  const isLight = document.documentElement.dataset.theme === "light";

  button.textContent = isLight ? "☀" : "☾";

  button.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme",
  );
}
