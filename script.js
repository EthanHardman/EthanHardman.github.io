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

// Helper: expand a section's "full" content and scroll to it
function expandSection(sectionName) {
  if (!sectionName) return;
  const section = document.querySelector(`[data-section="${sectionName}"]`);
  if (!section) return;

  const full = section.querySelector(`[data-section-full="${sectionName}"]`);
  if (full && full.hidden) {
    full.hidden = false;
    // update toggle button text if present
    const toggleBtn = section.querySelector(`[data-section-toggle="${sectionName}"]`);
    if (toggleBtn) toggleBtn.textContent = "Show less";
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Top nav and hero buttons using data-section-link
document.querySelectorAll("[data-section-link]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionName = el.getAttribute("data-section-link");
    if (sectionName === "top") {
      document.getElementById("home").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    expandSection(sectionName);
  });
});

// "See more" / "Show less" toggles
document.querySelectorAll("[data-section-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const sectionName = btn.getAttribute("data-section-toggle");
    const section = document.querySelector(`[data-section="${sectionName}"]`);
    if (!section) return;
    const full = section.querySelector(`[data-section-full="${sectionName}"]`);
    if (!full) return;

    const isHidden = full.hidden;
    full.hidden = !isHidden;
    btn.textContent = isHidden ? "Show less" : "See more";
  });
});

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
