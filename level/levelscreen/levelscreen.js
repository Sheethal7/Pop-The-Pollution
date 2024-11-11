function openNav() {
    document.getElementById("overlay-nav").style.width = "250px";
}

function closeNav() {
    document.getElementById("overlay-nav").style.width = "0";
}
const backgroundMusic = new Audio("C:/Users/Madhusudhan/Desktop/Computing Technology/Pop-The-Pollution/Assets/BG Music.mp3");
const muteButton = document.getElementById("mute-btn");

// Check mute state in localStorage
let isMuted = localStorage.getItem("isMuted") === "true";

// Apply the saved mute state when the page loads
document.addEventListener("click", () => {
    if (isMuted) {
        backgroundMusic.muted = true;
        muteButton.textContent = "Unmute";
    } else {
        backgroundMusic.muted = false;
        muteButton.textContent = "Mute";
    }
    backgroundMusic.play(); // Start playing music when page loads
    backgroundMusic.volume = 0.5;
}, {once: true});

// Function to toggle mute
function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
    localStorage.setItem("isMuted", isMuted); // Save the mute state in localStorage
}
