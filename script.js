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
    {
      threshold: 0.18
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
