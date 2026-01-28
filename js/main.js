//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

const highScoresNode = document.querySelector("#high-scores")

// life
const livesContainerNode = document.querySelector("#life-container")

// buttons
const startBtnNode = document.querySelector("#start-btn")
const restartBtnNode = document.querySelector("#restart")
const startNewBtnNode = document.querySelector("#start-new")

// name
const nameNode = document.querySelector("#name")

// score
const scoreLabelNode = document.querySelector("#score")
const finalScoreLabelNode = document.querySelector("#final-score")

// audio buttons
const playButton = document.querySelector("#music");
const startScreenMusicButton = document.querySelector("#start-screen-music");

// game box
const gameBoxNode = document.querySelector("#game-box")

//* GLOBAL GAME VARIABLES
const GameState = {
  start: "start",
  game: "game",
  over: "game_over"
}
let appObj = null
let chickenObj = null
let eagleObject = null
let fallingObjectsArray = []
let gameIntervalId = null
let fallingObjectsSpawnIntervalId = null
let eagleObjectSpawnIntervalId = null
const fallingObjectsImagesArray = [
    "raccoon", "fox", "puppy", "chick", "booster", "kitten", "puppy2", "kitten2", "chick", "raccoon",
     "fox", "puppy", "chick", "kitten", "puppy2", "kitten2"
]

const fullBgm = new Audio("audio/fullbgm.wav")
fullBgm.loop = true

const introBgm = new Audio("audio/introbgm.wav")
introBgm.loop = true

const gameOverBgm = new Audio("audio/gameOver.wav")



//* GLOBAL GAME FUNCTIONS

function startNew() {
    appObj = new App()
}

function validateAndStartGame() {
    const name = nameNode.value.trim()
    if (!name) {
        bounceInput()
        return
    }
    appObj.updateName(name)
    startGame()
}

function bounceInput() {
  nameNode.classList.remove('input-bounce'); // reset animation
  void nameNode.offsetWidth; // force reflow
  nameNode.classList.add('input-bounce');
  nameNode.focus();

  // Optional mobile vibration (very short)
  if (navigator.vibrate) {
    navigator.vibrate(60);
  }
}

function startGame() {

    chickenObj = new Chicken()
    appObj.changeState(GameState.game)
    setupLivesContainer()

    // start the game loop
    gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60)) // 60fps

    // start all other intervals that might be needed.
    fallingObjectsSpawnIntervalId = setInterval(fallingObjectsSpawn, 1500);

    //
    eagleObjectSpawnIntervalId = setInterval(eagleSpawn, 5000)

}

function setupLivesContainer() {
    for(let i = 0; i < chickenObj.lives; i++) {
        const lifeImageNode = document.createElement("li")
        lifeImageNode.innerHTML = `<img src="./images/chicken.png" width="40" height="40" alt="logo">`
        livesContainerNode.append(lifeImageNode)
        chickenObj.lifeNodes.push(lifeImageNode)
    }
}

function gameLoop() {

    fallingObjectsArray.forEach((fallingObj) => {
        fallingObj.automaticFalling()
    })
    fallingObjectsDespawnCheck()
    if (eagleObject !== null) {
        eagleObject.automaticMove()
        eagleDespawnCheck()
    }
    checkObjectCollisionWithFallingObjects()

}

function fallingObjectsSpawn() {

    const randomfallingObjectLeftTopPositionX = Math.min(Math.floor(Math.random() * gameBoxNode.offsetWidth), gameBoxNode.offsetWidth - 100)
    const fallingObjectImage = fallingObjectsImagesArray[Math.floor(Math.random() * fallingObjectsImagesArray.length)]
    const gravity = chickenObj.score > 10 ? chickenObj.score > 20 ? chickenObj.score > 30 ? 14.0 : 10.5 : 7.0 : 3.5
    let fallingObj = new FallingObject(randomfallingObjectLeftTopPositionX, fallingObjectImage, gravity)
    fallingObjectsArray.push(fallingObj)

}

function fallingObjectsDespawnCheck() {

    if  (fallingObjectsArray.length === 0) {
        return
    }
    if ((fallingObjectsArray[0].y + fallingObjectsArray[0].height) >= gameBoxNode.offsetHeight) {
        fallingObjectsArray[0].node.remove()
        fallingObjectsArray.shift()
    }

}

function eagleSpawn() {
    const eaglePositionY = Math.min(Math.floor(Math.random() * gameBoxNode.offsetHeight), gameBoxNode.offsetHeight - 130)
    eagleObject = new Eagle(eaglePositionY)
}

function eagleDespawnCheck() {
    if ((eagleObject.y + eagleObject.height) >= gameBoxNode.offsetHeight || (eagleObject.x + eagleObject.width) >= gameBoxNode.offsetWidth) {
        eagleObject.destroyNode()
        eagleObject = null
    }
}

function checkObjectCollisionWithFallingObjects() {
    fallingObjectsArray.forEach((fallingObj, index) => {
        let isCaughtByHen = checkObjectCollidingFallingObject(chickenObj, fallingObj)
        if (isCaughtByHen) {
            updateWhenChickenFallingObjectCollides(index, fallingObj, isCaughtByHen)
        }
        if (eagleObject !== null) {
            let isCollidingEagle = checkObjectCollidingFallingObject(eagleObject, fallingObj)
            if (isCollidingEagle) {
                updateWhenChickenFallingObjectCollides(index, fallingObj, false)
            }
        }
    })

}



function checkObjectCollidingFallingObject(object, fallingObject) {
    return (
        fallingObject.x < object.x + object.width &&
        fallingObject.x + fallingObject.width > object.x &&
        fallingObject.y < object.y + object.height &&
        fallingObject.y + fallingObject.height > object.y
    )

}

function updateWhenChickenFallingObjectCollides(index, fallingObject, isCaughtByHen) {
    removeFallingObject(index)
    if (fallingObject.isChick()) {
        if (isCaughtByHen) {
            incrementScore()
        } else {
        // chickenObj.updateLivesAndCheckGameOver()
        updateLivesAndCheckGameOver()
        }
    } else if (fallingObject.isBooster() && isCaughtByHen) {
        chickenObj.boost()
    } else {
        if (isCaughtByHen) {
            // chickenObj.updateLivesAndCheckGameOver()
            updateLivesAndCheckGameOver()
        } 
    }
}

function removeFallingObject(index) {

    fallingObjectsArray[index].node.remove()
    fallingObjectsArray.splice(index, 1)

}

function incrementScore() {
    chickenObj.incrementScore()
}

function updateLivesAndCheckGameOver() {
    chickenObj.updateLivesAndCheckGameOver()
}

function gameOver() {

    destroyCharacterNodes()
    clearInterval(gameIntervalId)
    clearInterval(fallingObjectsSpawnIntervalId)
    appObj.changeState(GameState.over)
    finalScoreLabelNode.innerText = getFinalScoreMessage(appObj.name, chickenObj.score)
    if (chickenObj.score > 0) {
        addPlayerScore(appObj.name, chickenObj.score)
    }

}

function destroyCharacterNodes() {
    chickenObj.destroyNode()
    fallingObjectsArray.forEach((fallingObject) => {
        fallingObject.destroyNode()
    })
    fallingObjectsArray = []
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", validateAndStartGame)
restartBtnNode.addEventListener("click", startGame)
startNewBtnNode.addEventListener("click", startNew)
document.addEventListener("DOMContentLoaded", () => {
  appObj = new App();
});
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
        chickenObj.move("up")
    } else if (event.code === "ArrowRight") {
        chickenObj.move("right")
    } else if (event.code === "ArrowDown") {
        chickenObj.move("down")
    } else if (event.code === "ArrowLeft") {
        chickenObj.move("left")
    }
})

playButton.addEventListener('click', () => {
    appObj.toggleSound()
})

startScreenMusicButton.addEventListener('click', () => {
    appObj.toggleSound()
})