const form = document.querySelector("form.input-players")
const formDiv = document.querySelector("div.player-form")
const scoreboard = document.querySelector("div.scoreboard")
const player1Input = document.getElementById("player1-input")
const player2Input = document.getElementById("player2-input")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const squares = document.querySelectorAll(".board div")
const pos = document.querySelectorAll(".board div p")

// players
let players = {
  "player1Info": {
    "player1Name": player1Input.value.trim(),
    "player1Piece": "O",
    "player1Score": 0
  },
  "player2Info": {
    "player2Name": player2Input.value.trim(),
    "player2Piece": "X",
    "player2Score": 0
  }
}

// displays player names from inputs, hide form after submit
form.addEventListener("submit", (event) => {
    event.preventDefault()
    player1.textContent = `${players.player1Info.player1Name}`
    player2.textContent = `${players.player2Info.player2Name}`

    formDiv.style.display = "none"
    scoreboard.style.display = "block"
})

// turns
let turn = 0
let piece = ""

// adds piece to board
for (let i=0; i<squares.length; i++) {
  squares[i].addEventListener("click", () => {
    turn += 1
    console.log(`${turn}`)

    // chooses which piece to use
    if (turn%2 !== 0) {
      piece = players.player1Info.player1Piece
    } else {
      piece = players.player2Info.player2Piece
    }

    console.log(`${piece}`)
    pos[i].textContent = piece
  })
}


