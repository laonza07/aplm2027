const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    tabs.forEach((item) => item.classList.remove("is-active"));
    panels.forEach((panel) => panel.classList.remove("is-active"));

    tab.classList.add("is-active");
    document.getElementById(target)?.classList.add("is-active");
  });
});

const floatingCta = document.querySelector("[data-floating-cta]");
const floatingToggle = floatingCta?.querySelector(".floating-cta__toggle");
const floatingMenu = floatingCta?.querySelector(".floating-cta__items");

if (floatingCta && floatingToggle && floatingMenu) {
  const setFloatingState = (isOpen) => {
    floatingCta.classList.toggle("is-open", isOpen);
    floatingToggle.setAttribute("aria-expanded", String(isOpen));
    floatingMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  floatingToggle.addEventListener("click", () => {
    setFloatingState(!floatingCta.classList.contains("is-open"));
  });

  document.addEventListener("click", (event) => {
    if (!floatingCta.contains(event.target)) {
      setFloatingState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setFloatingState(false);
    }
  });
}

// ── Header Scroll-Lock (ล็อกเมนูด้านบนเมื่อเลื่อนหน้าจอ) ──
const siteHeader = document.querySelector(".site-header");
if (siteHeader) {
  const updateHeaderScrollState = () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", updateHeaderScrollState, { passive: true });
  updateHeaderScrollState();
}

