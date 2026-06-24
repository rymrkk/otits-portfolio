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
const timelineItems = Array.from(document.querySelectorAll("[data-timeline-reveal]"));
const revealAll = () => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  timelineItems.forEach((item) => item.classList.add("is-visible"));
};

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

  if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.24 }
    );

    timelineItems.forEach((item) => timelineObserver.observe(item));
  }
}

reducedMotion.addEventListener("change", (event) => {
  if (event.matches) revealAll();
});
const certificateDialog = document.querySelector("[data-certificate-dialog]");
const certificateDialogImage = document.querySelector("[data-certificate-dialog-image]");
const certificateClose = document.querySelector("[data-certificate-close]");
const certificateTriggers = Array.from(document.querySelectorAll("[data-certificate-open]"));

const openCertificateDialog = (trigger) => {
  if (!certificateDialog || !certificateDialogImage || typeof certificateDialog.showModal !== "function") return;
  certificateDialogImage.src = trigger.dataset.certificateSrc || "";
  certificateDialogImage.alt = trigger.dataset.certificateAlt || "Certificate preview";
  certificateDialog.showModal();
  certificateClose?.focus();
};

const closeCertificateDialog = () => {
  if (!certificateDialog?.open) return;
  certificateDialog.close();
  certificateDialogImage.src = "";
};

certificateTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openCertificateDialog(trigger));
});

certificateClose?.addEventListener("click", closeCertificateDialog);
certificateDialog?.addEventListener("click", (event) => {
  if (event.target === certificateDialog) closeCertificateDialog();
});
