document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      body.classList.toggle("nav-open");
    });
  }

  // Close nav when clicking a link (on mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
      }
    });
  });

  // Scroll-based reveal animations (repeat on every enter/leave)
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // Portfolio "Have a listen" expanding detail
  const detailWrapper = document.getElementById("portfolio-detail-wrapper");
  const detailPanels = document.querySelectorAll(".portfolio-detail");
  const listenButtons = document.querySelectorAll(".listen-button");
  const closeButtons = document.querySelectorAll(".portfolio-detail-close");

  const openProjectDetail = (projectId) => {
    if (!detailWrapper) return;

    // Mark wrapper as open
    detailWrapper.classList.add("open");

    // Activate the matching panel
    detailPanels.forEach((panel) => {
      if (panel.dataset.projectDetail === projectId) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    // Smooth scroll to the detail area
    const rect = detailWrapper.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset - 72; // account for sticky header
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  const closeProjectDetail = () => {
    if (!detailWrapper) return;

    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      const rect = portfolioSection.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - 72; // sticky header

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Give the scroll a moment to start, then hide
    setTimeout(() => {
      detailWrapper.classList.remove("open");
      detailPanels.forEach((panel) => panel.classList.remove("active"));
    }, 400);
  };

  listenButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.dataset.project;
      if (projectId) {
        openProjectDetail(projectId);
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeProjectDetail);
  });

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scroll for internal anchor links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        const rect = targetEl.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset - 72; // sticky header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Basic client-side handling of booking form (no backend yet)
  const bookingForm = document.querySelector(".booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Thanks for your booking request! This demo form doesn’t send yet, but you can connect it to a service (Formspree, Netlify Forms, etc.) when you’re ready."
      );
    });
  }
});
