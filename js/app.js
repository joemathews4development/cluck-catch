class App {

    constructor() {
        this.state = GameState.start
        this.name = ""
        this.hasSound = true
        this.changeState(GameState.start)
        this.#setupHighScores()
    }

    #setupHighScores() {
        const highScores = getScores()
        if (highScores.length === 0) {
            const noHighScoreNode = document.createElement("p")
            noHighScoreNode.classList.add("text-content")
            noHighScoreNode.innerText = "There are no saved scores yet!"
            highScoresNode.append(noHighScoreNode)
        } else {
            highScores.forEach((highScore) => {
                const highScoreNode = document.createElement("li")
                highScoreNode.classList.add("text-content")
                highScoreNode.innerText = `${highScore.name}: ${highScore.score}`
                highScoresNode.append(highScoreNode)
            })
        }
    }

    updateName(newName) {
        this.name = newName
        nameNode.value = this.name
    }

    changeState(newState) {
        this.state = newState
        this.#changeScreen()
        this.#changeMusic()
    }

    toggleSound() {
        this.hasSound = !this.hasSound
        playButton.src = this.#getSoundImage()
        startScreenMusicButton.src = this.#getSoundImage()
        this.#changeMusic()
    }

    #changeScreen() {
        if (this.state === GameState.start) {
            startScreenNode.style.display = "flex"
            gameScreenNode.style.display = "none"
            gameOverScreenNode.style.display = "none"
            playButton.src = this.#getSoundImage()  
        } else if (this.state === GameState.game) {
            startScreenNode.style.display = "none"
            gameScreenNode.style.display = "flex"
            gameOverScreenNode.style.display = "none"
        } else {
            startScreenNode.style.display = "none"
            gameScreenNode.style.display = "none"
            gameOverScreenNode.style.display = "flex"
        }
    }

    #changeMusic() {
        if (this.hasSound) {
            if (this.state === GameState.start) {
                introBgm.play()
                fullBgm.pause()
                fullBgm.currentTime = 0
                gameOverBgm.pause()
                gameOverBgm.currentTime = 0
            } else if (this.state === GameState.game) {
                fullBgm.play()
                introBgm.pause()
                introBgm.currentTime = 0
                gameOverBgm.pause()
                gameOverBgm.currentTime = 0
            } else {
                gameOverBgm.play()
                introBgm.pause()
                introBgm.currentTime = 0
                fullBgm.pause()
                fullBgm.currentTime = 0
            }
        } else {
            introBgm.pause()
            introBgm.currentTime = 0
            fullBgm.pause()
            fullBgm.currentTime = 0
            gameOverBgm.pause()
            gameOverBgm.currentTime = 0
        }
    }

    #getSoundImage() {
        return this.hasSound ? "./images/sound_on.png" : "./images/sound_off.png"
    }

}