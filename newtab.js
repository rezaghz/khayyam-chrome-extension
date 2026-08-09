let quatrains = [];
let currentIndex = 0;
let audioPlaying = false;
let isDarkTheme = true;

const lineA = document.getElementById('lineA');
const lineB = document.getElementById('lineB');
const lineC = document.getElementById('lineC');
const lineD = document.getElementById('lineD');
const quatrainNumber = document.getElementById('quatrainNumber');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const randomBtn = document.getElementById('randomBtn');
const audioPlayer = document.getElementById('audioPlayer');
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function toPersianDigits(num) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, d => persianDigits[d]);
}

function displayQuatrain(index) {
  if (quatrains.length === 0) return;

  currentIndex = index;
  const quatrain = quatrains[currentIndex];

  lineA.textContent = quatrain.A;
  lineB.textContent = quatrain.B;
  lineC.textContent = quatrain.C;
  lineD.textContent = quatrain.D;

  quatrainNumber.textContent = toPersianDigits(currentIndex + 1);

  document.querySelectorAll('.quatrain-text p').forEach((p, i) => {
    p.style.opacity = '0';
    setTimeout(() => {
      p.style.opacity = '1';
    }, i * 100);
  });

  stopAudio();
}

function getRandomIndex() {
  return Math.floor(Math.random() * quatrains.length);
}

function playAudio() {
  if (quatrains.length === 0) return;

  const audioNumber = String(currentIndex + 1).padStart(3, '0');
  audioPlayer.src = `audio/Q${audioNumber}.ogg`;
  audioPlayer.play();
  audioPlaying = true;
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'block';
  playBtn.classList.add('playing');
}

function stopAudio() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  audioPlaying = false;
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  playBtn.classList.remove('playing');
}

function toggleAudio() {
  if (audioPlaying) {
    stopAudio();
  } else {
    playAudio();
  }
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  sunIcon.style.display = isDarkTheme ? 'none' : 'block';
  moonIcon.style.display = isDarkTheme ? 'block' : 'none';
  localStorage.setItem('khayyam-theme', isDarkTheme ? 'dark' : 'light');
}

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  applyTheme();
}

themeToggle.addEventListener('click', toggleTheme);
playBtn.addEventListener('click', toggleAudio);

prevBtn.addEventListener('click', () => {
  if (quatrains.length === 0) return;
  const newIndex = currentIndex > 0 ? currentIndex - 1 : quatrains.length - 1;
  displayQuatrain(newIndex);
});

nextBtn.addEventListener('click', () => {
  if (quatrains.length === 0) return;
  const newIndex = currentIndex < quatrains.length - 1 ? currentIndex + 1 : 0;
  displayQuatrain(newIndex);
});

randomBtn.addEventListener('click', () => {
  displayQuatrain(getRandomIndex());
});

audioPlayer.addEventListener('ended', () => {
  audioPlaying = false;
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  playBtn.classList.remove('playing');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    prevBtn.click();
  } else if (e.key === 'ArrowLeft') {
    nextBtn.click();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleAudio();
  } else if (e.key === 'r' || e.key === 'R') {
    randomBtn.click();
  }
});

async function init() {
  const savedTheme = localStorage.getItem('khayyam-theme');
  isDarkTheme = savedTheme !== 'light';
  applyTheme();

  try {
    const response = await fetch(chrome.runtime.getURL('khayyam.json'));
    const data = await response.json();
    quatrains = Object.values(data.RUBAIYAT);
    displayQuatrain(getRandomIndex());
  } catch (error) {
    console.error('Failed to load quatrains:', error);
    lineA.textContent = 'خطا در بارگذاری اطلاعات';
  }
}

init();
