const raceSection = document.querySelector("#projects-race");
const race = document.querySelector(".projects-race");
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
const panelSector = document.querySelector("#panel-sector");
const panelStatus = document.querySelector("#panel-status");
const progressFill = document.querySelector("#progress-fill");
const progressLabel = document.querySelector("#progress-label");
const progressPercent = document.querySelector("#scroll-percent");
const progressMarkers = [...document.querySelectorAll("#progress-markers span")];
const scrollCue = document.querySelector("#scroll-cue");
const lapComplete = document.querySelector("#lap-complete");

const projects = [
  {
    number: "01",
    name: "Zeni",
    category: "Software / Product",
    description: "A project from the selected work lineup.",
    award: "",
    link: "",
  },
  {
    number: "02",
    name: "Kairo",
    category: "Software / Product",
    description: "A project from the selected work lineup.",
    award: "",
    link: "",
  },
  {
    number: "03",
    name: "AyudaPay",
    category: "FinTech / Blockchain / AI",
    description: "A blockchain-enabled aid distribution system designed for transparent and instant financial assistance.",
    award: "🏆 Champion — Hack-it-UP 2026 · UP SoComSci",
    link: "",
  },
  {
    number: "04",
    name: "SulatBaybayin",
    category: "Computer Vision / OCR",
    description: "A Baybayin detection and recognition system that turns handwritten script into assembled text.",
    award: "",
    link: "",
  },
];

const checkpointProgress = checkpoints.map((checkpoint) => Number(checkpoint.dataset.progress));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentProject = -1;
let frameRequested = false;
let lastProgress = 0;
let panelTimer;
const trackLength = trackPath ? trackPath.getTotalLength() : 0;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getScrollProgress() {
  const bounds = raceSection.getBoundingClientRect();
  const scrollableDistance = Math.max(1, bounds.height - window.innerHeight);
  return clamp(-bounds.top / scrollableDistance);
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
    panelSector.textContent = `Sector ${project.number} / ${projects.length}`;
    panelStatus.textContent = index === projects.length - 1 ? "Final sector" : "On track";
    panelAction.innerHTML = project.link
      ? `<a class="text-link" href="${project.link}" target="_blank" rel="noreferrer">View project <span aria-hidden="true">↗</span></a>`
      : `<span class="project-panel__muted">Project link to be added</span>`;

    progressLabel.textContent = `${project.number} / ${String(projects.length).padStart(2, "0")}`;
    progressMarkers.forEach((marker, markerIndex) => marker.classList.toggle("is-active", markerIndex === index));
  };

  if (prefersReducedMotion) {
    update();
    return;
  }

  window.clearTimeout(panelTimer);
  panel.classList.add("is-changing");
  panelTimer = window.setTimeout(() => {
    update();
    requestAnimationFrame(() => panel.classList.remove("is-changing"));
  }, 150);
}

function updateTrack(progress) {
  const distance = trackLength * progress;
  const point = trackPath.getPointAtLength(distance);
  const nextPoint = trackPath.getPointAtLength(Math.min(trackLength, distance + 1));
  const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

  car.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
  completedPath.style.strokeDasharray = trackLength;
  completedPath.style.strokeDashoffset = trackLength - distance;

  checkpoints.forEach((checkpoint, index) => {
    const checkpointPoint = trackPath.getPointAtLength(trackLength * checkpointProgress[index]);
    checkpoint.setAttribute("transform", `translate(${checkpointPoint.x} ${checkpointPoint.y})`);
    checkpoint.classList.toggle("is-passed", progress >= checkpointProgress[index]);
    checkpoint.classList.toggle("is-active", index === getProjectIndex(progress) && progress < 0.94);
  });

  progressFill.style.width = `${progress * 100}%`;
  progressPercent.textContent = String(Math.round(progress * 100)).padStart(2, "0");

  const isCarOnLeft = point.x < 510;
  race.classList.toggle("is-card-right", isCarOnLeft);
  lapComplete.classList.toggle("is-visible", progress >= 0.94);
  lapComplete.setAttribute("aria-hidden", String(progress < 0.94));
  panel.setAttribute("aria-hidden", String(progress >= 0.94));
  scrollCue.style.opacity = progress > 0.03 ? "0" : "1";
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
  updateTrack(lastProgress);
}

if (raceSection && trackPath && completedPath && car) {
  completedPath.style.strokeDasharray = trackLength;
  completedPath.style.strokeDashoffset = trackLength;
  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender, { passive: true });
  requestRender();
} else {
  makeFallbackVisible();
}
