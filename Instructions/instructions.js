function openNav() {
    document.getElementById("overlay-nav").style.width = "250px";
}

function closeNav() {
    document.getElementById("overlay-nav").style.width = "0";
}const backgroundMusic = new Audio("C:/Users/Madhusudhan/Desktop/Game On/Air-Rescue/Assets/BG Music.mp3");
const muteButton = document.getElementById("mute-btn");

let isMuted = localStorage.getItem("isMuted") === "true";

document.addEventListener("click", () => {
    if (isMuted) {
        backgroundMusic.muted = true;
        muteButton.textContent = "Unmute";
    } else {
        backgroundMusic.muted = false;
        muteButton.textContent = "Mute";
    }
    backgroundMusic.play();
    backgroundMusic.volume = 0.5;
}, {once: true});

function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
    localStorage.setItem("isMuted", isMuted);
}