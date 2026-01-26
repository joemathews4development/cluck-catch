class Game {

    constructor(user) {
        this.user = user
        this.score = 0
    }

    incrementScore() {
        this.score += 1
        scoreLabelNode.innerText = `Score: ${this.score}`
    }

}