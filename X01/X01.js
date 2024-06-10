document.addEventListener('DOMContentLoaded', () => {
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const playersContainer = document.getElementById('playersContainer');
    let playerCount = 1; // Start mit einem Spieler

    // Überprüfen, ob der Eventlistener bereits vorhanden ist, bevor er hinzugefügt wird
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', addPlayer);
    }

    function addPlayer() {
        playerCount++;
        const newPlayerInput = document.createElement('div');
        newPlayerInput.classList.add('player');
        newPlayerInput.innerHTML = `
            <input type="text" name="player${playerCount}" placeholder="Spieler ${playerCount}">
        `;
        playersContainer.appendChild(newPlayerInput);
    }

    document.getElementById('settingsForm').addEventListener('submit', submitForm);
});

function submitForm(event) {
    event.preventDefault();

    const players = [];
    document.querySelectorAll('#playersContainer input').forEach(input => {
        players.push(input.value.trim());
    });

    const selectedOptions = {
        players: players,
        initialPoints: parseInt(document.getElementById('points').value),
        points: parseInt(document.getElementById('points').value),
        legs: parseInt(document.getElementById('legs').value),
        out: document.getElementById('out').value,
        rules: document.getElementById('rules').value
    };

    console.log('Ausgewählte Optionen:', selectedOptions);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'X01-game/X01-game.html';
}
