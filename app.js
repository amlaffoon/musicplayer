let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let nextTrackBtn = document.querySelector(".next-track");
let prevTrackBtn = document.querySelector(".prev-track");
let playPauseBtn = document.querySelector(".playpause-track");

let currentTime = document.querySelector(".current-time");
let seekSlider = document.querySelector(".seek-slider");
let totalDuration = document.querySelector(".total-duration");
let volumeSlider = document.querySelector(".volume-slider");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let currentTrack = document.createElement("audio");

let trackList = [
    {
        name: "Closer",
        artist: "Nine Inch Nails",
        image: "https://i.scdn.co/image/ab67616d0000b273786dc008f4d6fcf34ca8fd7e",
        path: "/nincloser.mp3"
    },
    {
        name: "Money Machine",
        artist: "100 gecs",
        image: "https://media.pitchfork.com/photos/5d2f2f7ce1d34500083e3d94/1:1/w_600/100gecs_1000gecs.jpg",
        path: "/moneymachine100gecs.mp3"
    },
    {
        name: "Neighbour",
        artist: "Mother Mother",
        image: "https://media.pitchfork.com/photos/5929af919d034d5c69bf472c/1:1/w_600/8ba5c502.jpg",
        path: "/mothermotherneighbour.mp3"
    }

]

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = trackList[track_index].path
    currentTrack.load();

    trackArt.style.backgroundImage = "url(" + trackList[track_index].image + ")";
    trackName.textContent = trackList[track_index].name;
    trackArtist.textContent = trackList[track_index].artist;
    nowPlaying.textContent = "Playing " + (track_index + 1) + " OF " + trackList.length;

    updateTimer = setInterval(seekUpdate, 1000);

    currentTrack.addEventListener("ended", nextTrack);
}

function resetValues() {
    currentTime.textContent = "00.00";
    totalDuration.textContent = "00.00";
    seekSlider.value = 0; //HUH????
}

loadTrack(track_index);

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    //go back to the first track if the current track is the last one in the list
    if (track_index < trackList.length - 1)
        track_index += 1;
    else track_index = 0;

    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1
    }
    else track_index = trackList.length - 1; //should not have -1?

    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekTo = currentTrack.duration * (seekSlider.value / 100);

    currentTrack.currentTime = seekTo;
}

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}



function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}



// try {
//     myRoutine();
//   } catch (e) {
//     if (e instanceof RangeError) {
//       // statements to handle this very common expected error
//     } else {
//       throw e;  // re-throw the error unchanged
//     }
//   }
