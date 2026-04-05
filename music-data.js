// Fetch and insert footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

// Dictionaries for Season 1
const Char1 = {
    name: "Char1",
    songs: [
        { title: "SongTitle", path: "./audio/Season1/<CHAR_1>/<SONG_1>.mp3" }
    ]
};

const Char2 = {
    name: "Char2",
    songs: [
        { title: "SongTitle", path: "./audio/Season1/<CHAR_2>/<SONG_2>.mp3" }
    ]
};

// Function to generate blocks
// Function to generate blocks
function createArtistBlock(artist, seasonId) {
    const subclusters = document.getElementById(seasonId);

    const subclusterDiv = document.createElement("div");
    subclusterDiv.className = "subcluster";

    const header = document.createElement("h4");
    header.textContent = artist.name;
    subclusterDiv.appendChild(header);

    artist.songs.forEach(song => {
        const songBlock = document.createElement("div");
        songBlock.className = "song-block";

        const title = document.createElement("div");
        title.className = "song-title";
        title.textContent = song.title;
        title.setAttribute("data-full-title", song.title); // Add full title as data attribute for tooltip
        songBlock.appendChild(title);

        const links = document.createElement("div");
        links.className = "song-links";

        const playLink = document.createElement("a");
        playLink.href = "#";
        playLink.textContent = "▶️ Play";
        playLink.dataset.audio = song.path;
        links.appendChild(playLink);

        const downloadLink = document.createElement("a");
        downloadLink.href = song.path;
        downloadLink.download = "";
        downloadLink.textContent = "⬇️ Download";
        links.appendChild(downloadLink);

        songBlock.appendChild(links);
        subclusterDiv.appendChild(songBlock);
    });

    subclusters.appendChild(subclusterDiv);
}

// Generate Season 1
document.addEventListener("DOMContentLoaded", function() {
    [Daisy1, Meadowlark1, Sarge1, Sivle1, Billie1].forEach(artist => createArtistBlock(artist, "season1"));
    
    // Initialize audio player and event listeners
    const mainAudio = document.getElementById("mainAudio");
    
    // SINGLE EVENT LISTENER WITH TRACKING
    document.addEventListener("click", function (e) {
        // Handle play button clicks
        if (e.target.matches("[data-audio]")) {
            e.preventDefault();

            // Skip analytics for placeholder songs
            if (e.target.dataset.audio === "#") {
                console.log('Placeholder song - not playing');
                return;
            }

            // Get filename for tracking
            const audioPath = e.target.dataset.audio;
            const fileName = audioPath.split('/').pop();
            console.log('Tracking play:', fileName);

            // Send analytics
            fetch('https://biblebarnyard-analytics.biblebarnyard.workers.dev', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'play', file: fileName })
            })
                .then(response => {
                    console.log('Analytics status:', response.status);
                    return response.json();
                })
                .then(data => console.log('Analytics response:', data))
                .catch(error => console.warn('Analytics error:', error));

            // Play the audio
            mainAudio.src = e.target.dataset.audio;
            mainAudio.play();
        }

        // Handle download clicks
        if (e.target.matches("a[download]")) {
            // Skip analytics and download for placeholder songs
            if (e.target.href === "#" || e.target.href.endsWith("#")) {
                e.preventDefault();
                console.log('Placeholder song - not downloading');
                return;
            }

            const fileName = e.target.href.split('/').pop();
            console.log('Tracking download:', fileName);

            // Send analytics
            fetch('https://biblebarnyard-analytics.biblebarnyard.workers.dev', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'download', file: fileName })
            })
                .then(response => {
                    console.log('Analytics status:', response.status);
                    return response.json();
                })
                .then(data => console.log('Analytics response:', data))
                .catch(error => console.warn('Analytics error:', error));
        }
    });
});