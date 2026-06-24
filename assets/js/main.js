document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.toggleAttribute("aria-current", active);
  });
};

if ("IntersectionObserver" in window && sections.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveLink(visible.target.id);
    },
    { rootMargin: "-38% 0px -52% 0px", threshold: [0.1, 0.35, 0.65] }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const revealAll = () => revealItems.forEach((item) => item.classList.add("is-visible"));

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealAll();
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

reducedMotion.addEventListener("change", (event) => {
  if (event.matches) revealAll();
});
const highlightImages = [
  "assets/img/highlights/4ab2c802-1ef7-4d66-bb03-0563a2a13c1e.jpg",
  "assets/img/highlights/a6e88e4e-4fe9-4ccf-be59-9f54d75703ee.jpg",
  "assets/img/highlights/b3e91310-ae95-4f5d-8a2e-31e9c8232bb5.jpg",
  "assets/img/highlights/b9c3c19c-5eb9-4399-803f-af5c9b2493a0.jpg",
  "assets/img/highlights/f0169173-4bbe-4bb7-bfdf-7933467b1492.jpg"
];

const carousel = document.querySelector("[data-carousel]");
const carouselViewport = document.querySelector("[data-carousel-viewport]");
const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselLightbox = document.querySelector("[data-carousel-lightbox]");
const carouselLightboxImage = document.querySelector("[data-carousel-lightbox-image]");
const carouselLightboxClose = document.querySelector("[data-carousel-lightbox-close]");
const carouselState = {
  offset: 0,
  setWidth: 0,
  speed: 0,
  paused: false,
  dragging: false,
  didDrag: false,
  dragStartX: 0,
  dragStartOffset: 0,
  lastTime: null,
  previousFocus: null
};

const describeHighlight = (index) => `Career highlight ${index + 1} from Jonh Ryan Coranes workplace experience`;

const renderCarousel = () => {
  if (!carouselTrack) return;

  if (highlightImages.length === 0) {
    carouselTrack.innerHTML = `<p class="carousel-empty">Career highlight images will appear here once files are added to assets/img/highlights.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  const repeatedImages = [...highlightImages, ...highlightImages, ...highlightImages];

  repeatedImages.forEach((src, index) => {
    const originalIndex = index % highlightImages.length;
    const card = document.createElement("button");
    card.className = "carousel-card";
    card.type = "button";
    card.dataset.carouselIndex = String(originalIndex);
    card.setAttribute("aria-label", `Expand ${describeHighlight(originalIndex)}`);

    const image = document.createElement("img");
    image.src = src;
    image.alt = describeHighlight(originalIndex);
    image.loading = index < highlightImages.length ? "eager" : "lazy";
    image.decoding = "async";
    image.draggable = false;

    card.append(image);
    fragment.append(card);
  });

  carouselTrack.append(fragment);
};

const measureCarousel = () => {
  if (!carouselTrack || highlightImages.length === 0) return;
  const cards = Array.from(carouselTrack.querySelectorAll(".carousel-card"));
  const firstSet = cards.slice(0, highlightImages.length);
  const first = firstSet[0]?.getBoundingClientRect();
  const last = firstSet[firstSet.length - 1]?.getBoundingClientRect();
  if (!first || !last) return;

  carouselState.setWidth = last.right - first.left + parseFloat(getComputedStyle(carouselTrack).gap || "0");
  carouselState.speed = carouselState.setWidth / 32;
  carouselState.offset = carouselState.setWidth;
  carouselTrack.style.transform = `translate3d(${-carouselState.offset}px, 0, 0)`;
};

const normalizeCarouselOffset = () => {
  if (!carouselState.setWidth) return;
  while (carouselState.offset >= carouselState.setWidth * 2) carouselState.offset -= carouselState.setWidth;
  while (carouselState.offset < carouselState.setWidth) carouselState.offset += carouselState.setWidth;
};

const setCarouselOffset = (offset) => {
  if (!carouselTrack) return;
  carouselState.offset = offset;
  normalizeCarouselOffset();
  carouselTrack.style.transform = `translate3d(${-carouselState.offset}px, 0, 0)`;
};

const animateCarousel = (time) => {
  if (!carouselTrack || !carouselState.setWidth || reducedMotion.matches) return;
  if (carouselState.lastTime === null) carouselState.lastTime = time;
  const elapsed = (time - carouselState.lastTime) / 1000;
  carouselState.lastTime = time;

  if (!carouselState.paused && !carouselState.dragging) {
    setCarouselOffset(carouselState.offset + carouselState.speed * elapsed);
  }

  requestAnimationFrame(animateCarousel);
};

const pauseCarousel = () => {
  carouselState.paused = true;
};

const resumeCarousel = () => {
  carouselState.paused = false;
};


const openCarouselLightbox = (index) => {
  if (!carouselLightbox || !carouselLightboxImage) return;
  const src = highlightImages[index];
  if (!src) return;

  carouselState.previousFocus = document.activeElement;
  carouselLightboxImage.src = src;
  carouselLightboxImage.alt = describeHighlight(index);
  carouselLightbox.hidden = false;
  document.body.classList.add("carousel-lightbox-open");
  pauseCarousel();
  carouselLightboxClose?.focus();
};

const closeCarouselLightbox = () => {
  if (!carouselLightbox || !carouselLightboxImage) return;
  carouselLightbox.hidden = true;
  carouselLightboxImage.src = "";
  document.body.classList.remove("carousel-lightbox-open");
  resumeCarousel();

  if (carouselState.previousFocus instanceof HTMLElement) {
    carouselState.previousFocus.focus();
  }
  carouselState.previousFocus = null;
};

if (carousel && carouselViewport && carouselTrack) {
  renderCarousel();
  requestAnimationFrame(() => {
    measureCarousel();
    if (!reducedMotion.matches) requestAnimationFrame(animateCarousel);
  });

  carousel.addEventListener("mouseenter", pauseCarousel);
  carousel.addEventListener("mouseleave", resumeCarousel);
  carousel.addEventListener("focusin", pauseCarousel);
  carousel.addEventListener("focusout", resumeCarousel);

  carouselViewport.addEventListener("pointerdown", (event) => {
    carouselState.dragging = true;
    carouselState.didDrag = false;
    carouselState.dragStartX = event.clientX;
    carouselState.dragStartOffset = carouselState.offset;
    carouselViewport.classList.add("is-dragging");
    carouselViewport.setPointerCapture(event.pointerId);
  });

  carouselViewport.addEventListener("pointermove", (event) => {
    if (!carouselState.dragging) return;
    const delta = event.clientX - carouselState.dragStartX;
    if (Math.abs(delta) > 6) carouselState.didDrag = true;
    setCarouselOffset(carouselState.dragStartOffset - delta);
  });

  const endDrag = (event) => {
    if (!carouselState.dragging) return;
    carouselState.dragging = false;
    carouselViewport.classList.remove("is-dragging");
    if (carouselViewport.hasPointerCapture(event.pointerId)) carouselViewport.releasePointerCapture(event.pointerId);
    window.setTimeout(() => {
      carouselState.didDrag = false;
    }, 0);
  };

  carouselViewport.addEventListener("pointerup", endDrag);
  carouselViewport.addEventListener("pointercancel", endDrag);

  carouselTrack.addEventListener("click", (event) => {
    const card = event.target.closest("[data-carousel-index]");
    if (!card || carouselState.didDrag) return;
    openCarouselLightbox(Number(card.dataset.carouselIndex));
  });
  window.addEventListener("resize", measureCarousel);
}

carouselLightboxClose?.addEventListener("click", closeCarouselLightbox);
carouselLightbox?.addEventListener("click", (event) => {
  if (event.target === carouselLightbox) closeCarouselLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && carouselLightbox && !carouselLightbox.hidden) {
    closeCarouselLightbox();
  }
});