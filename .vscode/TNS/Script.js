// ----- TRACK DATA -----
// Replace the paths with your local file names or remote URLs.
// Example: { name: "My Song", artist: "Me", src: "songs/song1.mp3", image: "images/art1.jpg" }
const tracks = [
  { name: "Sample Track 1", artist: "Artist A", src: "songs/song1.mp3", image: "images/art1.jpg" },
  { name: "Sample Track 2", artist: "Artist B", src: "songs/song2.mp3", image: "images/art2.jpg" },
  { name: "Sample Track 3", artist: "Artist C", src: "songs/song3.mp3", image: "images/art3.jpg" }
];

// ----- SELECTORS -----
const trackArt = document.getElementById('trackArt');
const trackName = document.getElementById('trackName');
const trackArtist = document.getElementById('trackArtist');
const currentIndexEl = document.getElementById('currentIndex');
const totalTracksEl = document.getElementById('totalTracks');

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

let audio = new Audio();
let currentIndex = 0;
let isPlaying = false;
let updateTimer;

// initialize
totalTracksEl.textContent = tracks.length;

// build playlist UI
function buildPlaylist(){
  playlistEl.innerHTML = '';
  tracks.forEach((t, idx) => {
    const li = document.createElement('li');
    li.textContent = `${t.name} — ${t.artist}`;
    li.dataset.index = idx;
    li.addEventListener('click', () => {
      loadTrack(idx);
      playTrack();
    });
    playlistEl.appendChild(li);
  });
}
buildPlaylist();

function markActive(){
  const items = playlistEl.querySelectorAll('li');
  items.forEach(i => i.classList.remove('active'));
  const active = playlistEl.querySelector(`li[data-index="${currentIndex}"]`);
  if(active) active.classList.add('active');
}

function loadTrack(index){
  clearInterval(updateTimer);
  resetValues();
  currentIndex = index;
  audio.src = tracks[currentIndex].src;
  audio.load();

  // UI
  trackName.textContent = tracks[currentIndex].name;
  trackArtist.textContent = tracks[currentIndex].artist;
  currentIndexEl.textContent = currentIndex + 1;
  markActive();

  // artwork
  trackArt.innerHTML = '';
  if(tracks[currentIndex].image){
    const img = document.createElement('img');
    img.src = tracks[currentIndex].image;
    img.alt = tracks[currentIndex].name;
    trackArt.appendChild(img);
  } else {
    trackArt.textContent = '🎵';
  }

  // start timer to update progress once metadata is loaded
  audio.addEventListener('loadedmetadata', () => {
    progress.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', nextTrack);
}

function resetValues(){
  currentTimeEl.textContent = "00:00";
  durationEl.textContent = "00:00";
  progress.value = 0;
}

function playTrack(){
  audio.play().then(() => {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
    updateTimer = setInterval(updateProgress, 500);
  }).catch(err => {
    console.warn("Play prevented (maybe autoplay policy).", err);
  });
}

function pauseTrack(){
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
  clearInterval(updateTimer);
}

function playpauseTrack(){
  if(!isPlaying) playTrack();
  else pauseTrack();
}

function prevTrack(){
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
}

function nextTrack(){
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
}

function updateProgress(){
  progress.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
  updateProgress();
});

// volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// play button
playBtn.addEventListener('click', playpauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// helper: format seconds to mm:ss
function formatTime(seconds){
  if(isNaN(seconds) || seconds === Infinity) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// start by loading the first track
loadTrack(currentIndex);
