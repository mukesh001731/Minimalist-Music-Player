function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  let track = track_list[track_index];
  let track_url = `https://w.soundcloud.com/player/?url=${track.path}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
  let iframe = document.createElement('iframe');
  iframe.setAttribute('src', track_url);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '166');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', 'no');
  track_art.innerHTML = '';
  track_art.appendChild(iframe);
  track_name.textContent = track.name;
  track_artist.textContent = track.artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);
  random_bg_color();
}

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Yours Today",
    artist: "Lexx Strange",
    image: "https://1000logos.net/wp-content/uploads/2017/11/Spotify_logo_PNG23.png?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://soundcloud.com/lexxstrange/yours-today"
  },
  {
    name: "The Funeral",
    artist: "Band Of Horses",
    image: "https://1000logos.net/wp-content/uploads/2017/11/Spotify_logo_PNG23.png?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://soundcloud.com/bandofhorses/the-funeral"
  },
  {
    name: "Cooler Than A Bitch",
    artist: "Gunna",
    image: "https://1000logos.net/wp-content/uploads/2017/11/Spotify_logo_PNG23.png?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://soundcloud.com/gunna/cooler-than-a-bitch-feat-roddy-ricch"
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  let track = track_list[track_index];
  let track_url = `https://w.soundcloud.com/player/?url=${track.path}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
  let iframe = document.createElement('iframe');
  iframe.setAttribute('src', track_url);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '166');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', 'no');
  track_art.innerHTML = '';
  track_art.appendChild(iframe);
  track_name.textContent = track.name;
  track_artist.textContent = track.artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}










//Old JS Code 
const audioElements = document.querySelectorAll('audio');
const btnPlay = document.querySelector('.btns');
const btnPrev = document.querySelector('.btnp');
const btnNext = document.querySelector('.btnn');
const songName = document.querySelector('.song-name');

const currentTimeElement = document.querySelector('.current-time');
const totalDurationElement = document.querySelector('.total-duration');
const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');

const btnShuffle = document.querySelector('.btn-shuffle');
const btnRepeat = document.querySelector('.btn-repeat');


let currentAudioIndex = 0;

// audioElements[currentAudioIndex].play();
songName.textContent = audioElements[currentAudioIndex].src.split('/').pop();

let isSeeking = false; //Time & Duration

let isShuffleOn = false;
let isRepeatOn = false;

btnPlay.addEventListener('click', () => {
  if (audioElements[currentAudioIndex].paused) {
    audioElements[currentAudioIndex].play();
  } else {
    audioElements[currentAudioIndex].pause();
  }
});

btnPrev.addEventListener('click', () => {
  audioElements[currentAudioIndex].pause();
  currentAudioIndex--;
  if (currentAudioIndex < 0) {
    currentAudioIndex = audioElements.length - 1;
  }
  audioElements[currentAudioIndex].play();
  songName.textContent = audioElements[currentAudioIndex].src.split('/').pop();
});

btnNext.addEventListener('click', () => {
  audioElements[currentAudioIndex].pause();
  currentAudioIndex++;
  if (currentAudioIndex >= audioElements.length) {
    currentAudioIndex = 0;
  }
  audioElements[currentAudioIndex].play();
  songName.textContent = audioElements[currentAudioIndex].src.split('/').pop();
});


// Update the total duration display when the audio duration is available
audioElements[currentAudioIndex].onloadedmetadata = function() {
  totalDurationElement.textContent = formatTime(audioElements[currentAudioIndex].duration);
};

// Update the current time display every 100 milliseconds
const updateInterval = setInterval(() => {
  if (!isSeeking && audioElements[currentAudioIndex].currentTime > 0 && !audioElements[currentAudioIndex].paused) {
    updateTimeDisplays();
  }
}, 100);

// Handle seek operation
seekSlider.addEventListener('input', () => {
  isSeeking = true;
  const seekTime = audioElements[currentAudioIndex].duration * (seekSlider.value / 100);
  currentTimeElement.textContent = formatTime(seekTime);
});

seekSlider.addEventListener('change', () => {
  const seekTime = audioElements[currentAudioIndex].duration * (seekSlider.value / 100);
  audioElements[currentAudioIndex].currentTime = seekTime;
  isSeeking = false;
});

function formatTime(time) {
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(Math.floor(time % 60)).padStart(2, '0')}`;
}

function updateTimeDisplays() {
  currentTimeElement.textContent = formatTime(audioElements[currentAudioIndex].currentTime);
  seekSlider.value = (audioElements[currentAudioIndex].currentTime / audioElements[currentAudioIndex].duration) * 100;
}

volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value / 100;
  audioElements[currentAudioIndex].volume = volume;
});



btnShuffle.addEventListener('click', () => {
  isShuffleOn = !isShuffleOn;

  const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];
  function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
  }
 // Test shuffling the songs
console.log('Original order:', songs);
shuffleSongs();
console.log('Shuffled order:', songs);
});

btnRepeat.addEventListener('click', () => {
  isRepeatOn = !isRepeatOn;

  const audioElement = audioElements[currentAudioIndex];
  function repeatSong() {
    audioElement.currentTime = 0;
    audioElement.play();
  }
  // Test repeating the current song
console.log('Current time before repeat:', audioElement.currentTime);
repeatSong();
console.log('Current time after repeat:', audioElement.currentTime);
});









