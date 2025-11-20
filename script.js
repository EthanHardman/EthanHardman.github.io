// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navDrawer = document.querySelector(".nav-drawer");

if (navToggle && navDrawer) {
  navToggle.addEventListener("click", () => {
    const isOpen = navDrawer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    const iconUse = navToggle.querySelector("use");
    if (iconUse) {
      iconUse.setAttribute("href", isOpen ? "#icon-close" : "#icon-menu");
    }
  });

  // Close drawer when clicking a link
  navDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navDrawer.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      const iconUse = navToggle.querySelector("use");
      if (iconUse) iconUse.setAttribute("href", "#icon-menu");
    });
  });
}

// Helper: smooth scroll to section id
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Handle nav / buttons with data-section-link
document.querySelectorAll("[data-section-link]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const target = el.getAttribute("data-section-link");
    if (!target) return;

    // For portfolio: also expand extra content when navigating via nav/hero
    if (target === "portfolio") {
      const extra = document.getElementById("portfolio-extra");
      const toggleBtn = document.getElementById("portfolio-toggle");
      if (extra && toggleBtn && extra.hidden) {
        extra.hidden = false;
        toggleBtn.textContent = "Show less";
      }
    }

    scrollToSection(target);
  });
});

// Portfolio "See more / Show less" toggle
const portfolioToggle = document.getElementById("portfolio-toggle");
const portfolioExtra = document.getElementById("portfolio-extra");

if (portfolioToggle && portfolioExtra) {
  portfolioToggle.addEventListener("click", () => {
    const isHidden = portfolioExtra.hidden;
    portfolioExtra.hidden = !isHidden;
    portfolioToggle.textContent = isHidden ? "Show less" : "See more";
  });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
