// Shrinking nav + shrinking hero
(function () {
  const header = document.querySelector(".site-header");

  function onScroll() {
    let y = window.scrollY;

    if (y > 40) header.classList.add("compact");
    else header.classList.remove("compact");

    if (y > 120) document.body.classList.add("body-scrolled-hero");
    else document.body.classList.remove("body-scrolled-hero");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach((el) => io.observe(el));
})();

