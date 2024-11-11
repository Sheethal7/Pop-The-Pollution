const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const buzzerSound = new Audio('Assets/Wrong Bubble Sound.mp3');
const dingSound = new Audio('Assets/Good Bubble.mp3');

function openNav() {
    document.getElementById("overlay-nav").style.width = "250px";
}

function closeNav() {
    document.getElementById("overlay-nav").style.width = "0";
}

function openPauseMenu() {
    document.getElementById("overlay-pause").style.width = "250px";
}

function closePauseMenu() {
    document.getElementById("overlay-pause").style.width = "0";
}

function resumeGame() {
    isGameRunning = true;
    closePauseMenu();
    updateGame();
    startTimer();
}

function quitGame() {
    window.location.href = 'C:\Users\Madhusudhan\Desktop\Computing Technology\Pop-The-Pollution\level\level2\level2oops\level2oops.html';
}


canvas.width = 600;
canvas.height = 400;

let score = 0;
let timer = 60;
let isGameRunning = true;
let bubbles = [];

const scoreDisplay = document.getElementById("score-display");
const timerDisplay = document.getElementById("timer-display");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");

const bubbleTexts = ['NOx', 'H2S', 'CH4', 'O3', 'O2', 'H2', 'He', 'CFC', 'HFC', 'N2', 'Ar', 'SO2', 'NH3', 'CO', 'CO2'];
const goodGases = ['Ar', 'O3', 'O2', 'H2', 'He', 'N2'];

class Bubble {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = `rgba(255, 255, 255, 0.25)`;
        this.borderColor = `whitesmoke`;
        this.text = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.borderColor;
        ctx.stroke();
        ctx.closePath();

        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x, this.y);
    }

    update() {
        this.y -= this.speed;
    }

    isClicked(mouseX, mouseY) {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
        return distance < this.radius;
    }
}

function spawnBubble() {
    if (!isGameRunning) return;

    const radius = 30;
    let x, y;
    let overlapping;

    do {
        x = Math.random() * (canvas.width - radius * 2) + radius;
        y = canvas.height + radius;
        overlapping = false;

        for (let bubble of bubbles) {
            const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
            if (distance < radius * 2) {
                overlapping = true;
                break;
            }
        }
    } while (overlapping);

    const speed = Math.random() * 1.5 + 2.25;
    bubbles.push(new Bubble(x, y, radius, speed));
}

function updateGame() {
    if (!isGameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const backgroundImage = new Image();
    backgroundImage.src = 'Assets\\Level 2 bg.png';
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble, index) => {
        bubble.update();
        bubble.draw();

        
if (bubble.y + bubble.radius < 0) {
    if (goodGases.includes(bubble.text)) {
        score++;
        dingSound.play();
    } else {
        score--;
        buzzerSound.play();
    }
    bubbles.splice(index, 1);
}

    });

    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}`;
    requestAnimationFrame(updateGame);
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (!isGameRunning) {
            clearInterval(timerInterval);
            return;
        }
        timer--;
        timerDisplay.textContent = `Time: ${timer}`;
        if (timer <= 0) {
            endGame();
            clearInterval(timerInterval);
        }
    }, 1000);
}

function endGame() {
    isGameRunning = false;
    finalScore.textContent = score;

    if (score >= 15) {
        window.location.href = 'C:\Users\Madhusudhan\Desktop\Computing Technology\Pop-The-Pollution\level\level2\level2congratulation\level2congratulation.html';
    } else {
        window.location.href = 'C:\Users\Madhusudhan\Desktop\Computing Technology\Pop-The-Pollution\level\level2\level2oops\level2oops.html';
    }
}

function restartGame() {
    score = 0;
    timer = 60;
    bubbles = [];
    isGameRunning = true;
    endScreen.classList.add("hidden");
    updateGame();
    startTimer();
}

canvas.addEventListener("click", (event) => {
    if (!isGameRunning) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    bubbles.forEach((bubble, index) => {
        if (bubble.isClicked(mouseX, mouseY)) {
            if (goodGases.includes(bubble.text)) {
                score--;
                buzzerSound.play();
            } else {
                score++;
                dingSound.play();
            }
            bubbles.splice(index, 1);
        }
    });
});

updateGame();
startTimer();
setInterval(spawnBubble, 1000);