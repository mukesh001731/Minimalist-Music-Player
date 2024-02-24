
let track_img = document.querySelector('.track-img');
let track_title = document.querySelector('.track-title');
let track_singer = document.querySelector('.track-singer');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.btn-shuffle .fas');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const playlist = [
    {
        title: 'Keejo Kesari Ke Laal',
        singer: 'Lakhbir Singh Lakha',
        image: 'images/4.png',
        src:"music/1.mp3"
    },

    {
        title: "Alag Aasmaan",
        singer: "Anuv Jain",
        img: "images/5.png",
        src: "music/2.mp3"
    },
    {
        title: "Chalo Chalein",
        singer: "Ritviz",
        img: "images/6.png",
        src: "music/3.mp3"
    },
    {
        title: "Kasoor",
        singer: "Prateek Kuhad",
        img: "images/7.png",
        src: "music/4.mp3"
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = playlist[track_index].src;
    curr_track.load();

    track_img.style.backgroundImage = "url(" + playlist[track_index].img + ")";
    track_title.textContent = playlist[track_index].title;
    track_singer.textContent = playlist[track_index].singer;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
   
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < playlist.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < playlist.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * playlist.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = playlist.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

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









