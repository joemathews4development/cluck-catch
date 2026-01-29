class Chicken {

    /**
     * ! Create new only after calling the destroy method on the existing object.
     */
    constructor() {

        this.node = document.createElement("img")
        this.node.src = appObj.difficulty.getImageName()
        
        gameBoxNode.append(this.node)

        this.x = 250
        this.y = 600
        this.width = 130
        this.height = 130

        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`

        this.moveSpeed = 5
        this.score = 0
        this.lives = 5
        this.lifeNodes = []
        this.isCaughtByEagle = false
        this.boostPowerActivated = false
        this.#updateScore()
    }

    move() {
        let dx = 0
        let dy = 0

        if (keys.ArrowUp) dy -= 1
        if (keys.ArrowDown) dy += 1
        if (keys.ArrowLeft) dx -= 1
        if (keys.ArrowRight) dx += 1

        // No movement
        if (dx === 0 && dy === 0) {
            return
        }

        // Normalize diagonal movement
        const length = Math.sqrt(dx * dx + dy * dy)
        dx /= length
        dy /= length
        
        const newX = this.x + dx * this.moveSpeed
        const newY = this.y + dy * this.moveSpeed
        this.x = Math.max(0, Math.min(gameBoxNode.offsetWidth - this.width, newX))
        this.y = Math.max(0, Math.min(gameBoxNode.offsetHeight - this.height, newY))
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
    }

    boost() {
        if (!this.boostPowerActivated) {
            this.boostPowerActivated = true
            this.node.classList.add("shine")
            this.moveSpeed *= 4
            henBgm.playbackRate = 1.3
            setTimeout(() => {
                this.boostPowerActivated = false
                this.node.classList.remove("shine")
                this.moveSpeed /= 4
                henBgm.playbackRate = 1.0
            }, 8000);
        }
    }

    incrementScore() {
        this.score += 1
        this.#updateScore()
    }

    caughtByEagle() {
        this.isCaughtByEagle = true
        this.lives = 0
        this.lifeNodes.forEach((node) => node.remove())
        this.destroyNode()
        henBgm.playbackRate = 1.7
        henBgm.volume = 0.7
    }

    updateLivesAndCheckGameOver() {
        if (this.isCaughtByEagle) {
            return
        }
        this.updateLives()
        if (this.isGameOver()) {
            gameOver()
        }
    }

    #updateScore() {
        scoreLabelNode.innerText = `Score: ${this.score}`
    }

    updateLives() {
        if (this.lives > 0 && !this.boostPowerActivated) {
            this.lives -= 1
            this.lifeNodes.pop().remove()
        }
    }

    isGameOver() {
        return this.lives === 0
    }

    destroyNode() {
        this.node.remove()
    }
    
}