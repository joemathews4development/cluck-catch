//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// life
const livesContainerNode = document.querySelector("#life-container")

// start button
const startBtnNode = document.querySelector("#start-btn")

// score
const scoreLabelNode = document.querySelector("#score")

// audio buttons
const playButton = document.querySelector("#music");
const startScreenMusicButton = document.querySelector("#start-screen-music");

// game box
const gameBoxNode = document.querySelector("#game-box")

//* GLOBAL GAME VARIABLES
let gameObj = null
let chickenObj = null
let fallingObjectsArray = []
let gameIntervalId = null
let fallingObjectsSpawnIntervalId = null
const fallingObjectsImagesArray = ["raccoon", "fox", "puppy", "chick", "kitten"]

const fullBgm = new Audio("audio/fullbgm.wav")
fullBgm.loop = true

const introBgm = new Audio("audio/introbgm.wav")
introBgm.loop = true

let playMusic = false

if(playMusic) {
    introBgm.play()
}


//* GLOBAL GAME FUNCTIONS
function startGame() {

    // 1. hide start screen & show the game screen
    startScreenNode.style.display = "none"
    gameScreenNode.style.display = "flex"
    introBgm.pause();
    fullBgm.currentTime = 0;
    if (playMusic) {
        fullBgm.play()
    }

    // 2. add the initial game elements
    gameObj = new Game("Hi")
    chickenObj = new Chicken()
    // console.log(birdObj)
    // obstacleObj = new Obstacle()

    setupLivesContainer()
    // 3. start the game loop
    gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60)) // 60fps

    // 4. start all other intervals that might be needed.
    fallingObjectsSpawnIntervalId = setInterval(fallingObjectsSpawn, 1500);

}

function setupLivesContainer() {
    for(let i = 0; i < gameObj.lives; i++) {
        const lifeImageNode = document.createElement("li")
        lifeImageNode.innerHTML = `<img src="./images/chicken.png" width="40" height="40" alt="logo">`
        livesContainerNode.append(lifeImageNode)
        gameObj.lifeNodes.push(lifeImageNode)
    }
    /*gameObj.lives.forEach((life) => {
        
    })*/
}

function gameLoop() {

    // // console.log("Game running at 60 fps")
    // // all automated movements and collision checks should happen here
    // birdObj.gravity()
    // // obstacleObj.automaticMovement()
    fallingObjectsArray.forEach((fallingObj) => {
        fallingObj.automaticFalling()
    })
    fallingObjectsDespawnCheck()
    collisionChickenFallingObjects()
    // collisionBirdObstacles()
    // collisionBirdFloor()

}

function fallingObjectsSpawn() {

    const randomfallingObjectLeftTopPositionX = Math.min(Math.floor(Math.random() * 1000), gameBoxNode.offsetWidth - 100)
    // let distanceBetweenObstacles = 310
    const fallingObjectImage = fallingObjectsImagesArray[Math.floor(Math.random() * fallingObjectsImagesArray.length)]
    const gravity = gameObj.score > 10 ? gameObj.score > 20 ? gameObj.score > 30 ? 5.5 : 4.8 : 3.2 : 1.8
    let fallingObj = new FallingObject(randomfallingObjectLeftTopPositionX, fallingObjectImage, gravity)
    fallingObjectsArray.push(fallingObj)

    /*let obstacleBottom = new Obstacle(randomObstacleTopPositionY + distanceBetweenObstacles, "bottom")
    obstacleArr.push(obstacleBottom)    */

}

function fallingObjectsDespawnCheck() {

    if  (fallingObjectsArray.length === 0) {
        return
    }
    if ((fallingObjectsArray[0].y + fallingObjectsArray[0].height) >= 800) {
        fallingObjectsArray[0].node.remove()
        fallingObjectsArray.shift()
    }

}

function collisionChickenFallingObjects() {
    fallingObjectsArray.forEach((fallingObj, index) => {
        let isCaught = checkChickenCatchingFallingObject(chickenObj, fallingObj)
        if (isCaught) {
            updateWhenChickenFallingObjectCollides(index, fallingObj)
        }
    })

}

function checkChickenCatchingFallingObject(chicken, fallingObject) {
    return (
        fallingObject.x < chicken.x + chicken.width &&
        fallingObject.x + fallingObject.width > chicken.x &&
        fallingObject.y < chicken.y + chicken.height &&
        fallingObject.y + fallingObject.height > chicken.y
    );
    /*return (
      (fallingObject.x + fallingObject.imagePaddingX) < (chicken.x + chicken.width - chicken.imagePaddingX) &&
      (fallingObject.x + fallingObject.width - fallingObject.imagePaddingX) > (chicken.x + chicken.imagePaddingX) &&
      (fallingObject.y + fallingObject.imagePaddingY) < (chicken.y + chicken.height - chicken.imagePaddingY) &&
      (fallingObject.y + fallingObject.height - fallingObject.imagePaddingY) > (chicken.y + chicken.imagePaddingY)
    );*/

}

function updateWhenChickenFallingObjectCollides(index, fallingObject) {
    removeFallingObject(index)
    if (fallingObject.isChick()) {
        incrementScore()
    } else {
        gameObj.hittedPredetor()
        if (gameObj.isGameOver()) {
            gameOver()
        }
    }
}

function removeFallingObject(index) {

    fallingObjectsArray[index].node.remove()
    fallingObjectsArray.splice(index, 1)

}

function incrementScore() {
    gameObj.incrementScore()
}

function gameOver() {

    fullBgm.pause();
    fullBgm.currentTime = 0;
    clearInterval(gameIntervalId)
    clearInterval(fallingObjectsSpawnIntervalId)

    gameScreenNode.style.display = "none"
    gameOverScreenNode.style.display = "flex"

}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame)
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
 if (playMusic) {
    fullBgm.play();
  } else {
    fullBgm.pause();
    fullBgm.currentTime = 0;
  }
  playMusic = !playMusic
})

startScreenMusicButton.addEventListener('click', () => {
 if (playMusic) {
    introBgm.play();
  } else {
    introBgm.pause();
    introBgm.currentTime = 0;
  }
  playMusic = !playMusic
})