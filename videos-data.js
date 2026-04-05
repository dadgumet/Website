// Video data structure
const videosData = {
    'Season 1': {
        emoji: '🌱',
        categories: {
            'Love': {
                emoji: '❤️',
                videos: [
                    { id: 'love1', title: 'Love 1 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A01ALove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A01ALove_d.mp4' },
                    { id: 'love2', title: 'Love 2 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A01BLove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A01BLove_d.mp4' },
                    { id: 'love3', title: 'Love 3 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A02ALove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A02ALove_d.mp4' },
                    { id: 'love4', title: 'Love 4 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A02BLove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A02BLove_d.mp4' },
                    { id: 'love5', title: 'Love 5 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A03ALove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A03ALove_d.mp4' },
                    { id: 'love6', title: 'Love 6 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A03BLove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A03BLove_d.mp4' },
                    { id: 'love7', title: 'Love 7 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A04ALove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A04ALove_d.mp4' },
                    { id: 'love8', title: 'Love 8 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A04BLove_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A04BLove_d.mp4' }
                ]
            },
            'Truth': {
                emoji: '✨',
                videos: [
                    { id: 'truth1', title: 'Truth 1 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A05ATruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A05ATruth_d.mp4' },
                    { id: 'truth2', title: 'Truth 2 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A05BTruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A05BTruth_d.mp4' },
                    { id: 'truth3', title: 'Truth 3 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A06ATruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A06ATruth_d.mp4' },
                    { id: 'truth4', title: 'Truth 4 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A06BTruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A06BTruth_d.mp4' },
                    { id: 'truth5', title: 'Truth 5 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A07ATruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A07ATruth_d.mp4' },
                    { id: 'truth6', title: 'Truth 6 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A07BTruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A07BTruth_d.mp4' },
                    { id: 'truth7', title: 'Truth 7 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A08ATruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A08ATruth_d.mp4' },
                    { id: 'truth8', title: 'Truth 8 of 8', stream: 'https://assets.biblebarnyard.com/series/A/A08BTruth_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A08BTruth_d.mp4' }
                ]
            },
            'Joy & Parents': {
                emoji: '😊',
                subcategories: {
                    'Joy': {
                        emoji: '😊',
                        videos: [
                            { id: 'joy1', title: 'Joy 1 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A09AJoy_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A09AJoy_d.mp4' },
                            { id: 'joy2', title: 'Joy 2 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A09BJoy_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A09BJoy_d.mp4' },
                            { id: 'joy3', title: 'Joy 3 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A10AJoy_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A10AJoy_d.mp4' },
                            { id: 'joy4', title: 'Joy 4 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A10BJoy_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A10BJoy_d.mp4' }
                        ]
                    },
                    'Parents': {
                        emoji: '👨‍👩‍👧‍👦',
                        videos: [
                            { id: 'parents1', title: 'Parents 1 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A11AParents_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A11AParents_d.mp4' },
                            { id: 'parents2', title: 'Parents 2 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A11BParents_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A11BParents_d.mp4' },
                            { id: 'parents3', title: 'Parents 3 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A12AParents_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A12AParents_d.mp4' },
                            { id: 'parents4', title: 'Parents 4 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A12BParents_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A12BParents_d.mp4' }
                        ]
                    }
                }
            },
            'Lying & Why Bad Things Happen': {
                emoji: '🤥',
                subcategories: {
                    'Lying': {
                        emoji: '🤥',
                        videos: [
                            { id: 'lying1', title: 'Lying 1 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A13ALying_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A13ALying_d.mp4' },
                            { id: 'lying2', title: 'Lying 2 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A13BLying_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A13BLying_d.mp4' },
                            { id: 'lying3', title: 'Lying 3 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A14ALying_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A14ALying_d.mp4' },
                            { id: 'lying4', title: 'Lying 4 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A14BLying_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A14BLying_d.mp4' }
                        ]
                    },
                    'Why Bad Things Happen': {
                        emoji: '❓',
                        videos: [
                            { id: 'whybad1', title: 'Why Bad Things Happen 1 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A15ABadThings_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A15ABadThings_d.mp4' },
                            { id: 'whybad2', title: 'Why Bad Things Happen 2 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A15BBadThings_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A15BBadThings_d.mp4' },
                            { id: 'whybad3', title: 'Why Bad Things Happen 3 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A16ABadThings_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A16ABadThings_d.mp4' },
                            // { id: 'whybad4', title: 'Why Bad Things Happen 4 of 4', stream: 'https://assets.biblebarnyard.com/series/A/A16BBadThings_s.mp4', download: 'https://assets.biblebarnyard.com/series/A/A16BBadThings_d.mp4' }
                        ]
                    }
                }
            }
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