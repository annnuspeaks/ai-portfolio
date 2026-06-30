/* ======================================================
   AI Portfolio
   Main Script
====================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();

  initializeNavigation();

  initializeSmoothScroll();
});

/* ======================================================
        LOAD HTML COMPONENTS
====================================================== */

async function loadComponents() {
  const components = [
    "navbar",
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "resume",
    "contact",
    "footer",
  ];

  for (const component of components) {
    const element = document.getElementById(component);

    if (!element) continue;

    try {
      const response = await fetch(`components/${component}.html`);

      element.innerHTML = await response.text();
    } catch (error) {
      console.error(`Failed to load ${component}.html`, error);
    }
  }
}

/* ======================================================
        ACTIVE NAVBAR
====================================================== */

function initializeNavigation() {
  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;

      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

/* ======================================================
        SMOOTH SCROLL
====================================================== */

function initializeSmoothScroll() {
  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="#"]');

    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 80,

      behavior: "smooth",
    });
  });
}
