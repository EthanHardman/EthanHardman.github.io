// Mobile nav toggle
function toggleMobileNav(forceState) {
  const nav = document.getElementById("mobileNav");
  if (!nav) return;

  if (typeof forceState === "boolean") {
    nav.style.display = forceState ? "flex" : "none";
    return;
  }
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// Shrink header on scroll
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;

  function onScroll() {
    const current = window.scrollY;
    if (current > 40) {
      header.classList.add("compact");
    } else {
      header.classList.remove("compact");
    }
    lastScrollY = current;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Reveal-on-scroll animations
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !reveals.length) {
    reveals.forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// Set current year in footer
(function () {
  const span = document.getElementById("year");
  if (span) span.textContent = new Date().getFullYear();
})();
