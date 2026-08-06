// Video data structure
const videosData = {
    'Season 1': {
        emoji: '🌱',
        categories: {
            'Episode 1': {
                emoji: '💠',
                videos: [
                    { id: 'ep1', title: 'The Arrival', stream: 'https://assets.biblebarnyard.com/series/MisfitGrotto/01_s.mp4', download: 'https://assets.biblebarnyard.com/series/MisfitGrotto/01_d.mp4' }
                                    ]
            },
            'Episode 2': {
                emoji: '💠',
                videos: [
                    { id: 'ep2', title: 'A New Friend', stream: 'https://assets.biblebarnyard.com/series/MisfitGrotto/02_s.mp4', download: 'https://assets.biblebarnyard.com/series/MisfitGrotto/02_d.mp4' },
                                   ]
           
            },
            'Episode 3': {
                emoji: '💠',
                videos: [
                    { id: 'ep3', title: 'The Warning in the Walls', stream: 'https://assets.biblebarnyard.com/series/MisfitGrotto/03_s.mp4', download: 'https://assets.biblebarnyard.com/series/MisfitGrotto/03_d.mp4' },
                                   ]
           
            }
        }
    }
};

// ── Upcoming Episode Placeholder ────────────────────────────────────
// Edit these two lines whenever a new episode is in the pipeline.
// Set enabled to false to hide the block entirely (e.g. right after a
// new episode has actually gone live and this data has been updated
// above with its real entry).
const upcomingRelease = {
    enabled: true,
    episode: 'Episode 4',
    date: '24AUG26'
};

// Generate video map for quick lookups
function generateVideoMap() {
    const map = {};
    for (const season in videosData) {
        const categories = videosData[season].categories;
        for (const category in categories) {
            const cat = categories[category];

            // Handle regular categories with videos
            if (cat.videos) {
                cat.videos.forEach(video => {
                    map[video.id] = video.stream;
                });
            }

            // Handle categories with subcategories
            if (cat.subcategories) {
                for (const subcat in cat.subcategories) {
                    cat.subcategories[subcat].videos.forEach(video => {
                        map[video.id] = video.stream;
                    });
                }
            }
        }
    }
    return map;
}

// Build the HTML structure
function buildVideoInterface() {
    const clustersContainer = document.querySelector('.clusters');
    if (!clustersContainer) return;

    clustersContainer.innerHTML = '';

    for (const seasonName in videosData) {
        const season = videosData[seasonName];

        const clusterDiv = document.createElement('div');
        clusterDiv.className = 'cluster';

        const seasonHeader = document.createElement('h3');
        seasonHeader.textContent = `${season.emoji} ${seasonName}`;
        clusterDiv.appendChild(seasonHeader);

        const subclustersDiv = document.createElement('div');
        subclustersDiv.className = 'subclusters';

        for (const categoryName in season.categories) {
            const category = season.categories[categoryName];

            const subclusterDiv = document.createElement('div');
            subclusterDiv.className = 'subcluster';

            // Handle categories with subcategories (like Joy & Parents)
            if (category.subcategories) {
                for (const subcatName in category.subcategories) {
                    const subcat = category.subcategories[subcatName];

                    const subcatHeader = document.createElement('h4');
                    subcatHeader.textContent = `${subcat.emoji} ${subcatName}`;
                    subclusterDiv.appendChild(subcatHeader);

                    subcat.videos.forEach((video, i) => {
                        subclusterDiv.appendChild(createVideoBlock(video, i));
                    });
                }
            }
            // Handle regular categories with videos
            else if (category.videos) {
                const categoryHeader = document.createElement('h4');
                categoryHeader.textContent = `${category.emoji} ${categoryName}`;
                subclusterDiv.appendChild(categoryHeader);

                category.videos.forEach((video, i) => {
                    subclusterDiv.appendChild(createVideoBlock(video, i));
                });
            }

            subclustersDiv.appendChild(subclusterDiv);
        }

        clusterDiv.appendChild(subclustersDiv);
        clustersContainer.appendChild(clusterDiv);
    }

    renderUpcomingEpisode();
}

// Render (or hide) the "next episode" teaser card based on upcomingRelease above
function renderUpcomingEpisode() {
    const container = document.getElementById('upcomingEpisode');
    if (!container) return;

    container.innerHTML = '';

    if (!upcomingRelease || !upcomingRelease.enabled) {
        container.style.display = 'none';
        return;
    }
    container.style.display = '';

    const icon = document.createElement('div');
    icon.className = 'upcoming-icon';
    icon.textContent = '🔮';

    const label = document.createElement('div');
    label.className = 'upcoming-label';
    label.textContent = 'A New Tale Approaches';

    const name = document.createElement('div');
    name.className = 'upcoming-episode-name';
    name.textContent = upcomingRelease.episode;

    const date = document.createElement('div');
    date.className = 'upcoming-date';

    const dateLead = document.createTextNode('Approx. Release Date ');
    const dateValue = document.createElement('span');
    dateValue.textContent = upcomingRelease.date;

    date.appendChild(dateLead);
    date.appendChild(dateValue);

    container.appendChild(icon);
    container.appendChild(label);
    container.appendChild(name);
    container.appendChild(date);
}

// Track row index per subcluster for alternating colors
let _rowIndex = 0;

// Helper function to create a video block
function createVideoBlock(video, rowIndex) {
    const videoBlock = document.createElement('div');
    videoBlock.className = 'video-block' + (rowIndex % 2 === 1 ? ' video-block-alt' : '');

    const videoTitle = document.createElement('div');
    videoTitle.className = 'video-title';
    videoTitle.textContent = video.title;

    const statusIcon = document.createElement('span');
    statusIcon.className = 'watch-status unviewed';
    statusIcon.textContent = ' 🌟';
    videoTitle.appendChild(statusIcon);

    const videoLinks = document.createElement('div');
    videoLinks.className = 'video-links';

    const playLink = document.createElement('a');
    playLink.href = '#';
    playLink.setAttribute('data-video', video.id);
    playLink.title = 'Play';

    const playImg = document.createElement('img');
    playImg.src = '/images/play.png';
    playImg.alt = 'Play';
    playImg.className = 'icon-btn';
    playLink.appendChild(playImg);

    const downloadLink = document.createElement('a');
    downloadLink.href = video.download;
    downloadLink.setAttribute('download', '');
    downloadLink.title = 'Download';

    const downloadImg = document.createElement('img');
    downloadImg.src = '/images/download.png';
    downloadImg.alt = 'Download';
    downloadImg.className = 'icon-btn';
    downloadLink.appendChild(downloadImg);

    videoLinks.appendChild(playLink);
    videoLinks.appendChild(downloadLink);

    videoBlock.appendChild(videoTitle);
    videoBlock.appendChild(videoLinks);

    return videoBlock;
}