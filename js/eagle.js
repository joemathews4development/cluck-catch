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

        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`


        this.movementSpeed = 10
    }

    automaticMove() {
        if (this.x + this.width < 10) {
            this.x += this.movementSpeed
            this.node.style.left = `${this.x}px`
        }
        if (this.x > gameBoxNode.offsetWidth) {
            this.x = Eagle.startingX
            this.node.style.left = `${this.x}px`
        } else {
            const chick = fallingObjectsArray.find( (fallingObject) => fallingObject.isChick() )
            let newX = chick?.x || gameBoxNode.offsetWidth
            let newY = chick?.y || 0
            let newGravity = chick?.gravity || 1.8
            const distanceX = newX - this.x
            const timeToReach = distanceX / this.movementSpeed
            const targetY = newY + newGravity * timeToReach

            this.x += this.movementSpeed;
            this.y += (targetY - this.y) * 0.03;
            this.node.style.top = `${this.y}px`
            this.node.style.left = `${this.x}px`
        }
    }
    
}