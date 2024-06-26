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
let repeatIcon = document.querySelector('.btn-repeat .fa');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let updateTimer;

const playlist = [
    {
        title: 'Keejo Kesari Ke Laal',
        singer: 'Lakhbir Singh Lakha',
        img: 'images/4.png',
        src: "music/1.mp3"
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
        img: "images/7.jpg",
        src: "music/4.mp3"
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = playlist[track_index].src;
    curr_track.load();

    track_img.style.backgroundImage = "url(" + playlist[track_index].img + ")";
    track_title.textContent = playlist[track_index].title;
    track_singer.textContent = playlist[track_index].singer;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', () => {
        if (isRepeat) {
            playTrack();
        } else {
            nextTrack();
        }
    });
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('active');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('active');
}

function repeatTrack() {
    isRepeat = !isRepeat;
    if (isRepeat) {
        repeatIcon.classList.add('active');
    } else {
        repeatIcon.classList.remove('active');
    }
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < playlist.length - 1 && !isRandom) {
        track_index += 1;
    } else if (track_index < playlist.length - 1 && isRandom) {
        let random_index = Number.parseInt(Math.random() * playlist.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = playlist.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
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
