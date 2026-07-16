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
            // 'Episode 2': {
            //     emoji: '💠',
            //     videos: [
            //         { id: 'truth1', title: 'A New Friend', stream: 'https://assets.biblebarnyard.com/series/A/A05ATruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A05ATruth_d.mp4' },
            //                        ]
           
            // }
        }
    }
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