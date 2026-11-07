const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if (menu && navigation) {
  menu.hidden = false;
  const setExpanded = (open) => menu.setAttribute('aria-expanded', String(open));
  menu.addEventListener('click', () => setExpanded(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setExpanded(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setExpanded(false);
      menu.focus();
    }
  });
}

const rail = document.querySelector('[data-film]');

if (rail) {
  const video = rail.querySelector('video');
  const stage = rail.querySelector('.film-sticky');
  const controls = rail.querySelector('.film-controls');
  const playButton = rail.querySelector('.play');
  const hint = rail.querySelector('.film-hint');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const playbackFraction = 0.72;
  let scrollPosition = 0;
  let requestedTime = 0;
  let animationFrame = 0;
  let manual = false;
  let manualScrollStart = 0;
  let unavailable = false;

  function updatePresentation(visible, time) {
    const progress = video.duration ? Math.max(0, Math.min(time / video.duration, 1)) : 0;
    rail.style.setProperty('--progress', visible ? progress : 0);
    rail.classList.toggle('is-visible', visible);
    rail.classList.toggle('is-finished', visible && time >= 3.66);
  }

  function updateButton() {
    const playing = !video.paused;
    rail.classList.toggle('is-playing', playing);
    const label = playing ? 'Mettre l’animation en pause'
      : manual && video.ended ? 'Rejouer l’animation' : 'Lire l’animation';
    playButton.setAttribute('aria-label', label);
    playButton.title = label;
  }

  function seekToRequestedFrame() {
    if (manual || unavailable || video.readyState < HTMLMediaElement.HAVE_METADATA || video.seeking) return;
    if (Math.abs(video.currentTime - requestedTime) > 0.021) {
      video.currentTime = requestedTime;
    } else if (scrollPosition > 0 && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      updatePresentation(true, video.currentTime);
    }
  }

  function syncToScroll() {
    animationFrame = 0;
    if (unavailable || motion.matches) return;

    if (manual) {
      if (Math.abs(window.scrollY - manualScrollStart) < 72) return;
      video.pause();
      manual = false;
      updateButton();
    }

    const distance = (rail.clientHeight - stage.offsetHeight) * playbackFraction;
    if (distance <= 0) return;
    const pinTop = Number.parseFloat(getComputedStyle(stage).top);
    scrollPosition = Math.max(0, Math.min(1, (pinTop - rail.getBoundingClientRect().top) / distance));
    if (scrollPosition <= 0.004) {
      scrollPosition = 0;
      updatePresentation(false, 0);
    }
    requestedTime = Math.max(0, (video.duration - 0.035) * scrollPosition) || 0;
    seekToRequestedFrame();
  }

  function scheduleScrollSync() {
    if (!animationFrame) animationFrame = requestAnimationFrame(syncToScroll);
  }

  function applyMotionPreference() {
    rail.classList.toggle('is-scrubbing', !motion.matches && !unavailable);
    hint.textContent = motion.matches ? 'Lecture à la demande' : 'Défiler pour animer';
    if (motion.matches && !manual) updatePresentation(false, 0);
    scheduleScrollSync();
  }

  function usePosterOnly() {
    unavailable = true;
    controls.hidden = true;
    updatePresentation(false, 0);
    rail.classList.remove('is-scrubbing');
  }

  playButton.addEventListener('click', async () => {
    if (!video.paused) {
      video.pause();
      return;
    }
    if (!manual || video.ended) video.currentTime = 0;
    manual = true;
    manualScrollStart = window.scrollY;
    try {
      await video.play();
    } catch {
      manual = false;
      updatePresentation(false, 0);
      scheduleScrollSync();
    }
    updateButton();
  });
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('ended', updateButton);
  video.addEventListener('loadedmetadata', scheduleScrollSync);
  video.addEventListener('loadeddata', scheduleScrollSync);
  video.addEventListener('seeked', () => {
    if (!manual) {
      if (scrollPosition > 0) updatePresentation(true, video.currentTime);
      seekToRequestedFrame();
    }
  });
  video.addEventListener('timeupdate', () => {
    if (manual) updatePresentation(true, video.currentTime);
  });
  video.addEventListener('error', usePosterOnly);
  window.addEventListener('scroll', scheduleScrollSync, {passive: true});
  window.addEventListener('resize', scheduleScrollSync, {passive: true});
  motion.addEventListener('change', applyMotionPreference);

  if (video.error || !video.canPlayType('video/mp4')) {
    usePosterOnly();
  } else {
    controls.hidden = false;
    applyMotionPreference();
  }
}
