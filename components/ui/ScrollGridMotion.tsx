"use client";

import { useEffect } from "react";

const GRID_SELECTOR = "[data-grid-motion]";
const MARQUEE_SELECTOR = ".grid-motion-marquee";
const CELL_SELECTOR =
  ":scope > .rise-item, :scope > .ic-card, :scope > .moment, :scope > .recovery-card, :scope > .card, :scope > .why-benefit, :scope > .synergy-item, :scope > .step, :scope > .attr, :scope > .vrow, :scope .row.rise-item";

const SCROLL_LERP = 0.11;
const POINTER_LERP = 0.16;
const SETTLE_EPS = 0.08;

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function near(a: number, b: number, eps = SETTLE_EPS) {
  return Math.abs(a - b) < eps;
}

function getSpeed(cell: HTMLElement, index: number) {
  const raw = cell.dataset.gridSpeed;
  if (raw) return parseFloat(raw);
  const col = index % 4;
  const row = Math.floor(index / 4);
  return 0.32 + col * 0.1 + (row % 2) * 0.06;
}

type CellMotion = {
  el: HTMLElement;
  speed: number;
  depthMul: number;
  offsetRatio: number;
  ty: number;
  tz: number;
  rx: number;
  ry: number;
  tx: number;
  rot: number;
  tyT: number;
  tzT: number;
  rxT: number;
  ryT: number;
  txT: number;
  rotT: number;
};

type GridMotion = {
  el: HTMLElement;
  cells: CellMotion[];
  active: boolean;
  mx: number;
  my: number;
  mxT: number;
  myT: number;
};

function measureGrid(grid: GridMotion) {
  const h = grid.el.offsetHeight || 1;
  const gridTop = grid.el.getBoundingClientRect().top + window.scrollY;
  grid.cells.forEach((cell) => {
    const rect = cell.el.getBoundingClientRect();
    const mid = rect.top + window.scrollY + rect.height * 0.5 - gridTop;
    cell.offsetRatio = clamp(mid / h, 0, 1);
  });
}

function buildGrid(el: HTMLElement): GridMotion {
  const cellEls = Array.from(el.querySelectorAll(CELL_SELECTOR)) as HTMLElement[];
  const cells: CellMotion[] = cellEls.map((cellEl, i) => ({
    el: cellEl,
    speed: getSpeed(cellEl, i),
    depthMul: 0.55 + (i % 4) * 0.14,
    offsetRatio: 0.5,
    ty: 0,
    tz: 0,
    rx: 0,
    ry: 0,
    tx: 0,
    rot: 0,
    tyT: 0,
    tzT: 0,
    rxT: 0,
    ryT: 0,
    txT: 0,
    rotT: 0,
  }));
  const grid: GridMotion = {
    el,
    cells,
    active: false,
    mx: 0,
    my: 0,
    mxT: 0,
    myT: 0,
  };
  measureGrid(grid);
  return grid;
}

function setTargets(grid: GridMotion, vh: number) {
  const rect = grid.el.getBoundingClientRect();
  const progress = clamp(
    (vh - rect.top) / (rect.height + vh * 0.4),
    0,
    1
  );
  const focus = clamp(
    1 - Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh * 0.7),
    0,
    1
  );
  const enter = clamp((vh - rect.top) / (vh * 0.52), 0, 1);
  const vhCenter = vh * 0.5;
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  const strength = w < 480 ? 0.55 : w < 768 ? 0.68 : w < 900 ? 0.8 : 1;

  grid.el.style.setProperty("--gm-progress", progress.toFixed(3));
  grid.el.style.setProperty("--gm-focus", focus.toFixed(3));

  const mx = grid.mx;
  const my = grid.my;

  grid.cells.forEach((cell, i) => {
    const { speed, depthMul, offsetRatio } = cell;
    const cellScreenY = rect.top + offsetRatio * rect.height;
    const lag = (1 - enter) * 44 * speed * strength;
    const parallax =
      ((cellScreenY - vhCenter) / vh) * 26 * speed * strength;

    cell.tyT = lag + parallax;
    cell.tzT = (i % 3) * 4.5 * progress * strength;
    cell.rotT = (progress - 0.5) * 3.5 * speed;
    cell.rxT = -my * 7.5 * depthMul * strength;
    cell.ryT = mx * 9 * depthMul * strength;
    cell.txT = mx * 11 * depthMul * strength;
  });
}

function stepGrid(grid: GridMotion): boolean {
  let moving = false;
  const tScroll = SCROLL_LERP;
  const tPtr = POINTER_LERP;

  grid.mx = lerp(grid.mx, grid.mxT, tPtr);
  grid.my = lerp(grid.my, grid.myT, tPtr);
  grid.el.style.setProperty("--gm-mx", grid.mx.toFixed(4));
  grid.el.style.setProperty("--gm-my", grid.my.toFixed(4));

  if (!near(grid.mx, grid.mxT, 0.002) || !near(grid.my, grid.myT, 0.002)) {
    moving = true;
  }

  for (const cell of grid.cells) {
    cell.ty = lerp(cell.ty, cell.tyT, tScroll);
    cell.tz = lerp(cell.tz, cell.tzT, tScroll);
    cell.rx = lerp(cell.rx, cell.rxT, tScroll);
    cell.ry = lerp(cell.ry, cell.ryT, tScroll);
    cell.tx = lerp(cell.tx, cell.txT, tScroll);
    cell.rot = lerp(cell.rot, cell.rotT, tScroll);

    if (
      !near(cell.ty, cell.tyT) ||
      !near(cell.tz, cell.tzT) ||
      !near(cell.rx, cell.rxT) ||
      !near(cell.ry, cell.ryT)
    ) {
      moving = true;
    }

    cell.el.style.setProperty("--gm-ty", `${cell.ty.toFixed(2)}px`);
    cell.el.style.setProperty("--gm-tz", `${cell.tz.toFixed(2)}px`);
    cell.el.style.setProperty("--gm-rx", `${cell.rx.toFixed(2)}deg`);
    cell.el.style.setProperty("--gm-ry", `${cell.ry.toFixed(2)}deg`);
    cell.el.style.setProperty("--gm-tx", `${cell.tx.toFixed(2)}px`);
    cell.el.style.setProperty("--gm-rotate", `${cell.rot.toFixed(2)}deg`);
  }

  return moving;
}

export default function ScrollGridMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion || document.body.classList.contains("tw-no-stagger")) {
      return;
    }

    const gridEls = Array.from(
      document.querySelectorAll(GRID_SELECTOR)
    ) as HTMLElement[];
    const grids = gridEls.map(buildGrid);

    gridEls.forEach((el) => el.classList.add("grid-motion"));

    let scrollBoost = 0;
    let pointerActive = false;
    let rafId = 0;
    let running = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const grid = grids.find((g) => g.el === entry.target);
          if (!grid) return;
          grid.active = entry.isIntersecting;
          grid.el.classList.toggle("grid-motion--active", entry.isIntersecting);
          if (entry.isIntersecting) measureGrid(grid);
        });
        startLoop();
      },
      { rootMargin: "18% 0px", threshold: 0 }
    );

    grids.forEach((g) => io.observe(g.el));

    const marqueeEls = Array.from(
      document.querySelectorAll(MARQUEE_SELECTOR)
    ) as HTMLElement[];

    const marqueeIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const track = entry.target.querySelector(
            ".grid-motion-marquee__track"
          ) as HTMLElement | null;
          if (track) {
            track.style.animationPlayState = entry.isIntersecting
              ? "running"
              : "paused";
          }
        });
      },
      { rootMargin: "80px 0px", threshold: 0 }
    );
    marqueeEls.forEach((m) => marqueeIo.observe(m));

    const resizeObs = new ResizeObserver(() => {
      grids.forEach((g) => {
        if (g.active) measureGrid(g);
      });
    });
    grids.forEach((g) => resizeObs.observe(g.el));

    const frame = () => {
      rafId = 0;
      const vh = window.innerHeight;
      let moving = pointerActive || scrollBoost > 0;

      for (const grid of grids) {
        if (!grid.active) continue;
        setTargets(grid, vh);
        if (stepGrid(grid)) moving = true;
      }

      if (scrollBoost > 0) scrollBoost -= 1;

      if (moving) {
        startLoop();
      } else {
        running = false;
      }
    };

    function startLoop() {
      if (running) return;
      running = true;
      if (!rafId) rafId = requestAnimationFrame(frame);
    }

    const onScroll = () => {
      scrollBoost = 10;
      startLoop();
    };

    const onPointerMove = (e: Event) => {
      const grid = (e.currentTarget as HTMLElement).closest(
        GRID_SELECTOR
      ) as HTMLElement | null;
      if (!grid) return;
      const state = grids.find((g) => g.el === grid);
      if (!state?.active) return;

      const me = e as MouseEvent;
      const rect = grid.getBoundingClientRect();
      state.mxT = clamp((me.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
      state.myT = clamp((me.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
      pointerActive = true;
      startLoop();
    };

    const onPointerLeave = (e: Event) => {
      const grid = (e.currentTarget as HTMLElement).closest(
        GRID_SELECTOR
      ) as HTMLElement | null;
      if (!grid) return;
      const state = grids.find((g) => g.el === grid);
      if (!state) return;
      state.mxT = 0;
      state.myT = 0;
      pointerActive = false;
      startLoop();
    };

    gridEls.forEach((el) => {
      el.addEventListener("mousemove", onPointerMove, { passive: true });
      el.addEventListener("mouseleave", onPointerLeave, { passive: true });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    startLoop();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      marqueeIo.disconnect();
      resizeObs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      gridEls.forEach((el) => {
        el.removeEventListener("mousemove", onPointerMove);
        el.removeEventListener("mouseleave", onPointerLeave);
        el.classList.remove("grid-motion", "grid-motion--active");
      });
      marqueeEls.forEach((m) => {
        const track = m.querySelector(".grid-motion-marquee__track");
        if (track instanceof HTMLElement) {
          track.style.animationPlayState = "";
        }
      });
    };
  }, []);

  return null;
}

const MARQUEE_ROW_A = [
  "HYDRATATION",
  "FRAÎCHEUR",
  "CONFORT",
  "RECOVERY RITUAL™",
  "NIACINAMIDE",
  "CENTELLA ASIATICA",
  "SRP™",
  "METCARE®",
];

const MARQUEE_ROW_B = [
  "SKIN RECOVERY PATCH™",
  "PANTHÉNOL",
  "ACIDE HYALURONIQUE",
  "SIGNATURE PROTOCOL™",
  "RECOVERY LIFESTYLE™",
  "BÊTA-GLUCAN",
  "CAFÉINE",
  "HAMAMÉLIS",
];

type MarqueeProps = {
  items?: string[];
  direction?: "left" | "right";
  tone?: "light" | "dark";
};

export function GridMotionMarquee({
  items,
  direction = "left",
  tone = "light",
}: MarqueeProps) {
  const row = items ?? MARQUEE_ROW_A;
  const doubled = [...row, ...row];

  return (
    <div
      className={`grid-motion-marquee grid-motion-marquee--${tone} grid-motion-marquee--${direction}`}
      aria-hidden="true"
    >
      <div className="grid-motion-marquee__track">
        {doubled.map((label, i) => (
          <span className="grid-motion-marquee__chip" key={`${label}-${i}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function GridMotionMarqueeBand() {
  return (
    <div className="grid-motion-marquee-band" aria-hidden="true">
      <GridMotionMarquee direction="left" tone="light" items={MARQUEE_ROW_A} />
      <GridMotionMarquee direction="right" tone="dark" items={MARQUEE_ROW_B} />
    </div>
  );
}
