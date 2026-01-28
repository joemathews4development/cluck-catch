class Eagle {

    constructor(posY) {

        this.node = document.createElement("img")
        this.node.src = `./images/eagle.png`
        gameBoxNode.append(this.node)
        this.x = 0
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
        const chick = fallingObjectsArray[fallingObjectsArray.length - 1]//fallingObjectsArray.find( (fallingObject) => fallingObject.isChick() )
        if (chick !== undefined) {
            const distanceX = chick.x - this.x
            const timeToReach = distanceX / this.movementSpeed

            const targetY = chick.y + chick.gravity * timeToReach

            this.x += this.movementSpeed;
            this.y += (targetY - this.y) * 0.03;
            this.node.style.top = `${this.y}px`
            this.node.style.left = `${this.x}px`
        } else {
            console.log("undefined chick")
        }
    }

    destroyNode() {
        this.node.remove()
    }
    
}