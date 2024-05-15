let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
let doubleMode = false;
let tripleMode = false;
let throws = 0;
let totalPoints = 0

function handleFormSubmission(event) {
    event.preventDefault();
}

function throwHandler(){
    if (throws === 3) {
        throws = 1; // Reset für neue Eingaben
        document.querySelector('.firstThrow').innerHTML = ``;
        document.querySelector('.secondThrow').innerHTML = ``;
        document.querySelector('.thirdThrow').innerHTML = ``;
    } else {
        throws++;
    }
}

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
    } else if (selectedOptions.points === 0){
        document.querySelector('.calculatedPoints').innerHTML = `Gewonnen`;
        document.querySelector('.restScore').innerHTML = ``;
        document.querySelector('.firstThrow').innerHTML = ``;
        document.querySelector('.secondThrow').innerHTML = ``;
        document.querySelector('.thirdThrow').innerHTML = ``;
    }
}

// Funktion zum Behandeln des Formular-Ereignisses


function changeMode(points){

    document.getElementById('scoreboardForm').addEventListener('submit', handleFormSubmission);

    if(points === 'D'){
        doubleMode = true;
        tripleMode = false;
        console.log('double aktivated')
    } else if(points === 'T') {
        tripleMode = true;
        doubleMode = false;
        console.log('triple aktivated')
    }
}


// Hauptfunktion zum Berechnen der Punkte
function calculatePoints(points) {

    document.getElementById('scoreboardForm').addEventListener('submit', handleFormSubmission);

    let doubledPoints = points * 2
    let tripledPoints = points * 3

    changeMode(points);
    
    if (selectedOptions.points - points > 0) {
        if(doubleMode === true && selectedOptions.points - doubledPoints > 0){
            throwHandler();
            points = doubledPoints
            totalPoints += points
            selectedOptions.points -= points
            localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
            console.log(selectedOptions);
            doubleMode = false
            tripleMode = false
            console.log(throws)
            updateThrowsDisplay(points);
            console.log(points)
            console.log(doubledPoints)
            console.log(tripledPoints)
            console.log(selectedOptions.points)
            console.log('1')
        }
        else if(tripleMode === true && selectedOptions.points - tripledPoints > 0){
            throwHandler();
            points = tripledPoints
            totalPoints += points
            selectedOptions.points -= points
            localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
            console.log(selectedOptions);
            tripleMode = false
            doubleMode = false
            console.log(throws)
            updateThrowsDisplay(points);
            console.log(points)
            console.log(doubledPoints)
            console.log(tripledPoints)
            console.log(selectedOptions.points)
            console.log('2')
        }
        else if(selectedOptions.points - points > 0){
            throwHandler();
            totalPoints += points
            selectedOptions.points -= points
            localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
            console.log(selectedOptions);
            tripleMode = false
            doubleMode = false
            console.log(throws)
            updateThrowsDisplay(points);
            console.log(points)
            console.log(doubledPoints)
            console.log(tripledPoints)
            console.log(selectedOptions.points)
            console.log('3')
        }
        else{
            console.log('error bei restpunkten')
            doubleMode = false
            tripleMode = false
            console.log(throws)
        }
        
       
    }else if(doubleMode === true && selectedOptions.points - doubledPoints === 0) {
        points = doubledPoints
        totalPoints += points
        selectedOptions.points -= points
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        console.log(selectedOptions);
        doubleMode = false
        tripleMode = false
        updateThrowsDisplay(points);
        console.log(points)
            console.log(doubledPoints)
            console.log(tripledPoints)
            console.log(selectedOptions.points)
            console.log('4')
    }
    else if(tripleMode === true && selectedOptions.points - tripledPoints === 0){
        points = tripledPoints
        totalPoints += points
        selectedOptions.points -= points
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        console.log(selectedOptions);
        tripleMode = false
        doubleMode = false
        updateThrowsDisplay(points);
        console.log(points)
            console.log(doubledPoints)
            console.log(tripledPoints)
            console.log(selectedOptions.points)
            console.log('5')
    }
    else if(selectedOptions.points - points === 0){
        totalPoints += points
        selectedOptions.points -= points
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        console.log(selectedOptions);
        tripleMode = false
        doubleMode = false
        updateThrowsDisplay(points);
        console.log(points)
            console.log(doubledPoints)
            console.log(tripledPoints)
            console.log(selectedOptions.points)
            console.log('6')
        }
    else{
        console.log('überworfen')
        doubleMode = false
        tripleMode = false
        updateThrowsDisplay(points);
        console.log(throws)
    }

    
    updateRestScore();
}

document.addEventListener('DOMContentLoaded', () => {
    // Anzeige der Restpunkte beim Laden der Seite
    document.querySelector('.restScore').innerHTML = `Rest: ${selectedOptions.points}`;
});
