class Chicken {

    /**
     * ! Always create new after calling the destroy method on the existing object.
     */
    constructor() {

        this.node = document.createElement("img")
        this.node.src = "./images/chicken.png"
        
        gameBoxNode.append(this.node)

        this.x = 250
        this.y = 0
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
        this.boostPowerActivated = false
        this.#updateScore()
    }


    /*move(direction) {
        if (direction === "up") {
            if (this.y - this.moveSpeed > 0) {
                this.y -= this.moveSpeed
            } else {
                this.y = 0
            }
            this.node.style.top = `${this.y}px`
        } else if (direction === "right") {
            if ((this.x + this.width + this.moveSpeed) >= gameBoxNode.offsetWidth) {
                this.x = gameBoxNode.offsetWidth - this.width
            } else {
                this.x += this.moveSpeed
            }            
            this.node.style.left = `${this.x}px`
        } else if (direction === "down") {
            if ((this.y + this.height + this.moveSpeed) >= gameBoxNode.offsetHeight) {
                this.y = gameBoxNode.offsetHeight - this.height
            } else {
                this.y += this.moveSpeed
            }
            this.node.style.top = `${this.y}px`
        } else if (direction === "left") {
            if (this.x - this.moveSpeed > 0) {
                this.x -= this.moveSpeed
            } else {
                this.x = 0
            }
            this.node.style.left = `${this.x}px`
        }
    }*/

    move() {
        let dx = 0;
        let dy = 0;

        if (keys.ArrowUp) dy -= 1;
        if (keys.ArrowDown) dy += 1;
        if (keys.ArrowLeft) dx -= 1;
        if (keys.ArrowRight) dx += 1;

        // No movement
        if (dx === 0 && dy === 0) return;

        // Normalize diagonal movement
        const length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;

        //const speed = 30;
        
        const newX = this.x + dx * this.moveSpeed
        const newY = this.y + dy * this.moveSpeed
        this.x = Math.max(0, Math.min(gameBoxNode.offsetWidth - this.width, newX))
        this.y = Math.max(0, Math.min(gameBoxNode.offsetHeight - this.height, newY))
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
    }

    boost() {
        this.boostPowerActivated = true
        this.node.classList.add("shine")
        this.moveSpeed *= 4
        fullBgm.playbackRate = 1.3
        setTimeout(() => {
            this.boostPowerActivated = false
            this.node.classList.remove("shine")
            this.moveSpeed /= 4
            fullBgm.playbackRate = 1.0
        }, 8000);
    }

    incrementScore() {
        this.score += 1
        this.#updateScore()
    }

    updateLivesAndCheckGameOver() {
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