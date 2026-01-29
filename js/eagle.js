class Eagle {

    static startingX = -6000 

    constructor(posY) {

        this.node = document.createElement("img")
        this.node.src = `./images/eagle.png`
        gameBoxNode.append(this.node)
        this.x = Eagle.startingX
        this.y = posY
        this.width = 130
        this.height = 130
        this.playedMusic = false

        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`


        this.movementSpeed = 10
    }

    automaticMove() {
        if (this.x > gameBoxNode.offsetWidth) {
            if (chickenObj.isCaughtByEagle) {
                gameOver()
            }
            this.resetEaglePosition()
        } else {
            const chick = fallingObjectsArray.find( (fallingObject) => fallingObject.isChick() )

            let newX = chick?.x || gameBoxNode.offsetWidth
            let newY = chick?.y || 0
            if (chickenObj.isCaughtByEagle) {
                newX = gameBoxNode.offsetWidth
                newY = 0
            }
            
            let newGravity = chick?.gravity || 1.8

            const distanceX = newX - this.x
            const timeToReach = distanceX / this.movementSpeed
            const targetY = newY + newGravity * timeToReach

            this.x += this.movementSpeed
            this.y += (targetY - this.y) * 0.03

            this.node.style.top = `${this.y}px`
            this.node.style.left = `${this.x}px`
        }
    }

    isVisible() {
        return this.x - this.width > 0
    }

    updateWhenHenIsCaught() {
        this.node.src = appObj.difficulty.getEagleImageWhenHenIsCaught()
        this.movementSpeed = 5
        this.node.style.transform = "scale(1.2)"
    }

    resetEaglePosition() {
        this.x = Eagle.startingX
        const eaglePositionY = Math.min(Math.floor(Math.random() * gameBoxNode.offsetHeight), gameBoxNode.offsetHeight - 130)
        this.y = eaglePositionY
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.playedMusic = false
        eagleBgm.pause()
        eagleBgm.currentTime = 0
    }

    destroyNode() {
        this.node.remove()
    }
    
}