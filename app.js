// Function to select component
function selectComponent(component) {
    var componentTitle = document.getElementById('componentTitle');
    var sidebarItems = document.querySelectorAll('#sidebar ul li');

    componentTitle.textContent = component.charAt(0).toUpperCase() + component.slice(1);
    sidebarItems.forEach(function(item) {
        item.classList.remove('active');
    });

    // Hide all components
    var components = document.querySelectorAll('#content > div');
    components.forEach(function(component) {
        component.style.display = 'none';
    });

    // Show the selected component
    var componentToShow = document.getElementById(component + 'Component');
    if (componentToShow) {
        componentToShow.style.display = 'block';
        document.querySelector('#sidebar ul li[data-component="' + component + '"]').classList.add('active');
    } else {
        console.error('Invalid component');
    }
}

var darkMode = false; // Initialize dark mode state

function toggleDarkMode() {
    var body = document.body;
    var sidebar = document.getElementById('sidebar');
    var player = document.getElementById('player');
    var darkModeLabel = document.getElementById('darkModeLabel');
    var head = document.getElementById('header');

    // Toggle dark mode state
    if (darkMode) {
        // Apply light mode styles
        body.style.backgroundColor = '#fff';
        body.style.color = '#222';
        head.style.borderBottom = "1px solid black";

        sidebar.style.backgroundColor = '#fff';
        sidebar.style.color = '#222';
        player.style.backgroundColor = '#fff';
        player.style.color = '#222';
        head.style.backgroundColor = '#fff';
        head.style.color = '#222';
        darkModeLabel.textContent = 'Dark Mode';
        darkMode = false;
    } else {
        // Apply dark mode styles
        body.style.backgroundColor = '#222';
        body.style.color = '#fff';
        head.style.borderBottom = "1px solid white";

        sidebar.style.backgroundColor = '#222';
        sidebar.style.color = '#fff';
        player.style.backgroundColor = '#222';
        player.style.color = '#fff';
        head.style.backgroundColor = '#222';
        head.style.color = '#fff';
        darkModeLabel.textContent = 'Light Mode';
        darkMode = true;
    }
}

let audioElement = new Audio(); 
function playSong(src) {
    // Your logic to play the song with the given source
    console.log("Playing song:", src);
    // For example:
   
    audioElement.play(src);
}




document.addEventListener('DOMContentLoaded', function() {



let songIndex=0;
let songs = [
    { songName: "I'm trapped Here", filePath: "songs/starfrosch - I'm trapped Here.wav", coverPath: "covers/1.jpeg" },
    { songName: "Foley", filePath: "songs/foley.mp3", coverPath: "covers/8.webp" },
    { songName: "Dancehall", filePath: "songs/dancehall.mp3", coverPath: "covers/5.webp" },
    { songName: "Solaris", filePath: "songs/solaris.mp3", coverPath: "covers/6.webp" },
    { songName: "Eurosound", filePath: "songs/eurosound.mp3", coverPath: "covers/7.webp" },
    { songName: "termoxbeatz", filePath: "songs/tremoxbeatz.mp3", coverPath: "covers/4.jpeg" },
    { songName: "Vinee heights", filePath: "songs/vinee heights.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Tvari hawaii", filePath: "songs/tvari hawaii.mp3", coverPath: "covers/3.jpeg" }
];

let audioElement = new Audio(); // Initialize audio element
let master = document.getElementById('masterPlay');
let gif = document.getElementById('playingGif');
let isPlaying = false; // Variable to keep track of play state
let durationSpan = document.getElementById('duration'); 
var history= [];
var playlists = [];
//let songTitle = document.getElementById('musicTitle');

function addPlayedSong(song) {
    history.push(song);
};

// Function to update play icon
function updatePlayIcon(songState) {
    let playBtn = document.querySelector('.songItemPlay');
    if (songState) {
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        playBtn.classList.remove('fa-pause-circle');
        playBtn.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

function playSong(src) {
    console.log("Playing song:", src);
    audioElement.src = src;
    audioElement.play();
    updatePlayIcon(true)
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Shuffle button
document.getElementById('shuffle').addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * songs.length);
    let randomSong = songs[randomIndex];
    playSong(randomSong.filePath);
    masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    document.getElementById('BottomSongName').innerText = " - " +randomSong.songName;
});

let repeatMode = false;

    // Toggle repeat mode
    document.getElementById('loop').addEventListener('click', () => {
        repeatMode = !repeatMode;
        document.getElementById('loop').classList.toggle('active', repeatMode);
    });

    // Update progress bar and duration
    audioElement.addEventListener('timeupdate', () => {
        let currentTime = audioElement.currentTime;
        let duration = audioElement.duration;
        let progress = (currentTime / duration) * 100;

        progressBar.value = progress;
        durationSpan.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;

        // Repeat song if repeat mode is enabled and song has ended
        if (repeatMode && audioElement.ended) {
            audioElement.currentTime = 0;
            audioElement.play();
        }
    });

// Main play button
master.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayIcon(true);
      //  updateSongState(true);
        document.querySelector('.songItemPlay').classList.remove('fa-play-circle');
        document.querySelector('.songItemPlay').classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    } else {
        audioElement.pause();
        updatePlayIcon(false);
     //   updateSongState(false);
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide gif if paused
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});

function resetSongIcons() {
    // Reset icons for all song items
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

let playlist = [];
// Function to toggle song in playlist
function togglePlaylistSong(song) {
    var index = playlist.indexOf(song);
    if (index === -1) {
        // Add song to playlist
        playlist.push(song);
        console.log("Added to Playlist:", song.songName);
    } else {
        // Remove song from playlist
        playlist.splice(index, 1);
        console.log("Removed from Playlist:", song.songName);
    }
}

// Function to remove song from playlist
function removeFromPlaylist(index) {
    // Get the song to be removed
    var song = playlist[index];

    // Remove the song from the playlist
    playlist.splice(index, 1);
    console.log("Removed from Playlist:", song.songName);

    // Find the checkboxes for the removed song in the home component and uncheck them
    var checkboxes = document.getElementsByName("addToPlaylist");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value === song.songName) {
            checkboxes[i].checked = false;
        }
    }
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);
        
        if (clickedIndex !== songIndex || audioElement.paused) {
            // If a different song is clicked or the audio is paused, start playing the clicked song
            resetSongIcons(); // Reset icons for all songs
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            updatePlayIcon(true);
            addPlayedSong(songs[songIndex]);
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        } else {
            // If the same song is clicked and it's currently playing, pause it
            audioElement.pause();
            updatePlayIcon(false);
            gif.style.opacity = 0; // Hide gif if paused
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }

        // Update UI elements
        e.target.classList.toggle('fa-play-circle');
        e.target.classList.toggle('fa-pause-circle');
        document.getElementById('BottomSongName').innerText = " - " +songs[songIndex].songName;
       // updateSongState(!audioElement.paused);
        console.log(songIndex);
    });
});

// Function to add played song to the history
function addPlayedSong(song) {
    var historySongs = document.getElementById('historySongs');
    var songItem = document.createElement('div');   
    songItem.innerText = song.songName;
    historySongs.appendChild(songItem);
}




 // Next button
 document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    addPlayedSong(songs[songIndex]);
    document.getElementById('BottomSongName').innerText = " - " +songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayIcon(true);
});

// Change progress on progress bar click
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Get the input element and attach an event listener to it
var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    var searchText = searchInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    var songContainers = document.getElementsByClassName('song-container');

    // Loop through all song containers to check if they match the search text
    for (var i = 0; i < songContainers.length; i++) {
        var songTitle = songContainers[i].getElementsByClassName('song-title')[0].innerText.toLowerCase();
        // Check if the song title contains the search text
        if (songTitle.includes(searchText)) {
            songContainers[i].style.display = 'block'; // Show the song container if it matches
        } else {
            songContainers[i].style.display = 'none'; // Hide the song container if it doesn't match
        }
    }
});


// Previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    } else {
        songIndex -= 1;
    }
    addPlayedSong(songs[songIndex]);
    document.getElementById('BottomSongName').innerText = "   - " +songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongState(true);
    updatePlayIcon(true);
});


// Initial volume setup
audioElement.volume = volumeBar.value / 100;

// Update volume when the range input changes
volumeBar.addEventListener("input", function() {
  audioElement.volume = volumeBar.value / 100;
});


// Functions to adjust volume
function decreaseVolume() {
  if (audioElement.volume >= 0.1) {
    audioElement.volume -= 0.1;
  } else {
    audioElement.volume = 0; // Ensure volume doesn't go negative
  }
  volumeBar.value = audioElement.volume * 100;
}

function increaseVolume() {
  if (audioElement.volume <= 0.9) {
    audioElement.volume += 0.1;
  } else {
    audioElement.volume = 1; // Ensure volume doesn't exceed 1
  }
  volumeBar.value = audioElement.volume * 100;
}



 // Update progress bar and duration
 audioElement.addEventListener('timeupdate', () => {
    // Calculate current time
    let currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
    let currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
    // Format current time
    let formattedCurrentTime = `${currentTimeMinutes < 10 ? '0' : ''}${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    // Update duration
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration % 60);
    // Format duration
    let formattedDuration = `${durationMinutes < 10 ? '0' : ''}${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    // Update duration span
    durationSpan.innerText = `${formattedCurrentTime} / ${formattedDuration}`;
    // Calculate progress
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});







});