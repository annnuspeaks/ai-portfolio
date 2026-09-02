"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
});

function initializeTheme() {
    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
    }

    updateThemeButton(toggle);

    toggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.dataset.theme || "dark";

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("portfolio-theme", newTheme);

        updateThemeButton(toggle);
    });
}

function updateThemeButton(button) {
    const isLight =
        document.documentElement.dataset.theme === "light";

    button.textContent = isLight ? "☀" : "☾";
    button.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
}