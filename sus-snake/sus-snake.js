document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    const gridSize = 4;
    let score = 0;
    let snake = [{ x: 5, y: 5 }];
    let food = { x: 10, y: 10 };
    let direction = "right";
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [
        { name: "Player1", score: 10 },
        { name: "Player2", score: 9 },
        { name: "Player1", score: 8 },
        { name: "Player2", score: 7 },
        { name: "Player1", score: 6 },
        { name: "Player2", score: 5 },
    ];
    let isShiftPressed = false;
    let gameInterval = 150; // Base interval for normal speed
    const baseInterval = gameInterval; // Store the base interval for reset
    const resetButton = document.getElementById("resetButton");

    // Reset button click event listener
    resetButton.addEventListener("click", function() {
        location.reload();
    });

    function drawSnakePart(part, isFast) {
        // ... Your existing drawSnakePart code ...
    }

    function drawFood() {
        // ... Your existing drawFood code ...
    }

    function updateGameArea() {
        // ... Your existing updateGameArea code ...
    }

    function generateFood() {
        // ... Your existing generateFood code ...
    }

    // Create and append speedDisplay and speedIndicator elements
    const speedDisplay = document.createElement("div");
    speedDisplay.style.marginTop = "5px";
    speedDisplay.style.fontFamily = "Arial, sans-serif";
    speedDisplay.style.fontSize = "14px";
    speedDisplay.style.color = "white";

    const speedGaugeContainer = document.createElement("div");
    speedGaugeContainer.classList.add("speed-gauge-container");

    speedGaugeContainer.appendChild(speedIndicator);
    speedGaugeContainer.appendChild(speedDisplay);

    document.body.appendChild(speedGaugeContainer);

    // Append speedIndicator and speedDisplay to displayhud-container
    const displayHudContainer = document.querySelector(".displayhud-container");
    displayHudContainer.appendChild(speedIndicator);
    displayHudContainer.appendChild(speedDisplay);

    // ... Your existing event listeners ...

    // Start the game loop
    generateFood();
    let gameIntervalId = setInterval(updateGameArea, gameInterval);

    // Touch events using Hammer.js
    const gameCanvas = document.getElementById("gameCanvas");
    const hammer = new Hammer(gameCanvas);

    // Swipe gestures
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("swipeup", function() {
        direction = "up";
    });

    hammer.on("swipedown", function() {
        direction = "down";
    });

    hammer.on("swipeleft", function() {
        direction = "left";
    });

    hammer.on("swiperight", function() {
        direction = "right";
    });

    // Double tap gesture
    hammer.on("doubletap", function() {
        isShiftPressed = !isShiftPressed;
        gameInterval = isShiftPressed ? 50 : 150;
        speedIndicator.style.backgroundColor = isShiftPressed ? "green" : "red";
        speedDisplay.textContent = isShiftPressed ? "Speed: Fast" : "Speed: Normal";
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(updateGameArea, gameInterval);
    });

    // Highscores and reset functionality
    function displayHighscores() {
        // ... Your existing displayHighscores code ...
    }

    // Call displayHighscores to show the highscores on your highscores page
    displayHighscores();
});

// When loading the game or resetting highscores
function resetHighscores() {
    // ... Your existing resetHighscores code ...
}
