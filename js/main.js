const STATUS_DISPLAY = document.querySelector('.game-notification'),
  GAME_STATE = ["", "", "", "", "", "", "", "", ""],
  WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  WIN_MESSAGE = () => `El jugador ${currentPlayer} ha ganado!`,
  DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
  CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`
// =========================  ===================//
const sectionIngreso = document.querySelector("#section-ingreso")
const showGames = document.querySelector("#show_games")
const btnVsCPU=document.querySelector("#btnVsCPU")
const btnVsPlayer=document.querySelector("#btnVsPlayer")
const clearScore=document.querySelector("#clear-score")


const btnHeadg1=document.querySelector("#btn-headg1")
const btnHeadg2=document.querySelector("#btn-headg2")

btnVsCPU.addEventListener('click',ocultar)
btnVsPlayer.addEventListener('click',ocultar)
btnHeadg1.addEventListener('click',asignarX)
btnHeadg2.addEventListener('click',asignarO)
/*clearScore.addEventListener('click', limpiar)*/


// ocultar pantalla de ingreso //////
function ocultar(){
    sectionIngreso.classList.add("hidden");
    showGames.classList.remove("hidden")
}
// ==================== VARIABLES ==================== //

//==================== Asigna valor variable CurrentPlayer ================//
let gameActive = true,
  currentPlayer = "O"

  function asignarX()
    {currentPlayer="X"
      return currentPlayer
    }

  function asignarO(){
    currentPlayer="O"
    return currentPlayer}

// ==================== FUNCTIONS ==================== //

function main() {
  /*handleStatusDisplay(CURRENT_PLAYER_TURN())*/
  listeners()
}

function listeners() {
  document.querySelector('.game-container').addEventListener('click', handleCellClick)
 /* document.querySelector('.game-restart').addEventListener('click', handleRestartGame)*/
}

function limpiar(){
   document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "")
}


function handltartGame() {
  gameActive = true
  currentPlayer = "X"
  restartGameState()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "")
}

function handleCellClick(clickedCellEvent /** Type Event **/) {
  const clickedCell = clickedCellEvent.target
  if (clickedCell.classList.contains('box')) {
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
      return false
    }

    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
  }
}

function handleCellPlayed(clickedCell /** object HTML **/, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  clickedCell.innerHTML = currentPlayer // Agrega en el HTML el valor del jugador
}

function handleResultValidation() {
  let roundWon = false
  for (let i = 0; i < WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    const winCondition = WINNINGS[i] // Guarda la combinación por ejemplo: [0, 1, 2]
    let position1 = GAME_STATE[winCondition[0]],
      position2 = GAME_STATE[winCondition[1]],
      position3 = GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; // Si hay algún valor vacio nadie ha ganado aún
    }
    if (position1 === position2 && position2 === position3) {
      roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
      break
    }
  }

  if (roundWon) {
    handleStatusDisplay(WIN_MESSAGE())
    gameActive = false
    return
  }

  let roundDraw = !GAME_STATE.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
  if (roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE())
    gameActive = false
    return
  }

  handlePlayerChange()
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
 /* handleStatusDisplay(CURRENT_PLAYER_TURN())*/
}

function restartGameState() {
  let i = GAME_STATE.length
  while (i--) {
    GAME_STATE[i] = ''
  }
}

main()