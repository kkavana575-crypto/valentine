document.addEventListener("DOMContentLoaded", () => {

/***********************
  SCREENS
************************/
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screenYes = document.getElementById("screenYes");
const screenNo = document.getElementById("screenNo");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");
const quizScreen = document.getElementById("quizScreen");
const loveGameScreen = document.getElementById("loveGameScreen");
const finalScreen = document.getElementById("finalScreen");

/***********************
  MUSIC
************************/
const music = document.getElementById("bgMusic");
let musicStarted = false;

function stopMusic() {
  if (!music) return;
  music.pause();
  music.currentTime = 0;
  musicStarted = false;
}

/***********************
  BUTTONS
************************/
const openBtn = document.getElementById("openBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backBtn = document.getElementById("backBtn");
const yesBackBtn = document.getElementById("yesBackBtn");
const nextBtn = document.getElementById("nextBtn");
const storyNextBtn = document.getElementById("storyNextBtn");
const storyBackBtn = document.getElementById("storyBackBtn");
const gameNextBtn = document.getElementById("gameNextBtn");
const gameBackBtn = document.getElementById("gameBackBtn");

/***********************
  STORY
************************/
const storyText = document.getElementById("storyText");

const storyPages = [
  `Every love story has a beginning.<br>This is ours ✨`,
  `It didn’t start with conversations,<br><br>
   Just a few glances in college…<br>
   silent eye contacts 🤍`,
  `Somewhere between those moments,<br>
   I started noticing you.`,
  `And that moment<br>stayed with me 🤍`
];

let storyIndex = 0;

/***********************
  PAGE NAVIGATION
************************/
openBtn.onclick = () => {
  screen1.classList.remove("active");
  screen2.classList.add("active");
};

yesBtn.onclick = () => {
  screen2.classList.remove("active");
  screenYes.classList.add("active");

  if (!musicStarted) {
    music.volume = 0;
    music.play();
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.8) {
        vol += 0.05;
        music.volume = vol;
      } else clearInterval(fade);
    }, 200);
    musicStarted = true;
  }
};

noBtn.onclick = () => {
  screen2.classList.remove("active");
  screenNo.classList.add("active");
};

backBtn.onclick = () => {
  screenNo.classList.remove("active");
  screen2.classList.add("active");
  stopMusic();
};

yesBackBtn.onclick = () => {
  screenYes.classList.remove("active");
  screen2.classList.add("active");
  stopMusic();
};

/***********************
  STORY FLOW
************************/
nextBtn.onclick = () => {
  screenYes.classList.remove("active");
  storyScreen.classList.add("active");
  storyIndex = 0;
  storyText.innerHTML = storyPages[storyIndex];
};

storyNextBtn.onclick = () => {
  storyIndex++;
  if (storyIndex < storyPages.length) {
    storyText.innerHTML = storyPages[storyIndex];
  } else {
    storyScreen.classList.remove("active");
    openGame();
  }
};

storyBackBtn.onclick = () => {
  storyScreen.classList.remove("active");
  screenYes.classList.add("active");
};

/***********************
  GAME (HEART TAP)
************************/
const heartBtn = document.getElementById("heartBtn");
const gameText = document.getElementById("gameText");
let heartCount = 0;

function openGame() {
  gameScreen.classList.add("active");
  heartCount = 0;
  heartBtn.style.display = "inline-block";
  gameText.innerText = "Tap the heart 💕";
  gameNextBtn.style.display = "none";
  gameBackBtn.style.display = "none";
}

function handleHeart(e) {
  e.preventDefault();
  heartCount++;
  if (heartCount < 3) {
    gameText.innerText = `You caught my heart ${heartCount} time(s) 💕`;
  } else {
    gameText.innerText = "Okay… you win 💖";
    heartBtn.style.display = "none";
    gameNextBtn.style.display = "inline-block";
    gameBackBtn.style.display = "inline-block";
  }
}

heartBtn.addEventListener("click", handleHeart);
heartBtn.addEventListener("touchstart", handleHeart);

gameBackBtn.onclick = () => {
  gameScreen.classList.remove("active");
  storyScreen.classList.add("active");
};

gameNextBtn.onclick = () => {
  gameScreen.classList.remove("active");
  openQuiz();
};

/***********************
  QUIZ (UNCHANGED)
************************/
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const wrongPopup = document.getElementById("wrongPopup");
const tryAgainBtn = document.getElementById("tryAgainBtn");

const quizData = [
  {
    question: "What caught my attention first?",
    options: [
      { text: "Your smile", correct: false },
      { text: "The way you talked", correct: false },
      { text: "Your walk 🤍", correct: true },
      { text: "Your confidence", correct: false }
    ]
  },
  {
    question: "Where did it all start?",
    options: [
      { text: "Texts in trip", correct: false },
      { text: "Random conversation", correct: false },
      { text: "Silent eye contact in college 🤍", correct: true },
      { text: "Instagram DM", correct: false }
    ]
  },
  {
    question: "What do I want now?",
    options: [
      { text: "Answers", correct: false },
      { text: "Promises", correct: false },
      { text: "You 🤍", correct: true },
      { text: "Time", correct: false }
    ]
  }
];

let quizIndex = 0;

function openQuiz() {
  quizScreen.classList.add("active");
  quizIndex = 0;
  loadQuiz();
}

function loadQuiz() {
  quizQuestion.innerText = quizData[quizIndex].question;
  quizOptions.innerHTML = "";

  quizData[quizIndex].options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option.text;
    btn.onclick = () => {
      if (option.correct) {
        quizIndex++;
        quizIndex < quizData.length ? loadQuiz() : finishQuiz();
      } else {
        wrongPopup.style.display = "flex";
      }
    };
    quizOptions.appendChild(btn);
  });
}

tryAgainBtn.onclick = () => {
  wrongPopup.style.display = "none";
};

/***********************
  FINAL LOVE GAME
************************/
const gameArea = document.getElementById("gameArea");
const bottle = document.getElementById("bottle");
const loveText = document.getElementById("loveText");
let loveCount = 0;

function finishQuiz() {
  quizScreen.classList.remove("active");
  loveGameScreen.classList.add("active");
  loveCount = 0;
  startHearts();
}

function moveBottle(clientX) {
  const rect = gameArea.getBoundingClientRect();
  const x = clientX - rect.left - 20;
  bottle.style.left = Math.min(260, Math.max(0, x)) + "px";
}

gameArea.addEventListener("mousemove", e => moveBottle(e.clientX));

let isTouchingGame = false;
gameArea.addEventListener("touchstart", () => isTouchingGame = true);
gameArea.addEventListener("touchend", () => isTouchingGame = false);
gameArea.addEventListener("touchmove", e => {
  if (isTouchingGame) {
    e.preventDefault();
    moveBottle(e.touches[0].clientX);
  }
}, { passive: false });

function startHearts() {
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-fall";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 260 + "px";
    gameArea.appendChild(heart);

    const check = setInterval(() => {
      const h = heart.getBoundingClientRect();
      const b = bottle.getBoundingClientRect();
      if (h.bottom >= b.top && h.left < b.right && h.right > b.left) {
        heart.remove();
        loveCount++;
        loveText.innerText = `Love caught: ${loveCount} 💕`;
        if (loveCount >= 10) {
          clearInterval(interval);
          setTimeout(() => {
            loveGameScreen.classList.remove("active");
            finalScreen.classList.add("active");
          }, 1200);
        }
        clearInterval(check);
      }
    }, 50);

    setTimeout(() => heart.remove(), 3000);
  }, 700);
}

});




