class Chicken {

    constructor() {

        this.node = document.createElement("img")
        this.node.src = "./images/chicken.png"

        gameBoxNode.append(this.node)

        this.x = 250
        this.y = 600
        this.width = 130
        this.height = 130
        this.imagePaddingX = this.width / 5
        this.imagePaddingY = this.height / 3.75

        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`

        this.moveSpeed = 30
    }


    move(direction) {
        if (direction === "up" && this.y > 0) {
            this.y -= this.moveSpeed
            this.node.style.top = `${this.y}px`
        } else if (direction === "right" && (this.x + this.width) <= 1000) {
            this.x += this.moveSpeed
            this.node.style.left = `${this.x}px`
        } else if (direction === "down" && (this.y + this.height) <= 800) {
            this.y += this.moveSpeed
            this.node.style.top = `${this.y}px`
        } else if (direction === "left" && this.x > 0) {
            this.x -= this.moveSpeed
            this.node.style.left = `${this.x}px`
        }
    }
    
}