document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    const gridSize = 4;
	let score = 0;
    let snake = [{ x: 5, y: 5 }];
    let food = { x: 10, y: 10 };
    let direction = "right";

    let isShiftPressed = false;
    let gameInterval = 150; // Base interval for normal speed
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function() {
        // Change the location to sus-snake.html
        window.location.href = "sus-snake.html";
    });
	function drawSnakePart(part, isFast) {
		context.fillStyle = isFast ? "blue" : "grey"; // Change color for fast speed
		context.fillRect(
			part.x * gridSize,
			part.y * gridSize,
			gridSize,
			gridSize
		);
		
		// Draw a border around the grid element
		context.strokeStyle = "black";
		context.lineWidth = 1;
		context.strokeRect(
			part.x * gridSize,
			part.y * gridSize,
			gridSize,
			gridSize
		);
	}

    function drawFood() {
        context.fillStyle = "red";
        context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    function updateGameArea() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Move the snake
        const newHead = { x: snake[0].x, y: snake[0].y };
        switch (direction) {
            case "up":
                newHead.y--;
                break;
            case "down":
                newHead.y++;
                break;
            case "left":
                newHead.x--;
                break;
            case "right":
                newHead.x++;
                break;
        }
		// Increment score for moving
		score += isShiftPressed ? 2 : 1;
        // Check for collision with food
        if (newHead.x === food.x && newHead.y === food.y) {
            snake.push({});
            generateFood();
			score += isShiftPressed ? 10 : 5; // Increment score for eating food
        }

        // Check for collision with walls or self
        if (
            newHead.x < 0 ||
            newHead.y < 0 ||
            newHead.x >= canvas.width / gridSize ||
            newHead.y >= canvas.height / gridSize ||
            snake.some(part => part.x === newHead.x && part.y === newHead.y)
        ) {
            clearInterval(gameIntervalId);
            return;
        }

        // Move the tail
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = { ...snake[i - 1] };
        }
        snake[0] = newHead;

        // Draw game elements
        snake.forEach(part => drawSnakePart(part, isShiftPressed)); // Pass the isShiftPressed value
        drawFood();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize)),
        };
    }

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


    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "ArrowUp":
            case "w":
            case "W":
                direction = "up";
                break;
            case "ArrowDown":
            case "s":
            case "S":
                direction = "down";
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                direction = "left";
                break;
            case "ArrowRight":
            case "d":
            case "D":
                direction = "right";
                break;
            case "Shift":
				isShiftPressed = true;
				gameInterval = isShiftPressed ? 50 : 150; // Adjust the interval for faster speed
				speedIndicator.style.backgroundColor = "green";
				speedDisplay.textContent = "Speed: Fast";
				clearInterval(gameIntervalId);
				gameIntervalId = setInterval(updateGameArea, gameInterval);
				gameInterval = isShiftPressed ? baseInterval / 2 : baseInterval;
				updateSpeedGauge();
				break;
		}
    });

    document.addEventListener("keyup", function(event) {
    if (event.key === "Shift") {
        isShiftPressed = false;
        gameInterval = 150; // Reset interval to normal speed
        speedIndicator.style.backgroundColor = "red";
        speedDisplay.textContent = "Speed: Normal";
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(updateGameArea, gameInterval);
        gameInterval = baseInterval;
        updateSpeedGauge();
    }
});


    generateFood();
    let gameIntervalId = setInterval(updateGameArea, gameInterval);
});


//----------------------------
//speed gage -------------
//-----------------------------
//
function updateSpeedGauge() {
    const maxSpeed = 300; // Adjust as needed
    const normalizedSpeed = gameInterval / maxSpeed;
    const speedIndicator = document.getElementById("speedIndicator");
    const speedDisplay = document.getElementById("speedDisplay"); // Make sure to get the speedDisplay element
    
    speedIndicator.style.width = `${normalizedSpeed * 100}%`;
    speedIndicator.style.height = "10px"; // Set a fixed height for the speedIndicator
    
    speedDisplay.textContent = `Speed: ${isShiftPressed ? "Fast" : "Normal"}`;
}