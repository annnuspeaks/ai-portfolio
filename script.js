"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeNavbar();
  initializeBackToTop();
  initializeHero();
  initializeHighlights();
  initializeFeaturedProjects();
  initializeProjects();
  initializeGallery();
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

function initializeHighlights() {
  const cards = document.querySelectorAll(".highlight-card");
  const counters = document.querySelectorAll("[data-counter]");

  if (!cards.length) return;

  const formatValue = (value, decimals, suffix) => {
    const formatted = value.toFixed(decimals);
    return `${formatted}${suffix}`;
  };

  const animateCounter = (element) => {
    const target = Number(element.dataset.counter);
    const decimals = Number(element.dataset.decimals || 0);
    const suffix = element.dataset.suffix || "";
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      element.textContent = formatValue(value, decimals, suffix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = formatValue(target, decimals, suffix);
      }
    };

    requestAnimationFrame(tick);
  };

  const reveal = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      if (!entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
      }

      observer.unobserve(entry.target);
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(reveal, {
    threshold: 0.25,
  });

  counters.forEach((counter) => observer.observe(counter));
}

function initializeFeaturedProjects() {
  const section = document.querySelector(".featured-projects");

  if (!section) return;

  const cards = section.querySelectorAll(".project-teaser-card");

  if (!cards.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    },
  );

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
    observer.observe(card);
  });
}

function initializeProjects() {
  const section = document.querySelector(".projects-section");

  if (!section) return;

  const cards = section.querySelectorAll(".project-card");

  if (!cards.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    },
  );

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 70}ms`;
    observer.observe(card);
  });
}

function initializeGallery() {
  const galleries = document.querySelectorAll("[data-gallery]");

  if (!galleries.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  galleries.forEach((gallery) => {
    const slides = gallery.querySelectorAll(".gallery-slide");
    const dots = gallery.querySelectorAll(".gallery-dot");
    const prevButton = gallery.querySelector(".gallery-prev");
    const nextButton = gallery.querySelector(".gallery-next");
    const currentCounter = gallery.querySelector(".gallery-current");
    const totalCounter = gallery.querySelector(".gallery-total");
    const slideshow = gallery.querySelector(".gallery-slideshow");

    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;
    let isHovered = false;

    if (totalCounter) {
      totalCounter.textContent = String(slides.length).padStart(2, "0");
    }

    const showSlide = (index) => {
      currentIndex =
        (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle(
          "is-active",
          slideIndex === currentIndex,
        );
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle(
          "is-active",
          dotIndex === currentIndex,
        );
      });

      if (currentCounter) {
        currentCounter.textContent = String(
          currentIndex + 1,
        ).padStart(2, "0");
      }
    };

    const nextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const previousSlide = () => {
      showSlide(currentIndex - 1);
    };

    const stopAutoSlide = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const startAutoSlide = () => {
      if (reduceMotion || slides.length <= 1) return;

      stopAutoSlide();

      timer = setInterval(() => {
        if (!isHovered) {
          nextSlide();
        }
      }, 2500);
    };

    const restartAutoSlide = () => {
      startAutoSlide();
    };

    nextButton?.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });

    prevButton?.addEventListener("click", () => {
      previousSlide();
      restartAutoSlide();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoSlide();
      });
    });

    slideshow?.addEventListener("mouseenter", () => {
      isHovered = true;
    });

    slideshow?.addEventListener("mouseleave", () => {
      isHovered = false;
    });

    slideshow?.addEventListener("focusin", () => {
      isHovered = true;
    });

    slideshow?.addEventListener("focusout", () => {
      isHovered = false;
    });

    showSlide(0);
    startAutoSlide();
  });
}
