class Game {

    constructor(user) {
        this.user = user
        this.score = 0
        this.lives = 5
        this.lifeNodes = []
        console.log(this.lives)
    }

    incrementScore() {
        this.score += 1
        scoreLabelNode.innerText = `Score: ${this.score}`
    }

    hittedPredetor() {
        if (this.lives > 0) {
            this.lives -= 1
            this.lifeNodes.pop().remove()
        }
    }

    isGameOver() {
        console.log(this.lives)
        return this.lives === 0
    }

}