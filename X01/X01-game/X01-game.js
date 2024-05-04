function calculatePoints(points) {
    let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    console.log(typeof selectedOptions.points)
    if (typeof selectedOptions.points === 'number') {
        selectedOptions.points -= points;
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        console.log(selectedOptions);
    } else {
        console.error('Ungültiger Wert für Punkte.');
    }
}