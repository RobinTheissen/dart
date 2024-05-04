let selectedOptions = {}; // Externe Variable zur Speicherung der ausgewählten Optionen

function submitForm(event) {
    event.preventDefault(); // Das Standardverhalten des Formulars verhindern

    // Die ausgewählten Werte der Select-Elemente erfassen
    let pointsSelect = document.getElementById('points');
    let legsSelect = document.getElementById('legs');
    let outSelect = document.getElementById('out');

    let selectedPoints = parseInt(pointsSelect.value);
    let selectedLegs = parseInt(legsSelect.value);
    let selectedOut = outSelect.value; // Wenn der Wert als String verwendet wird


    // Die Werte in der externen Variablen speichern
    selectedOptions = {
        points: selectedPoints,
        legs: selectedLegs,
        out: selectedOut
    };

    // Hier kannst du die gespeicherten Werte weiterverarbeiten
    console.log('Ausgewählte Optionen:', selectedOptions);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'X01-game/X01-game.html';
    // Weitere Verarbeitung oder Weiterleitung des Formulars
    // Zum Beispiel: Hier könntest du den Formularinhalt an einen Server senden
}