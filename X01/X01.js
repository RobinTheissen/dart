let selectedOptions = {}; // Externe Variable zur Speicherung der ausgewählten Optionen

function submitForm(event) {
    event.preventDefault(); // Das Standardverhalten des Formulars verhindern

    let pointsSelect = document.getElementById('points');
    let legsSelect = document.getElementById('legs');
    let outSelect = document.getElementById('out');
    let rulesSelect = document.getElementById('rules')

    let selectedPoints = parseInt(pointsSelect.value);
    let selectedLegs = parseInt(legsSelect.value);
    let selectedOut = outSelect.value;
    let selectedRules = rulesSelect.value
    
    selectedOptions = {
        points: selectedPoints,
        legs: selectedLegs,
        out: selectedOut,
        rules: selectedRules
    };

    console.log('Ausgewählte Optionen:', selectedOptions);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'X01-game/X01-game.html';
}