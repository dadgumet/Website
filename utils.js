// Automatically set the current year in all year spans
document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ── Data & state ────────────────────────────────────────────────────
const videoMap = generateVideoMap();   // id → stream URL
let   videoList = [];                  // flat ordered array of video objects

function buildFlatVideoList() {
    videoList = [];
    for (const seasonName in videosData) {
        const season = videosData[seasonName];
        for (const catName in season.categories) {
            const cat = season.categories[catName];
            if (cat.videos) {
                cat.videos.forEach(v => videoList.push(v));
            }
            if (cat.subcategories) {
                for (const subcatName in cat.subcategories) {
                    cat.subcategories[subcatName].videos.forEach(v => videoList.push(v));
                }
            }
        }
    }
}

const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos') || '[]');
const player        = document.getElementById('mainVideo');
const loadingIndicator = document.getElementById('videoLoading');
const placeholder   = document.getElementById('videoPlaceholder');
const videoContainer = document.getElementById('videoContainer');
const bingeToggle   = document.getElementById('bingeToggle');
const bingeRow      = document.getElementById('bingeRow');
const bingeCountdown = document.getElementById('bingeCountdown');
const countdownNumber = document.getElementById('countdownNumber');
const countdownBar  = document.getElementById('countdownBar');
const nextVideoTitle = document.getElementById('nextVideoTitle');
const cancelBingeBtn = document.getElementById('cancelBinge');

let isFirstPlay    = true;
let currentVideoId = null;
let countdownTimer = null;
let countdownInterval = null;
const COUNTDOWN_SECS = 5;

// ── Binge Watch toggle ───────────────────────────────────────────────
bingeToggle.addEventListener('change', () => {
    bingeRow.classList.toggle('active', bingeToggle.checked);
    if (!bingeToggle.checked) cancelCountdown();
});

// ── Load & play a video ──────────────────────────────────────────────
function loadVideo(videoUrl, videoId) {
    cancelCountdown();

    currentVideoId = videoId || getIdByUrl(videoUrl);

    if (isFirstPlay) {
        placeholder.style.display = 'none';
        player.style.display = 'block';
        isFirstPlay = false;
    }

    videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadingIndicator.classList.add('show');

    const startPlayback = () => {
        loadingIndicator.classList.remove('show');
        const p = player.play();
        if (p) p.catch(() => {});
    };

    player.onloadedmetadata = startPlayback;
    player.onloadeddata     = startPlayback;
    player.oncanplay        = () => loadingIndicator.classList.remove('show');

    player.querySelector('source').src = videoUrl;
    player.load();

    if (!viewedVideos.includes(videoUrl)) {
        viewedVideos.push(videoUrl);
        localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
    }

    updateViewedIcons();
    highlightNowPlaying(currentVideoId);

    // Analytics
    const fileName = videoUrl.split('/').pop();
    player.removeEventListener('play', trackVideoPlay);
    function trackVideoPlay() {
        fetch('https://biblebarnyard-analytics.biblebarnyard.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'play', file: fileName })
        }).catch(() => {});
        player.removeEventListener('play', trackVideoPlay);
    }
    player.addEventListener('play', trackVideoPlay);
}

// When a video ends, start binge countdown if enabled
player.addEventListener('ended', () => {
    if (!bingeToggle.checked) return;
    const nextVideo = getNextVideo(currentVideoId);
    if (!nextVideo) return;
    startCountdown(nextVideo);
});

// ── Countdown logic ──────────────────────────────────────────────────
function startCountdown(nextVideo) {
    nextVideoTitle.textContent = nextVideo.title;
    bingeCountdown.classList.add('show');

    let remaining = COUNTDOWN_SECS;
    countdownNumber.textContent = remaining;
    countdownBar.style.transition = 'none';
    countdownBar.style.width = '100%';

    // Kick off the shrinking bar after a tiny delay so transition applies
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            countdownBar.style.transition = `width ${COUNTDOWN_SECS}s linear`;
            countdownBar.style.width = '0%';
        });
    });

    countdownInterval = setInterval(() => {
        remaining--;
        countdownNumber.textContent = remaining;
        if (remaining <= 0) clearInterval(countdownInterval);
    }, 1000);

    countdownTimer = setTimeout(() => {
        cancelCountdown();
        loadVideo(nextVideo.stream, nextVideo.id);
    }, COUNTDOWN_SECS * 1000);
}

function cancelCountdown() {
    clearTimeout(countdownTimer);
    clearInterval(countdownInterval);
    bingeCountdown.classList.remove('show');
}

cancelBingeBtn.addEventListener('click', cancelCountdown);

// ── Helpers ──────────────────────────────────────────────────────────
function getIdByUrl(url) {
    for (const id in videoMap) {
        if (videoMap[id] === url) return id;
    }
    return null;
}

function getNextVideo(currentId) {
    const idx = videoList.findIndex(v => v.id === currentId);
    if (idx === -1 || idx >= videoList.length - 1) return null;
    return videoList[idx + 1];
}

function highlightNowPlaying(videoId) {
    document.querySelectorAll('.video-block.now-playing')
            .forEach(el => el.classList.remove('now-playing'));
    if (!videoId) return;
    const link = document.querySelector(`[data-video="${videoId}"]`);
    if (link) link.closest('.video-block').classList.add('now-playing');
}

function updateViewedIcons() {
    document.querySelectorAll('.video-block').forEach(block => {
        const playLink = block.querySelector('[data-video]');
        if (!playLink) return;
        const videoId  = playLink.getAttribute('data-video');
        const videoUrl = videoMap[videoId];
        const statusEl = block.querySelector('.watch-status');
        if (!statusEl) return;

        const isViewed = viewedVideos.includes(videoUrl);
        statusEl.textContent = isViewed ? ' ✔️' : ' 🌟';
        statusEl.classList.toggle('viewed', isViewed);
        statusEl.classList.toggle('unviewed', !isViewed);
    });
}

function attachVideoListeners() {
    document.querySelectorAll('[data-video]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const vid = link.getAttribute('data-video');
            const url = videoMap[vid];
            if (url) loadVideo(url, vid);
        });
    });
}

// ── Boot ─────────────────────────────────────────────────────────────
buildFlatVideoList();
buildVideoInterface();
attachVideoListeners();

const urlParams = new URLSearchParams(window.location.search);
const videoId   = urlParams.get('v');
if (videoId && videoMap[videoId]) loadVideo(videoMap[videoId], videoId);

updateViewedIcons();

document.getElementById('resetWatched').addEventListener('click', () => {
    if (confirm('Are you sure you want to mark all videos as unwatched?')) {
        localStorage.removeItem('viewedVideos');
        viewedVideos.length = 0;
        updateViewedIcons();
    }
});