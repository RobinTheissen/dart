let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
let doubleMode = false;
let tripleMode = false;
let throws = 0;
let totalPoints = 0

// Funktion zum Aktualisieren der Anzeige der Würfe
function updateThrowsDisplay(points) {
    if (throws === 1){
        document.querySelector('.firstThrow').innerHTML = `${points}`;
    } else if (throws === 2){
        document.querySelector('.secondThrow').innerHTML = `${points}`;
    } else if (throws === 3){
        document.querySelector('.thirdThrow').innerHTML = `${points}`;
    }
}

// Funktion zum Aktualisieren des Restpunkte-Zählers
function updateRestScore() {
    if(selectedOptions.points > 0){
        document.querySelector('.calculatedPoints').innerHTML = `${totalPoints}`;
        document.querySelector('.restScore').innerHTML = `Rest: ${selectedOptions.points}`;
    } else {
        document.querySelector('.calculatedPoints').innerHTML = `Gewonnen`;
    }
}

// Funktion zum Behandeln des Formular-Ereignisses
function handleFormSubmission(event) {
    event.preventDefault();
}

// Hauptfunktion zum Berechnen der Punkte
function calculatePoints(points) {

    document.getElementById('scoreboardForm').addEventListener('submit', handleFormSubmission);

    if (selectedOptions.points - points >= 0) {
        totalPoints += points;
        selectedOptions.points -= points;
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        console.log(selectedOptions);
        if (throws === 3) {
            throws = 1; // Reset für neue Eingaben
            document.querySelector('.firstThrow').innerHTML = ``;
            document.querySelector('.secondThrow').innerHTML = ``;
            document.querySelector('.thirdThrow').innerHTML = ``;
            totalPoints = points;
        } else {
            throws++;
        }
    } else {
        console.error('Ungültiger Wert für Punkte.');
    }

    updateThrowsDisplay(points);
    updateRestScore();
}

// Event-Listener für das Formular-Ereignis

