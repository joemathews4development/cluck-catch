class FallingObject {

    constructor(posX, imageName, gravity) {

        this.posX =  posX
        this.imageName = imageName
        this.gravity = gravity
        
        this.node = document.createElement("img")
        this.node.src = `./images/${imageName}.png`

        gameBoxNode.append(this.node)

        this.x = posX
        this.y = 0
        this.width = 50
        this.height = 60

        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`

        this.checkAndActivateBoost()
    }

    automaticFalling() {
        this.y += this.gravity 
        this.node.style.top = `${this.y}px`
    }

    checkAndActivateBoost() {
        if (this.isBooster()) {
            this.node.classList.add("shine")
            this.gravity *= 2
        }
    }

    isChick() {
        return this.imageName === "chick"
    }

    isBooster() {
        return this.imageName === "booster"
    }

    destroyNode() {
        this.node.remove()
    }

}