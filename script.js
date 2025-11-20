// Mobile nav toggle
function toggleMobileNav(force) {
  const nav = document.getElementById("mobileNav");
  if (!nav) return;

  if (typeof force === "boolean") {
    nav.style.display = force ? "flex" : "none";
    return;
  }

  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// Header + big logo scroll behaviour
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function onScroll() {
    const y = window.scrollY;

    if (y > 40) {
      header.classList.add("compact");
    } else {
      header.classList.remove("compact");
    }

    if (y > 120) {
      document.body.classList.add("body-scrolled-hero");
    } else {
      document.body.classList.remove("body-scrolled-hero");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Reveal-on-scroll
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  els.forEach((el) => io.observe(el));
})();

// Footer year
(function () {
  const span = document.getElementById("year");
  if (span) span.textContent = new Date().getFullYear();
})();
