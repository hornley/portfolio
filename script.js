const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const achievementsSection = document.querySelector(".achievements-section");
const achievementsScroll = document.querySelector(".achievements-scroll");
const achievementsIntro = document.querySelector(".achievements-intro");
const achievementsFilm = document.querySelector("#achievements-film");
const achievementsCamera = document.querySelector("#achievements-camera");
const achievementArc = document.querySelector("#achievement-arc");
const achievementFrames = document.querySelector("#achievement-frames");
const achievementDetail = document.querySelector("#achievement-detail");
const achievementDetailTitle = document.querySelector("#achievement-detail-title");
const achievementDetailResult = document.querySelector("#achievement-detail-result");
const achievementDetailContext = document.querySelector("#achievement-detail-context");
const achievementDetailDate = document.querySelector("#achievement-detail-date");
const achievementDetailSummary = document.querySelector("#achievement-detail-summary");

const achievementData = [
  {
    slug: "acm-comp",
    folder: "achievements/optimized/acm-comp",
    imageExtension: "jpg",
    focalFile: "focal_photo.jpg",
    title: "Code Relay Competition",
    result: "Champion",
    context: "ACM Org · Team M.J.P.T.B.",
    date: "November 27, 2024",
    summary: "",
    focalFrame: 2,
    frames: [
      { label: "Problem solving", src: "", alt: "Code Relay Competition problem-solving photo" },
      { label: "Team", src: "", alt: "Code Relay Competition team photo" },
      { label: "Champion", src: "", alt: "Code Relay Competition champion photo" },
    ],
  },
  {
    slug: "codekada",
    folder: "achievements/optimized/codekada",
    imageExtension: "jpg",
    focalFile: "focal_photo.jpg",
    title: "CodeKada 2025",
    result: "Champion",
    context: "Rekado Lens · Sci-Coders",
    date: "November 8, 2025",
    summary: "",
    focalFrame: 5,
    frames: [
      { label: "Coding", src: "", alt: "CodeKada coding photo" },
      { label: "Presenting", src: "", alt: "CodeKada presentation photo" },
      { label: "Team", src: "", alt: "CodeKada team photo" },
      { label: "Building", src: "", alt: "CodeKada building photo" },
      { label: "Final round", src: "", alt: "CodeKada final-round photo" },
      { label: "Champion", src: "", alt: "CodeKada champion photo" },
    ],
  },
  {
    slug: "hack-it-up",
    folder: "achievements/optimized/hack-it-up",
    imageExtension: "jpg",
    focalFile: "focal_photo.jpg",
    title: "Hack-It-UP 2026",
    result: "Champion",
    context: "AyudaPay Stellar · 48-Hour Hackathon",
    date: "May 16, 2026",
    summary: "",
    focalFrame: 5,
    frames: [
      { label: "Building", src: "", alt: "Hack-It-UP building photo" },
      { label: "AyudaPay", src: "", alt: "Hack-It-UP AyudaPay photo" },
      { label: "Team", src: "", alt: "Hack-It-UP team photo" },
      { label: "Demo", src: "", alt: "Hack-It-UP AyudaPay demo photo" },
      { label: "Judging", src: "achievements/optimized/hack-it-up/focal_photo.jpg", alt: "Hack-It-UP judging photo" },
      { label: "Champion", src: "achievements/optimized/hack-it-up/photo_5.jpg", alt: "Hack-It-UP champion photo" },
    ],
  },
];

const achievementSvgNamespace = "http://www.w3.org/2000/svg";
const achievementFrameWidth = 230;
const achievementFrameHeight = 164;
const achievementFrameSpacing = 230;
const achievementPathFocusRatio = 0.5;
const achievementFocusTarget = { x: 800, y: 500 };
const achievementMaxZoom = 3.45;
const achievementFramePadding = 130;
const achievementStages = [
  { travelStart: 0.08, travelEnd: 0.18, zoomStart: 0.2, focusStart: 0.27, focusEnd: 0.32, zoomEnd: 0.36 },
  { travelStart: 0.36, travelEnd: 0.46, zoomStart: 0.48, focusStart: 0.55, focusEnd: 0.6, zoomEnd: 0.64 },
  { travelStart: 0.64, travelEnd: 0.74, zoomStart: 0.76, focusStart: 0.83, focusEnd: 0.88, zoomEnd: 0.92 },
];

function createAchievementSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS(achievementSvgNamespace, tagName);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function achievementLerp(start, end, amount) {
  return start + (end - start) * amount;
}

function achievementEase(amount) {
  const clamped = Math.min(1, Math.max(0, amount));
  return clamped * clamped * (3 - 2 * clamped);
}

function getAchievementImageSource(achievement, frame, frameIndex) {
  if (frame.src) return frame.src;
  if (frameIndex === achievement.focalFrame) return `${achievement.folder}/${achievement.focalFile}`;
  return `${achievement.folder}/photo_${frameIndex + 1}.${achievement.imageExtension}`;
}

function buildAchievementFrame(slot, eventIndex, frameIndex, globalIndex, totalFrames) {
  const group = createAchievementSvgElement("g", {
    class: "achievement-frame",
    "data-event": eventIndex,
    "data-frame": frameIndex,
  });
  const shell = createAchievementSvgElement("rect", {
    class: "achievement-frame__shell",
    x: -achievementFrameWidth / 2,
    y: -achievementFrameHeight / 2,
    width: achievementFrameWidth,
    height: achievementFrameHeight,
  });
  const window = createAchievementSvgElement("rect", {
    class: "achievement-frame__window",
    x: -96,
    y: -58,
    width: 192,
    height: 112,
  });
  const placeholder = createAchievementSvgElement("text", {
    class: "achievement-frame__placeholder",
    x: 0,
    y: 4,
  });
  placeholder.textContent = slot.label.toUpperCase();

  group.append(shell, window, placeholder);

  if (slot.src) {
    const image = createAchievementSvgElement("image", {
      class: "achievement-frame__image",
      x: -96,
      y: -58,
      width: 192,
      height: 112,
      preserveAspectRatio: "xMidYMid slice",
      href: slot.src,
    });
    image.setAttribute("aria-label", slot.alt);
    image.addEventListener("error", () => image.remove());
    group.append(image);
  }

  [-1, 1].forEach((side) => {
    for (let index = 0; index < 4; index += 1) {
      const hole = createAchievementSvgElement("rect", {
        class: "achievement-frame__hole",
        x: -68 + index * 45,
        y: side < 0 ? -76 : 68,
        width: 20,
        height: 6,
      });
      group.append(hole);
    }
  });

  return {
    group,
    eventIndex,
    frameIndex,
    isFocal: frameIndex === achievementData[eventIndex].focalFrame,
    baseDistance: (totalFrames - 1 - globalIndex) * achievementFrameSpacing,
  };
}

if (
  achievementsSection &&
  achievementsScroll &&
  achievementsFilm &&
  achievementsCamera &&
  achievementArc &&
  achievementFrames &&
  achievementDetail
) {
  let achievementFrameNodes = [];
  let achievementTargetOffsets = [];
  let achievementTrackLength = 0;
  let achievementCurrentDetail = -1;
  let achievementFrameRequested = false;

  try {
    achievementTrackLength = achievementArc.getTotalLength();
  } catch {
    achievementTrackLength = 0;
  }

  function buildAchievementFrames() {
    const totalFrames = achievementData.reduce((total, achievement) => total + achievement.frames.length, 0);
    achievementFrames.replaceChildren();
    achievementFrameNodes = [];

    let globalIndex = 0;
    achievementData.forEach((achievement, eventIndex) => {
      achievement.frames.forEach((frame, frameIndex) => {
        const node = buildAchievementFrame(
          { ...frame, src: getAchievementImageSource(achievement, frame, frameIndex) },
          eventIndex,
          frameIndex,
          globalIndex,
          totalFrames,
        );
        achievementFrames.append(node.group);
        achievementFrameNodes.push(node);
        globalIndex += 1;
      });
    });

    const focusDistance = achievementTrackLength * achievementPathFocusRatio;
    achievementTargetOffsets = achievementData.map((achievement, eventIndex) => {
      const focalNode = achievementFrameNodes.find(
        (node) => node.eventIndex === eventIndex && node.frameIndex === achievement.focalFrame,
      );
      return focalNode ? focalNode.baseDistance - focusDistance : 0;
    });
  }

  function getAchievementProgress() {
    const bounds = achievementsScroll.getBoundingClientRect();
    const scrollableDistance = Math.max(1, bounds.height - window.innerHeight);
    return Math.min(1, Math.max(0, -bounds.top / scrollableDistance));
  }

  function getAchievementOffset(progress) {
    if (achievementTargetOffsets.length < 3) return 0;

    const firstStart = achievementTargetOffsets[0] + 320;
    const finalEnd = achievementTargetOffsets[2] - 420;

    if (progress < achievementStages[0].travelStart) return firstStart;
    if (progress < achievementStages[0].travelEnd) {
      return achievementLerp(
        firstStart,
        achievementTargetOffsets[0],
        achievementEase((progress - achievementStages[0].travelStart) / (achievementStages[0].travelEnd - achievementStages[0].travelStart)),
      );
    }
    if (progress < achievementStages[1].travelStart) return achievementTargetOffsets[0];
    if (progress < achievementStages[1].travelEnd) {
      return achievementLerp(
        achievementTargetOffsets[0],
        achievementTargetOffsets[1],
        achievementEase((progress - achievementStages[1].travelStart) / (achievementStages[1].travelEnd - achievementStages[1].travelStart)),
      );
    }
    if (progress < achievementStages[2].travelStart) return achievementTargetOffsets[1];
    if (progress < achievementStages[2].travelEnd) {
      return achievementLerp(
        achievementTargetOffsets[1],
        achievementTargetOffsets[2],
        achievementEase((progress - achievementStages[2].travelStart) / (achievementStages[2].travelEnd - achievementStages[2].travelStart)),
      );
    }
    if (progress < achievementStages[2].zoomEnd) return achievementTargetOffsets[2];
    return achievementLerp(achievementTargetOffsets[2], finalEnd, achievementEase((progress - achievementStages[2].zoomEnd) / (1 - achievementStages[2].zoomEnd)));
  }

  function getAchievementFocusState(progress) {
    for (let index = 0; index < achievementStages.length; index += 1) {
      const stage = achievementStages[index];
      if (progress < stage.zoomStart || progress > stage.zoomEnd) continue;

      if (progress < stage.focusStart) {
        return {
          index,
          amount: achievementEase((progress - stage.zoomStart) / (stage.focusStart - stage.zoomStart)),
        };
      }

      if (progress <= stage.focusEnd) return { index, amount: 1 };

      return {
        index,
        amount: 1 - achievementEase((progress - stage.focusEnd) / (stage.zoomEnd - stage.focusEnd)),
      };
    }

    return { index: -1, amount: 0 };
  }

  function updateAchievementDetail(index) {
    if (index < 0 || index === achievementCurrentDetail) return;
    achievementCurrentDetail = index;
    const achievement = achievementData[index];
    achievementDetailTitle.textContent = achievement.title;
    achievementDetailResult.textContent = achievement.result;
    achievementDetailContext.textContent = achievement.context;
    achievementDetailDate.textContent = achievement.date;
    achievementDetailSummary.textContent = achievement.summary;
    achievementDetailSummary.hidden = !achievement.summary;
  }

  function updateAchievementFrames(offset, focusIndex, focusAmount) {
    achievementFrameNodes.forEach((node) => {
      const distance = node.baseDistance - offset;
      const visible = distance >= -achievementFramePadding && distance <= achievementTrackLength + achievementFramePadding;

      if (!visible) {
        node.group.setAttribute("display", "none");
        return;
      }

      const pathDistance = Math.min(achievementTrackLength, Math.max(0, distance));
      const point = achievementArc.getPointAtLength(pathDistance);
      const tangentDistance = pathDistance < achievementTrackLength - 1 ? pathDistance + 1 : pathDistance - 1;
      const tangentPoint = achievementArc.getPointAtLength(Math.max(0, tangentDistance));
      const angle = Math.atan2(tangentPoint.y - point.y, tangentPoint.x - point.x) * (180 / Math.PI);

      node.group.removeAttribute("display");
      node.group.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
      node.group.classList.toggle("is-focus-target", node.eventIndex === focusIndex && node.isFocal);
      node.group.classList.toggle("is-focal", node.isFocal);
    });

    achievementsFilm.classList.toggle("is-focused", focusAmount > 0.01);
  }

  function updateAchievementCamera(focusAmount) {
    if (focusAmount <= 0 || achievementTrackLength <= 0) {
      achievementsCamera.removeAttribute("transform");
      return;
    }

    const scale = achievementLerp(1, achievementMaxZoom, focusAmount);
    const translateX = focusAmount * achievementFocusTarget.x * (1 - scale);
    const translateY = focusAmount * achievementFocusTarget.y * (1 - scale);
    achievementsCamera.setAttribute("transform", `translate(${translateX} ${translateY}) scale(${scale})`);
  }

  function renderAchievements(progress) {
    const focusState = getAchievementFocusState(progress);
    const introEntrance = achievementEase(Math.min(1, progress / 0.12));
    const introTopTarget = Math.max(20, Math.min(72, window.innerHeight * 0.06));
    const introTop = achievementLerp(window.innerHeight * 0.5, introTopTarget, introEntrance);
    const introScale = achievementLerp(1, 0.48, introEntrance);
    const introAmount = progress < 0.12 ? 1 : 1 - focusState.amount;
    const filmEntry = achievementEase(Math.min(1, progress / 0.13));
    const offset = getAchievementOffset(progress);

    achievementsIntro.style.top = `${introTop}px`;
    achievementsIntro.style.transform = `translateX(-50%) scale(${introScale})`;
    achievementsIntro.style.opacity = String(introAmount);
    achievementsIntro.style.pointerEvents = introAmount > 0.01 ? "auto" : "none";
    achievementsFilm.style.opacity = String(filmEntry);
    updateAchievementFrames(offset, focusState.index, focusState.amount);
    updateAchievementCamera(focusState.amount);

    if (focusState.index >= 0) updateAchievementDetail(focusState.index);
    const detailAmount = focusState.amount;
    achievementDetail.style.opacity = String(detailAmount);
    achievementDetail.style.transform = `translate(-50%, ${(1 - detailAmount) * 14}px)`;
    achievementDetail.setAttribute("aria-hidden", String(detailAmount < 0.2));
  }

  function requestAchievementRender() {
    if (achievementFrameRequested) return;
    achievementFrameRequested = true;
    window.requestAnimationFrame(() => {
      achievementFrameRequested = false;
      renderAchievements(getAchievementProgress());
    });
  }

  if (achievementTrackLength > 0) {
    buildAchievementFrames();
    achievementsSection.classList.add("is-enhanced");

    if (reducedMotion) {
      achievementsSection.classList.add("is-reduced");
      renderAchievements(0.08);
    } else {
      window.addEventListener("scroll", requestAchievementRender, { passive: true });
      window.addEventListener("resize", requestAchievementRender);
      requestAchievementRender();
    }
  }
}

const raceSection = document.querySelector("#work");
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
    slug: "zeni",
    name: "Zeni",
    category: "Software / Product",
    description: "A project from the selected work lineup.",
    award: "",
    link: "",
  },
  {
    number: "02",
    slug: "kairo",
    name: "Kairo",
    category: "Software / Product",
    description: "A project from the selected work lineup.",
    award: "",
    link: "",
  },
  {
    number: "03",
    slug: "ayudapay",
    name: "AyudaPay",
    category: "FinTech / Blockchain / AI",
    description: "A blockchain-enabled aid distribution system designed for transparent and instant financial assistance.",
    award: "🏆 Champion — Hack-it-UP 2026 · UP SoComSci",
    link: "",
  },
  {
    number: "04",
    slug: "sulatbaybayin",
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
const motionBuffer = 0.06;

function clampProjectProgress(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getProjectScrollProgress() {
  const bounds = raceSection.getBoundingClientRect();
  const scrollableDistance = Math.max(1, bounds.height - window.innerHeight);
  const rawProgress = clampProjectProgress(-bounds.top / scrollableDistance);
  return clampProjectProgress((rawProgress - motionBuffer) / (1 - motionBuffer * 2));
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

function updateProjectPanel(index) {
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
      : `<span class="project-panel__muted">Project link to be added</span>`;
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

function updateProjectTrack(progress) {
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

function renderProjects() {
  frameRequested = false;
  const progress = getProjectScrollProgress();
  lastProgress = progress;
  updateProjectTrack(progress);
  updateProjectPanel(getProjectIndex(progress));
}

function requestProjectRender() {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(renderProjects);
}

function makeProjectFallbackVisible() {
  panel.removeAttribute("aria-hidden");
  panel.classList.remove("is-changing");
  updateProjectPanel(0);
  if (trackPath && completedPath && car) updateProjectTrack(lastProgress);
}

if (raceSection && trackPath && completedPath && car) {
  completedPath.style.strokeDasharray = `${trackLength} ${trackLength}`;
  completedPath.style.strokeDashoffset = String(trackLength);
  window.addEventListener("scroll", requestProjectRender, { passive: true });
  window.addEventListener("resize", requestProjectRender);
  requestProjectRender();
} else if (panel && panelNumber && panelTitle && panelAward && panelCategory && panelDescription && panelAction && projectArtwork && ghostNumber) {
  makeProjectFallbackVisible();
}
