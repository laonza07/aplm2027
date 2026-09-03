import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./script.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const revealGroups = [
  ".stats-grid .stat-card",
  ".service-grid .service-card",
  ".vision-grid > *",
  ".calendar-grid > *",
  ".news-grid .news-card",
  ".footer__grid > *",
];

function MotionController() {
  useEffect(() => {
    const toggle = document.querySelector(".theme-toggle");
    const icon = toggle?.querySelector(".theme-toggle__icon");
    const label = toggle?.querySelector(".theme-toggle__label");
    if (!toggle || !icon || !label) return undefined;

    const applyTheme = (theme, persist = false) => {
      const isDark = theme === "dark";
      document.documentElement.dataset.theme = theme;
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute(
        "aria-label",
        isDark ? "เปลี่ยนเป็นโหมดกลางวัน" : "เปลี่ยนเป็นโหมดกลางคืน",
      );
      icon.textContent = isDark ? "☾" : "☀";
      label.textContent = isDark ? "กลางคืน" : "กลางวัน";

      if (persist) {
        localStorage.setItem("aplm-theme", theme);
      }
    };

    applyTheme(document.documentElement.dataset.theme || "light");

    const handleToggle = () => {
      const nextTheme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
      gsap.fromTo(
        icon,
        { rotate: -120, scale: 0.45 },
        { rotate: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" },
      );
    };

    toggle.addEventListener("click", handleToggle);
    return () => toggle.removeEventListener("click", handleToggle);
  }, []);

  useGSAP(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

    intro
      .from(".topbar", { yPercent: -100, duration: 0.45 })
      .from(".navbar", { y: -24, autoAlpha: 0, duration: 0.55 }, "-=0.2")
      .from(
        ".top-banner__frame",
        { y: 28, autoAlpha: 0, duration: 0.7 },
        "-=0.25",
      )
      .from(
        [".hero .eyebrow", ".hero h1", ".hero__content > p", ".hero__actions"],
        { y: 32, autoAlpha: 0, duration: 0.65, stagger: 0.1 },
        "-=0.4",
      )
      .from(
        ".hero__media",
        {
          x: 48,
          rotate: 2,
          autoAlpha: 0,
          duration: 0.85,
          ease: "back.out(1.25)",
        },
        "-=0.7",
      );

    gsap.to(".hero__media img", {
      y: -10,
      duration: 2.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".hero__stat", {
      y: 8,
      duration: 2.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    revealGroups.forEach((selector) => {
      const elements = gsap.utils.toArray(selector);
      if (!elements.length) return;

      gsap.from(elements, {
        y: 44,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0].parentElement,
          start: "top 84%",
          once: true,
        },
      });
    });

    gsap.utils.toArray(".section-heading").forEach((heading) => {
      gsap.from(heading.children, {
        y: 26,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          once: true,
        },
      });
    });

    document.querySelectorAll(".stat-card strong").forEach((counter) => {
      const finalValue = Number(counter.textContent.replace(/,/g, ""));
      if (!Number.isFinite(finalValue)) return;

      const state = { value: 0 };
      gsap.to(state, {
        value: finalValue,
        duration: 1.5,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          counter.textContent = Math.round(state.value).toLocaleString("en-US");
        },
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
          once: true,
        },
      });
    });

    document
      .querySelectorAll(".service-card, .news-card, .stat-card")
      .forEach((card) => {
        const enter = () =>
          gsap.to(card, {
            y: -6,
            scale: 1.012,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        const leave = () =>
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });
  });

  return null;
}

createRoot(document.getElementById("animation-root")).render(
  <MotionController />,
);
