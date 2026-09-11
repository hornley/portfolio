const raceSection = document.querySelector("#projects-race");
const trackPath = document.querySelector("#track-path");
const completedPath = document.querySelector("#track-completed");
const car = document.querySelector("#race-car");
const checkpoints = [...document.querySelectorAll(".checkpoint")];
const panel = document.querySelector("#project-panel");
const panelNumber = document.querySelector("#panel-number");
const panelTitle = document.querySelector("#panel-title");
const panelAward = document.querySelector("#panel-award");
const panelCategory = document.querySelector("#panel-category");
const panelDescription = document.querySelector("#panel-description");
const panelAction = document.querySelector("#panel-action");
const projectArtwork = document.querySelector("#project-artwork");
const ghostNumber = document.querySelector("#ghost-number");

const projects = [
  {
    number: "01",
    slug: "ayudapay",
    name: "AyudaPay",
    category: "Civic Tech / FinTech",
    description: "A platform that helps Filipinos discover and apply for government programs, scholarships, and LGU benefits through AI matching, eligibility guidance, and Stellar-based disbursements.",
    award: "",
    link: "https://github.com/wehyn/ayudamatch",
  },
  {
    number: "02",
    slug: "rekado-lens",
    name: "Rekado Lens",
    category: "Health Tech / AI",
    description: "A web-based ingredient intelligence application that analyzes food, drinks, and beauty products against a user's allergies, dietary preferences, and medical conditions.",
    award: "",
    link: "https://github.com/hornley/codekada-sci-coders",
  },
  {
    number: "03",
    slug: "sora",
    name: "Sora",
    category: "AI Assistant / Systems",
    description: "A modular personal AI assistant built as a modular monolith with clean provider interfaces for replaceable LLM, speech, wake-word, vision, embeddings, and orchestration capabilities.",
    award: "",
    link: "",
  },
  {
    number: "04",
    slug: "zeni",
    name: "Zeni",
    category: "Finance / Full-stack",
    description: "A private, self-hosted finance tracker with a quiet API-first ledger for accounts, transactions, categories, settlements, profiles, reports, and multi-user local data.",
    award: "",
    link: "",
  },
  {
    number: "05",
    slug: "kairo",
    name: "Kairo",
    category: "Information / Automation",
    description: "A local-first personal information aggregation service with a read-only API that collects Gmail and Canvas signals, stores normalized records, and produces source-linked daily briefs.",
    award: "",
    link: "",
  },
  {
    number: "06",
    slug: "sulatbaybayin",
    name: "SulatBaybayin",
    category: "Computer Vision / OCR",
    description: "An AI-powered Baybayin recognition system using a custom Faster R-CNN detection and classification pipeline to reconstruct handwritten characters into digital text.",
    award: "",
    link: "https://github.com/hornley/sulatbaybayin",
  },
];

const checkpointProgress = checkpoints.map((checkpoint) => Number(checkpoint.dataset.progress));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentProject = -1;
let frameRequested = false;
let lastProgress = 0;
let panelTimer;
const trackLength = trackPath ? trackPath.getTotalLength() : 0;
const motionBuffer = 0.06;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getScrollProgress() {
  const bounds = raceSection.getBoundingClientRect();
  const scrollableDistance = Math.max(1, bounds.height - window.innerHeight);
  const rawProgress = clamp(-bounds.top / scrollableDistance);
  return clamp((rawProgress - motionBuffer) / (1 - motionBuffer * 2));
}

function getProjectIndex(progress) {
  if (progress >= 0.94) return projects.length - 1;

  let activeIndex = 0;
  checkpointProgress.forEach((point, index) => {
    const previousBoundary = index === 0 ? 0 : (checkpointProgress[index - 1] + point) / 2;
    if (progress >= previousBoundary) activeIndex = index;
  });

  return activeIndex;
}

function updatePanel(index) {
  if (index === currentProject) return;
  currentProject = index;

  const project = projects[index];
  const update = () => {
    panelNumber.textContent = project.number;
    panelTitle.textContent = project.name;
    panelCategory.textContent = project.category;
    panelDescription.textContent = project.description;
    panelAward.textContent = project.award;
    panelAward.hidden = !project.award;
    panel.dataset.project = project.slug;
    projectArtwork.dataset.project = project.slug;
    ghostNumber.textContent = project.number;
    panelAction.innerHTML = project.link
      ? `<a class="text-link" href="${project.link}" target="_blank" rel="noreferrer">View project <span aria-hidden="true">↗</span></a>`
      : `<span class="project-panel__muted">SOURCE / PRIVATE</span>`;
  };

  if (prefersReducedMotion) {
    update();
    return;
  }

  window.clearTimeout(panelTimer);
  panel.classList.add("is-changing");
  ghostNumber.classList.add("is-changing");
  panelTimer = window.setTimeout(() => {
    update();
    requestAnimationFrame(() => {
      panel.classList.remove("is-changing");
      ghostNumber.classList.remove("is-changing");
    });
  }, 150);
}

function updateTrack(progress) {
  // Car position and completed trail intentionally share this exact progress value.
  const distance = trackLength * progress;
  const point = trackPath.getPointAtLength(distance);
  const nextPoint = trackPath.getPointAtLength(distance + 1 < trackLength ? distance + 1 : 0);
  const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

  car.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
  completedPath.style.strokeDasharray = `${trackLength} ${trackLength}`;
  completedPath.style.strokeDashoffset = String(trackLength * (1 - progress));

  checkpoints.forEach((checkpoint, index) => {
    const checkpointPoint = trackPath.getPointAtLength(trackLength * checkpointProgress[index]);
    checkpoint.setAttribute("transform", `translate(${checkpointPoint.x} ${checkpointPoint.y})`);
    checkpoint.classList.toggle("is-passed", progress >= checkpointProgress[index]);
    checkpoint.classList.toggle("is-active", index === getProjectIndex(progress) && progress < 0.94);
  });

  panel.setAttribute("aria-hidden", String(progress >= 0.94));
}

function render() {
  frameRequested = false;
  const progress = getScrollProgress();
  lastProgress = progress;
  updateTrack(progress);
  updatePanel(getProjectIndex(progress));
}

function requestRender() {
  if (frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(render);
}

function makeFallbackVisible() {
  panel.removeAttribute("aria-hidden");
  panel.classList.remove("is-changing");
  updatePanel(0);
  if (trackPath && completedPath && car) updateTrack(lastProgress);
}

if (raceSection && trackPath && completedPath && car) {
  completedPath.style.strokeDasharray = `${trackLength} ${trackLength}`;
  completedPath.style.strokeDashoffset = String(trackLength);
  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender, { passive: true });
  requestRender();
} else {
  makeFallbackVisible();
}
