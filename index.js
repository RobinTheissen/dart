function choose(event){
    event.preventDefault()

    let gameElement = document.getElementById('chooseGame')

    let game = gameElement.value

    if(game === 'X01'){
        window.location.href = 'X01/X01.html'
    } else if(game === 'Cricket'){
        window.location.href = 'cricket/cricket.html'
    }

}