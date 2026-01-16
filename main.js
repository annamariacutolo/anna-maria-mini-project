// displays player names from inputs, hide form after submit
const form = document.querySelector("form.input-players")
const formDiv = document.querySelector("div.player-form")
const scoreboard = document.querySelector("div.scoreboard")
const player1Input = document.getElementById("player1-input")
const player2Input = document.getElementById("player2-input")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const name1 = player1Input.value.trim()
    const name2 = player2Input.value.trim()
    player1.textContent = `${name1}`
    player2.textContent = `${name2}`

    formDiv.style.display = "none"
    scoreboard.style.display = "block"
})

// adds to board
function handleClick(id) {
    const addPiece = document.getElementById(`${id}`)
    addPiece.style.display = "block"
}

const square = document.querySelector("div.board > div");
square.addEventListener("click", handleClick);
