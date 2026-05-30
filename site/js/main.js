/* 25th Studio — interactions */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu after tapping a link (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Hide the sticky mobile bar once the contact section is on screen ---- */
  var mobileCta = document.querySelector(".mobile-cta");
  var contact = document.getElementById("contact");
  if (mobileCta && contact && "IntersectionObserver" in window) {
    var ctaObserver = new IntersectionObserver(
      function (entries) {
        mobileCta.classList.toggle("is-hidden", entries[0].isIntersecting);
      },
      { threshold: 0.18 }
    );
    ctaObserver.observe(contact);
  }

  /* ---- Gallery lightbox (click to preview) ---- */
  var lightbox = document.getElementById("lightbox");
  var galleryFigures = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-item")
  );

  if (lightbox && galleryFigures.length) {
    var lbImg = lightbox.querySelector(".lightbox__img");
    var lbCaption = lightbox.querySelector(".lightbox__caption");
    var btnClose = lightbox.querySelector(".lightbox__close");
    var btnPrev = lightbox.querySelector(".lightbox__nav--prev");
    var btnNext = lightbox.querySelector(".lightbox__nav--next");

    // Build a list of {src, caption} from the gallery (use full-res src)
    var items = galleryFigures.map(function (fig) {
      var img = fig.querySelector("img");
      var cap = fig.querySelector("figcaption");
      return {
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") || "",
        caption: cap ? cap.textContent : ""
      };
    });
    var current = 0;

    function show(i) {
      current = (i + items.length) % items.length;
      var item = items[current];
      lbImg.setAttribute("src", item.src);
      lbImg.setAttribute("alt", item.alt);
      lbCaption.textContent = item.caption;
    }

    function open(i) {
      show(i);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      btnClose.focus();
    }

    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
    }

    galleryFigures.forEach(function (fig, i) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "Open larger image");
      fig.addEventListener("click", function () { open(i); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });

    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", function () { show(current - 1); });
    btnNext.addEventListener("click", function () { show(current + 1); });

    // Click on the dark backdrop (not the image/buttons) closes
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) { close(); }
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) { return; }
      if (e.key === "Escape") { close(); }
      else if (e.key === "ArrowLeft") { show(current - 1); }
      else if (e.key === "ArrowRight") { show(current + 1); }
    });

    // Swipe navigation on touch devices
    var touchX = null;
    lightbox.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchX === null) { return; }
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) { show(current + (dx < 0 ? 1 : -1)); }
      touchX = null;
    }, { passive: true });
  }

  /* ---- Current year in footer ---- */
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }
})();
