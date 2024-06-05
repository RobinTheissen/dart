document.addEventListener('DOMContentLoaded', () => {
    let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    let doubleMode = false;
    let tripleMode = false;
    let throws = 0;
    let totalPoints = 0;

    const restScoreElement = document.querySelector('.restScore');
    const calculatedPointsElement = document.querySelector('.calculatedPoints');
    const firstThrowElement = document.querySelector('.firstThrow');
    const secondThrowElement = document.querySelector('.secondThrow');
    const thirdThrowElement = document.querySelector('.thirdThrow');

    document.getElementById('scoreboardForm').addEventListener('submit', handleFormSubmission);

    function handleFormSubmission(event) {
        event.preventDefault();
    }

    function throwHandler() {
        if (throws === 3) {
            throws = 0; // Reset throws to 0 so that the next increment starts from 1
            totalPoints = 0; // Reset total points after the third throw
            clearThrowsDisplay();
            updateRestScore(); // Update the display to show the reset points
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

    function updateRestScore() {
        if (selectedOptions.points > 0) {
            calculatedPointsElement.innerHTML = `${totalPoints}`;
            restScoreElement.innerHTML = `Rest: ${selectedOptions.points}`;
        } else if (selectedOptions.points === 0) {
            calculatedPointsElement.innerHTML = `Gewonnen`;
            restScoreElement.innerHTML = ``;
            clearThrowsDisplay();
        }
    }

    window.changeMode = function(mode) { // Globally expose changeMode
        if (mode === 'D') {
            doubleMode = true;
            tripleMode = false;
        } else if (mode === 'T') {
            tripleMode = true;
            doubleMode = false;
        }
    };

    window.calculatePoints = function(points) { // Globally expose calculatePoints
        let modifiedPoints = points;

        if (doubleMode) {
            modifiedPoints *= 2;
        } else if (tripleMode) {
            modifiedPoints *= 3;
        }

        if (selectedOptions.points - modifiedPoints >= 0) {
            throwHandler();
            totalPoints += modifiedPoints;
            selectedOptions.points -= modifiedPoints;
            localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
            
            updateThrowsDisplay(modifiedPoints);
            updateRestScore();
            doubleMode = false;
            tripleMode = false;
        } else {
            console.log('überworfen');
        }
    };

    restScoreElement.innerHTML = `Rest: ${selectedOptions.points}`;

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
