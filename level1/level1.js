const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

class Fireman {
    constructor(x, imageSrc) {
        this.width = 100;
        this.height = 20;
        this.positionX = x;
        this.positionY = canvas.height - this.height - 10;
        this.image = new Image();
        this.image.src = imageSrc;
        this.score = 0;
    }

    moveLeft() {
        this.positionX -= 20;
        if (this.positionX < 0) this.positionX = 0;
    }

    moveRight() {
        this.positionX += 20;
        if (this.positionX + this.width > canvas.width) this.positionX = canvas.width - this.width;
    }

    draw() {
        ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height);
    }
}

class Person {
    constructor(x, imageSrc) {
        this.width = 50; 
        this.height = 50; 
        this.positionX = x;
        this.positionY = 100;
        this.speed = 4;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    fall() {
        this.positionY += this.speed;
    }

    draw() {
        ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height);
    }

    checkCollision(fireman) {
        return (
            this.positionX < fireman.positionX + fireman.width &&
            this.positionX + this.width > fireman.positionX &&
            this.positionY < fireman.positionY + fireman.height &&
            this.positionY + this.height > fireman.positionY
        );
    }
}

class Plane {
    constructor() {
        this.width = 150;
        this.height = 50;
        this.positionX = -this.width; 
        this.positionY = 50; 
        this.speed = 2;
        this.image = new Image();
        this.image.src = "C:/Users/Madhusudhan/Downloads/Catching Game/plane.png";
    }

    fly() {
        this.positionX += this.speed;
        if (this.positionX > canvas.width) {
            this.positionX = -this.width;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height);
    }
}

class Game {
    constructor() {
        this.fireman1 = new Fireman(100, "C:/Users/Madhusudhan/Desktop/Game On/Air-Rescue/Assets/player 1.png");
        this.fireman2 = new Fireman(600, "C:/Users/Madhusudhan/Desktop/Game On/Air-Rescue/Assets/player 2.png");
        this.fallingPeople = [];
        this.timeLeft = 60;
        this.isGameOver = false;
        this.plane = new Plane();
        this.timer = null;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "C:/Users/Madhusudhan/Desktop/Game On/Air-Rescue/Assets/Level 1 bg.png";
    }

    spawnPerson() {
        const personX = this.plane.positionX + this.plane.width / 2 - 25; 
        this.fallingPeople.push(new Person(personX, "C:/Users/Madhusudhan/Desktop/Game On/Air-Rescue/Assets/woman.png"));
    }

    updateTime() {
        this.timeLeft--;
        document.getElementById("timeLeft").textContent = this.timeLeft;

        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.isGameOver = true;
        clearInterval(this.timer);

        const overlay = document.getElementById("winner-overlay");
        const winnerText = document.getElementById("winner-text");

        const score1 = this.fireman1.score;
        const score2 = this.fireman2.score;

        if (score1 > score2) {
            winnerText.textContent = "Player 1 Wins!";
        } else if (score2 > score1) {
            winnerText.textContent = "Player 2 Wins!";
        } else {
            winnerText.textContent = "It's a Tie!";
        }

        overlay.style.display = "flex";
    }

    updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);
        this.plane.fly();
        this.plane.draw();

        this.fireman1.draw();
        this.fireman2.draw();

        if (Math.random() < 0.02) {
            this.spawnPerson();
        }

        this.fallingPeople.forEach((person, index) => {
            person.fall();
            person.draw();

            if (person.checkCollision(this.fireman1)) {
                this.fireman1.score++;
                document.getElementById("score1").textContent = this.fireman1.score;
                this.fallingPeople.splice(index, 1);
            } else if (person.checkCollision(this.fireman2)) {
                this.fireman2.score++;
                document.getElementById("score2").textContent = this.fireman2.score;
                this.fallingPeople.splice(index, 1);
            } else if (person.positionY > canvas.height) {
                this.fallingPeople.splice(index, 1);
            }
        });
    }

    gameLoop() {
        if (!this.isGameOver) {
            this.updateGame();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    startGame() {
        this.isGameOver = false;
        this.timeLeft = 60;
        document.getElementById("timeLeft").textContent = this.timeLeft;

        this.fireman1.score = 0;
        this.fireman2.score = 0;
        document.getElementById("score1").textContent = 0;
        document.getElementById("score2").textContent = 0;

        this.timer = setInterval(() => this.updateTime(), 1000);
        this.gameLoop();
    }
}

const game = new Game();

document.addEventListener("keydown", (event) => {
    if (event.key === "a") {
        game.fireman1.moveLeft();
    } else if (event.key === "d") {
        game.fireman1.moveRight();
    } else if (event.key === "ArrowLeft") {
        game.fireman2.moveLeft();
    } else if (event.key === "ArrowRight") {
        game.fireman2.moveRight();
    }
});

function goToLevelScreen() {
    window.location.href = "C:/Users/Madhusudhan/Desktop/Game On/Air-Rescue/level/levelscreen/levelscreen.html";
}

game.startGame();