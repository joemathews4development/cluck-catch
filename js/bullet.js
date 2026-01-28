class Bullet {

    constructor(posX, posY) {
        this.x = -1000
        this.y = 0
        this.speed = 13;
        this.shouldUpdatePosition = false

        this.node = document.createElement('img');
        this.node.src = `./images/bullet.png`

        gameBoxNode.appendChild(this.node);

        this.width = 50
        this.height = 60

        this.node.style.position = "absolute"
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`

        this.updatePosition();
    }

    update(eagleObject) {

        // Direction vector (target - bullet)
        const dx = (eagleObject.x > 0 ? eagleObject.x : gameBoxNode.offsetWidth) - this.x
        const dy = (eagleObject.x > 0 ? eagleObject.y : gameBoxNode.offsetHeight / 2) - this.y
        /*const dx = eagleObject.x - this.x
        const dy = eagleObject.y - this.x*/

        const distance = Math.sqrt(dx * dx + dy * dy);

        // Prevent divide by zero
        /*if (distance < 5) {
            this.hitTarget();
            return;
        }*/

        // Normalize direction
        const nx = dx / distance;
        const ny = dy / distance;

        // Move toward eagle
        this.x += nx * this.speed;
        this.y += ny * this.speed;

        this.updatePosition()
        if (this.x > gameBoxNode.offsetWidth) {
            this.moveOutOfScreen()
        }

    }

    updatePosition() {
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
    }

    hitTarget() {
        this.destroy();
        this.target.destroy(); // kill eagle
    }

    destroyNode() {
        this.node.remove()
    }

    startFollowingEagle(posX, posY) {
        this.x = posX
        this.y = posY
        this.updatePosition()
        this.shouldUpdatePosition = true
    }

    moveOutOfScreen() {
        this.x = -1000
        this.y = 0
        this.updatePosition()
        this.shouldUpdatePosition = false
    }

}