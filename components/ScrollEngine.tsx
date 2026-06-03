"use client";

import { useEffect } from "react";

function staggerRiseItems(
  container: Element,
  reducedMotion: boolean,
  delayMs = 90
) {
  const items = container.querySelectorAll(":scope > .rise-item");
  items.forEach((item, i) => {
    if (reducedMotion) {
      item.classList.add("is-in");
      return;
    }
    setTimeout(() => item.classList.add("is-in"), i * delayMs);
  });
}

function activateRiseInReveal(revealEl: Element, reducedMotion: boolean) {
  revealEl.querySelectorAll("[data-rise-stagger]").forEach((group) => {
    staggerRiseItems(group, reducedMotion);
  });

  const grouped = new Set<Element>();
  revealEl
    .querySelectorAll("[data-rise-stagger] .rise-item")
    .forEach((el) => grouped.add(el));

  const loose = Array.from(revealEl.querySelectorAll(".rise-item")).filter(
    (el) => !grouped.has(el)
  );
  loose.forEach((item, i) => {
    if (reducedMotion) {
      item.classList.add("is-in");
      return;
    }
    setTimeout(() => item.classList.add("is-in"), i * 90 + i * 20);
  });
}

export default function ScrollEngine() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealEls = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          const kids = e.target.querySelectorAll(".stagger-child");
          kids.forEach((k, i) => {
            (k as HTMLElement).style.transitionDelay = i * 80 + "ms";
          });
          activateRiseInReveal(e.target, reducedMotion);
          revealObs.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    const riseGroups = document.querySelectorAll("[data-rise-stagger]");
    const riseObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          staggerRiseItems(e.target, reducedMotion);
          riseObs.unobserve(e.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    riseGroups.forEach((g) => riseObs.observe(g));

    const pillBlocks = document.querySelectorAll("[data-pill-stagger]");
    const pillObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const items = e.target.querySelectorAll(".pill, .ic, .ic-card");
          items.forEach((p, i) => {
            if (reducedMotion) {
              p.classList.add("in", "is-in");
              return;
            }
            setTimeout(() => {
              p.classList.add("in", "is-in");
            }, i * 90);
          });
          pillObs.unobserve(e.target);
        });
      },
      { threshold: 0.25 }
    );
    pillBlocks.forEach((b) => pillObs.observe(b));

    const tiltCards = document.querySelectorAll(".tilt-card");
    const tiltObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = parseInt(
            (e.target as HTMLElement).dataset.tilt || "0",
            10
          );
          const card = e.target;
          if (reducedMotion) {
            card.classList.add("in", "is-in");
          } else {
            setTimeout(() => card.classList.add("in", "is-in"), idx * 120);
          }
          tiltObs.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );
    tiltCards.forEach((c) => tiltObs.observe(c));

    const sections = Array.from(
      document.querySelectorAll("section.scene")
    ) as HTMLElement[];
    let rafPending = false;

    const sectionLabels = sections.map((s) => {
      const lbl = (s.dataset.screenLabel || "").replace(/^\d+\s*/, "").trim();
      return lbl || "Section";
    });

    const ticker = document.querySelector(".ticker");
    const tickerNum = document.querySelector(".ticker-num");
    const tickerLabel = document.querySelector(".ticker-label");
    const tickerFill = document.querySelector(".ticker-fill") as HTMLElement | null;
    let lastSectionIdx = -1;
    let firstScroll = false;

    function clamp(v: number, a: number, b: number) {
      return Math.min(b, Math.max(a, v));
    }

    function tick() {
      rafPending = false;
      const vh = window.innerHeight;

      let activeIdx = 0;
      let bestFocus = -1;

      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        const enter = clamp((vh - rect.top) / (vh * 0.3), 0, 1);
        const exit = clamp(rect.bottom / (vh * 0.2), 0, 1);
        const zoom = Math.min(enter, exit);

        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2) / (vh * 0.75);
        const focus = clamp(1 - dist, 0, 1);

        sec.style.setProperty("--zoom", zoom.toFixed(3));
        sec.style.setProperty("--focus", focus.toFixed(3));

        if (focus > bestFocus) {
          bestFocus = focus;
          activeIdx = i;
        }
      });

      if (activeIdx !== lastSectionIdx) {
        lastSectionIdx = activeIdx;
        const n = String(activeIdx + 1).padStart(2, "0");
        if (tickerNum) tickerNum.textContent = n;
        if (tickerLabel) tickerLabel.textContent = sectionLabels[activeIdx];
        document.body.setAttribute("data-section", n);
      }

      const doc = document.documentElement;
      const max = doc.scrollHeight - vh || 1;
      const prog = clamp(window.scrollY / max, 0, 1);
      if (tickerFill) tickerFill.style.width = (prog * 100).toFixed(1) + "%";

      if (!firstScroll && ticker) {
        ticker.classList.add("ready");
        firstScroll = true;
      }
    }

    function onScroll() {
      if (rafPending || reducedMotion) return;
      rafPending = true;
      requestAnimationFrame(tick);
    }

    const parallaxEls = document.querySelectorAll("[data-parallax]");
    function onScrollParallax() {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(
          (el as HTMLElement).dataset.parallax || "0.6"
        );
        (el as HTMLElement).style.transform = `translate3d(0, ${y * (speed - 1) * 0.1}px, 0)`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("scroll", onScrollParallax, { passive: true });

    tick();
    onScrollParallax();

    return () => {
      revealObs.disconnect();
      riseObs.disconnect();
      pillObs.disconnect();
      tiltObs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScrollParallax);
    };
  }, []);

  return null;
}
