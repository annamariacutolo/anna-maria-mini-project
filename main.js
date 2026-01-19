const form = document.querySelector("form.input-players")
const formDiv = document.querySelector("div.player-form")
const scoreboard = document.querySelector("div.scoreboard")
const inputError = document.querySelector("div.input-error")
const player1Input = document.getElementById("player1-input")
const player2Input = document.getElementById("player2-input")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const score1 = document.getElementById("player1-score")
const score2 = document.getElementById("player2-score")
const board = document.querySelector(".board")
const squares = document.querySelectorAll(".board div")
const message = document.querySelector(".scoreboard h3")

// turns
let turn = 0
let player = 1
let winner = false

// win conditions
let wins = [
  [1, 2, 3], 
  [4, 5, 6], 
  [7, 8, 9], 
  [1, 4, 7], 
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

// players
let players = {
  "player1Info": {
    "playerName": "",
    "playerArray": [],
    "playerScore": 0
  },
  "player2Info": {
    "playerName": "",
    "playerArray": [],
    "playerScore": 0
  }
}

// reset board
const reset = () => {
  players.player1Info.playerArray = []
  players.player2Info.playerArray = []
  if (player === 1) {
    message.textContent = `Let battle commence! ${players.player1Info.playerName} you're up.`
  } else if (player === 2) {
    message.textContent = `Let battle commence! ${players.player2Info.playerName} you're up.`
  }

  for (let i=0; i<squares.length; i++) {
    squares[i].innerHTML = ""
  }

  turn = 0
  winner = false
}

// check for player names before game begins
board.addEventListener("click", () => {
  if (players.player1Info.playerName.length === 0 || players.player2Info.playerName.length === 0) {
    inputError.style.display = "block"
    formDiv.style.paddingTop = "0px"
  }
})

// displays player names from inputs, hide form after submit
form.addEventListener("submit", (event) => {
  event.preventDefault()

  if (player1Input.value.trim().length === 0 || player2Input.value.trim().length === 0) {
    inputError.style.display = "block"
  } else {
    players.player1Info.playerName = player1Input.value.trim()
    players.player2Info.playerName = player2Input.value.trim()

    player1.textContent = `${players.player1Info.playerName}`
    player2.textContent = `${players.player2Info.playerName}`

    inputError.style.display = "none"
    formDiv.style.display = "none"
    scoreboard.style.display = "block"
    game()
  }
})

// game function
let game = () => {
  // adds piece to board
  for (let i=0; i<squares.length; i++) {
    if (player === 1) {
      message.textContent = `Let battle commence! ${players.player1Info.playerName} you're up.`
    } else if (player === 2) {
      message.textContent = `Let battle commence! ${players.player2Info.playerName} you're up.`
    }
    squares[i].addEventListener("click", (event) => {
      if (squares[i].textContent == "") {
        turn += 1
        console.log(turn)

        // chooses which piece to use
        if (player === 1) {
          squares[i].innerHTML = "<img src='images/volbeat.png' style='width: 100%; height: auto;'/>"
          players.player1Info.playerArray.push(parseInt(event.target.id))
          console.log(`player 1: ${players.player1Info.playerArray}`)
          if (turn < 5) {
            player = 2
            message.textContent = `${players.player2Info.playerName} you're up.`
          }
        } else if (player === 2) {
          squares[i].innerHTML = "<img src='images/illumise.png' style='width: 100%; height: auto;'/>"
          players.player2Info.playerArray.push(parseInt(event.target.id))
          console.log(`player 2: ${players.player2Info.playerArray}`)
          if (turn < 5) {
            player = 1
            message.textContent = `${players.player1Info.playerName} you're up.`
          }
        }
          
        // check for win and update score
        if (turn >= 5) {
          if (player === 1) {
            for (let win of wins) {
              let intersection = win.filter(element => players.player1Info.playerArray.includes(element))
              if (intersection.length === 3) {
                winner = true
                player = 1
                message.textContent = `${players.player1Info.playerName} wins!`
                players.player1Info.playerScore += 1
                score1.textContent = `${players.player1Info.playerScore}`
                setTimeout(reset, 5000)
                console.log("winner 1")
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                })
                break
              } else {
                player = 2
                message.textContent = `${players.player2Info.playerName} you're up.`
              }
            }
          } else if (player === 2) {
            for (let win of wins) {
              let intersection = win.filter(element => players.player2Info.playerArray.includes(element))
              if (intersection.length === 3) {
                winner = true
                player = 2
                message.textContent = `${players.player2Info.playerName} wins!`
                players.player2Info.playerScore += 1
                score2.textContent = `${players.player2Info.playerScore}`
                setTimeout(reset, 5000)
                console.log("winner 2")
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                })
                break
              } else {
                player = 1
                message.textContent = `${players.player1Info.playerName} you're up.`
              }
            }
          }
          // declare draw after 9 turns
          if (turn === 9 && winner === false) {
            message.textContent = "It's a draw."
            setTimeout(reset, 5000)
            console.log("draw")
            return
          }
        }
      }
    })
  } 
}

