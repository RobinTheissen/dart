document.addEventListener('DOMContentLoaded', () => {
    let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    let doubleMode = false;
    let tripleMode = false;
    let throws = 0;
    let totalPoints = 0;
    let currentPlayerIndex = 0;
    let isLocked = false; // Variable to lock the throw inputs

    const restScoreElement = document.querySelector('.restScore');
    const calculatedPointsElement = document.querySelector('.calculatedPoints');
    const firstThrowElement = document.querySelector('.firstThrow');
    const secondThrowElement = document.querySelector('.secondThrow');
    const thirdThrowElement = document.querySelector('.thirdThrow');
    const currentPlayerElement = document.querySelector('.currentPlayer');

    // Initialisieren der Spielerinformationen
    selectedOptions.players = selectedOptions.players.map(player => ({
        name: player,
        points: selectedOptions.initialPoints,
        legs: selectedOptions.legs,
    }));

    document.getElementById('scoreboardForm').addEventListener('submit', handleFormSubmission);

    function handleFormSubmission(event) {
        event.preventDefault();
    }

    function throwHandler() {
        if (throws === 2) {
            isLocked = true; // Lock the input
            setTimeout(() => {
                throws = 0; // Reset throws to 0 so that the next increment starts from 1
                totalPoints = 0; // Reset total points after the third throw
                clearThrowsDisplay();
                switchPlayer();
                isLocked = false; // Unlock the input for the next player
            }, 3000);
        }
        throws++;
    }

    function clearThrowsDisplay() {
        firstThrowElement.innerHTML = ``;
        secondThrowElement.innerHTML = ``;
        thirdThrowElement.innerHTML = ``;
    }

    function updateThrowsDisplay(points) {
        if (throws === 1) {
            firstThrowElement.innerHTML = `${points}`;
        } else if (throws === 2) {
            secondThrowElement.innerHTML = `${points}`;
        } else if (throws === 3) {
            thirdThrowElement.innerHTML = `${points}`;
        }
    }

    function switchPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % selectedOptions.players.length;
        updateRestScore();
        updateCurrentPlayerDisplay();
    }

    function updateLegs() {
        const winAudio = document.getElementById('winSound');
        selectedOptions.players[currentPlayerIndex].legs--;

        if (selectedOptions.players[currentPlayerIndex].legs === 0) {
            winAudio.play();
            setTimeout(() => {
                window.history.back();
            }, 600);
        } else {
            totalPoints = 0;
            selectedOptions.players[currentPlayerIndex].points = selectedOptions.initialPoints;
            restScoreElement.innerHTML = `Rest: ${selectedOptions.players[currentPlayerIndex].points}`;
            winAudio.play();
        }
    }

    function updateRestScore() {
        const currentPlayer = selectedOptions.players[currentPlayerIndex];
        if (currentPlayer.points > 0) {
            calculatedPointsElement.innerHTML = `${totalPoints}`;
            restScoreElement.innerHTML = `Rest: ${currentPlayer.points}`;
        } else if (currentPlayer.points === 0) {
            restScoreElement.innerHTML = ``;
            clearThrowsDisplay();
            updateLegs();
            calculatedPointsElement.innerHTML = '';
        }
    }

    function updateCurrentPlayerDisplay() {
        const currentPlayer = selectedOptions.players[currentPlayerIndex];
        currentPlayerElement.innerHTML = `Current Player: ${currentPlayer.name}`;
    }

    window.changeMode = function (mode) { // Globally expose changeMode
        if (mode === 'D') {
            doubleMode = true;
            tripleMode = false;
        } else if (mode === 'T') {
            tripleMode = true;
            doubleMode = false;
        }
    };

    window.calculatePoints = function (points) { // Globally expose calculatePoints
        if (isLocked) return; // Prevent input if locked

        let modifiedPoints = points;
        const currentPlayer = selectedOptions.players[currentPlayerIndex];

        if (doubleMode) {
            modifiedPoints *= 2;
        } else if (tripleMode) {
            modifiedPoints *= 3;
        }

        if (currentPlayer.points - modifiedPoints > 1) {
            throwHandler();
            totalPoints += modifiedPoints;
            currentPlayer.points -= modifiedPoints;
            localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));

            updateThrowsDisplay(modifiedPoints);
            updateRestScore();
            doubleMode = false;
            tripleMode = false;
        } else if (currentPlayer.points - modifiedPoints === 0 && selectedOptions.out === 'singleOut') {
            throwHandler();
            totalPoints += modifiedPoints;
            currentPlayer.points -= modifiedPoints;
            localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));

            updateThrowsDisplay(modifiedPoints);
            updateRestScore();
            doubleMode = false;
            tripleMode = false;
        } else if (currentPlayer.points - modifiedPoints === 0 && selectedOptions.out === 'doubleOut') {
            if (doubleMode) {
                throwHandler();
                totalPoints += modifiedPoints;
                currentPlayer.points -= modifiedPoints;
                localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));

                updateThrowsDisplay(modifiedPoints);
                updateRestScore();
                doubleMode = false;
                tripleMode = false;
            } else {
                modifiedPoints = 0;
                console.log('überworfen');
                const audio = document.getElementById('überworfenSound');
                audio.play();
                throwHandler();
                updateThrowsDisplay(modifiedPoints);
                updateRestScore();
                doubleMode = false;
                tripleMode = false;
            }
        } else if (currentPlayer.points - modifiedPoints === 0 && selectedOptions.out === 'masterOut') {
            if (tripleMode) {
                throwHandler();
                totalPoints += modifiedPoints;
                currentPlayer.points -= modifiedPoints;
                localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));

                updateThrowsDisplay(modifiedPoints);
                updateRestScore();
                doubleMode = false;
                tripleMode = false;
            } else {
                modifiedPoints = 0;
                console.log('überworfen');
                const audio = document.getElementById('überworfenSound');
                audio.play();
                throwHandler();
                updateThrowsDisplay(modifiedPoints);
                updateRestScore();
                doubleMode = false;
                tripleMode = false;
            }
        } else {
            modifiedPoints = 0;
            console.log('überworfen');
            const audio = document.getElementById('überworfenSound');
            audio.play();
            throwHandler();
            updateThrowsDisplay(modifiedPoints);
            updateRestScore();
            doubleMode = false;
            tripleMode = false;
        }
    };

    updateRestScore();
    updateCurrentPlayerDisplay(); // Initiales Update des aktuellen Spielers

    document.querySelectorAll('.calculator button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const points = event.target.getAttribute('data-points');
            const mode = event.target.getAttribute('data-mode');

            if (mode) {
                changeMode(mode);
            } else if (points !== null) {
                calculatePoints(Number(points));
            }
        });
    });
});
