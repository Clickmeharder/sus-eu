document.addEventListener("DOMContentLoaded", function () {
    const commandInput = document.getElementById("commandInput");
    const outputElement = document.getElementById("terminaloutput");
    const toggleTerminalButton = document.getElementById("toggleTerminalButton");
    const terminalContainer = document.querySelector(".terminal-container");
    let isTerminalVisible = false;

    // Hide the terminal container by default
    terminalContainer.style.left = "-300px"; // Off-screen position

    // Add event listener to toggle terminal visibility
    toggleTerminalButton.addEventListener("click", function () {
        if (isTerminalVisible) {
            slideOut(terminalContainer);
        } else {
            slideIn(terminalContainer);
        }
        
        isTerminalVisible = !isTerminalVisible;
    });

    // Add event listener for Enter key press
   commandInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const inputValue = commandInput.value.trim();
            if (inputValue !== "") {
                outputElement.innerHTML += `<p>User: ${inputValue}</p>`;

                // Add a 3-second delay before sending the automated response
                setTimeout(function () {
                    const response = getAutomatedResponse(inputValue.toLowerCase());
                    if (response) {
                        outputElement.innerHTML += `<p class="automated-response">system: ${response}</p>`;
                    }

                    commandInput.value = "";

                    // Check if there are more than three total messages in the output
                    const messages = outputElement.getElementsByTagName("p");
                    if (messages.length > 3) {
                        outputElement.removeChild(messages[0]); // Remove the oldest message
                    }
                }, 3000); // 3000 milliseconds (3 seconds)
            }
        }
    });
    function slideIn(element) {
        let position = -300; // Initial off-screen position
        const animationInterval = setInterval(function () {
            if (position >= 250) {
                clearInterval(animationInterval);
            } else {
                position += 5; // Adjust the slide speed as needed
                element.style.left = position + "px";
            }
        }, 10); // Adjust the interval as needed
    }

    function slideOut(element) {
        let position = 250; // Initial on-screen position
        const animationInterval = setInterval(function () {
            if (position <= -300) {
                clearInterval(animationInterval);
            } else {
                position -= 5; // Adjust the slide speed as needed
                element.style.left = position + "px";
            }
        }, 10); // Adjust the interval as needed
    }

    function getAutomatedResponse(input) {
        const responses = {
            hello: "Hello! How can I assist you?",
            hi: "Hi there! What can I help you with?",
            hey: "Hey! How can I be of service?",
            whatsup: "Not much. What's up with you?",
            sup: "Sup! Need anything?",
            howdy: "Howdy! How can I assist you today?"
            // Add more responses as needed
        };

        return responses[input] || "";
    }
});
