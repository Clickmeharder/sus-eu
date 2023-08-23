document.addEventListener("DOMContentLoaded", function() {
    const highscoresList = document.getElementById('highscores-list');

    // Retrieve highscores from localStorage
    const localHighscores = JSON.parse(localStorage.getItem('highscores')) || [];

    // Fetch highscores.json
    fetch('highscores.json')
        .then(response => response.json())
        .then(data => {
            // Merge and update highscores
            const mergedHighscores = mergeAndFindHighest(localHighscores, data);

            // Update localStorage with merged highscores
            localStorage.setItem('highscores', JSON.stringify(mergedHighscores));

            // Update highscores.json with merged highscores
            updateHighscoresJSON(mergedHighscores);

            // Clear any existing list items
            highscoresList.innerHTML = '';

            // Populate the list with merged highscores
            mergedHighscores.forEach((entry, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
                highscoresList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching highscores:', error);
        });
});

function mergeAndFindHighest(localHighscores, fetchedHighscores) {
    const mergedHighscores = [...localHighscores];

    fetchedHighscores.forEach((entry) => {
        const localEntry = mergedHighscores.find(item => item.name === entry.name);
        if (localEntry) {
            localEntry.score = Math.max(localEntry.score, entry.score);
        } else {
            mergedHighscores.push(entry);
        }
    });

    return mergedHighscores;
}

function updateHighscoresJSON(highscores) {
    const updatedData = JSON.stringify(highscores, null, 2);
    const url = 'highscores.json'; // Provide the correct URL to your highscores.json

    fetch(url, {
        method: 'PUT', // Use the appropriate HTTP method (PUT, POST, etc.)
        body: updatedData,
        headers: {
            'Content-Type': 'application/json'
            // Add any other required headers here
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Highscores updated successfully.');
        } else {
            console.error('Failed to update highscores:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error updating highscores:', error);
    });
}

