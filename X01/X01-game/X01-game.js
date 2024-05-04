let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
let doubleMode = false
let tripleMode = false

function calculatePoints(points) {
    if (selectedOptions.points - points >= 0) {
        selectedOptions.points -= points;
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        console.log(selectedOptions);
    } else {
        console.error('Ungültiger Wert für Punkte.');
    }
}