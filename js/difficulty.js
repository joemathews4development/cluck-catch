/**
 * A class which handles the difficulty of the game.
 */
 class Difficulty {
    
    /**
     * Creates a difficulty with given level value.
     * @param {*} level the level of difficulty choosen by the user.
     */
    constructor(level) {
        this.level = level
    }

    /**
     *Gravity configuration based on player score.
     *
     * Each entry defines a gravity "tier":
     * - `min`: The minimum score (exclusive) required for this tier.
     * - `base`: The base gravity value applied when the score
     *           exceeds `min`, before difficulty multipliers.
     *
     * The first matching tier where `score > min` is used.
     */
    static gravityBasedOnScore = [
        { min: 30, base: 14.0 },
        { min: 20, base: 10.5 },
        { min: 10, base: 7.0 },
        { min: 0,  base: 3.5 }
    ]

    /**
     * Multipier value for each level of difficulty.
     */
    static levelMultipliers = {
        1: 1.0,
        2: 1.4,
        3: 2.0
    }

    static levelHenImage = {
        1: "./images/easy_hen.png",
        2: "./images/medium_hen.png",
        3: "./images/hard_hen.png"
    }

    static levelEagleImageWhenHenIsCaught = {
        1: "./images/eagle_easy_hen.png",
        2: "./images/eagle_medium_hen.png",
        3: "./images/eagle_hard_hen.png"
    }

    /**
     * Returns the gravity of the falling object based on the given score and choosen difficulty level.
     * 
     * @param {*} score the score at which the created faliing objects gravity is calculated.
     * @returns the gravity of the falling object based on the given score and choosen difficulty level.
     */
    getFallingObjectGravity(score) {
        const base = Difficulty.gravityBasedOnScore.find(gravity => score >= gravity.min).base
        return base * (Difficulty.levelMultipliers[this.level] ?? 1.0);
    }

    /**
     * 
     * @returns spawn interval for the falling objects based on the choosen difficulty level.
     */
    getFallingObjectsSpawnInterval() {
        return Math.ceil(1500/(Difficulty.levelMultipliers[this.level] ?? 1.0))
    }

    getImageName() {
        return Difficulty.levelHenImage[this.level] ?? "easy_hen"
    }

    getEagleImageWhenHenIsCaught() {
        return Difficulty.levelEagleImageWhenHenIsCaught[this.level] ?? "./images/eagle_easy_hen.png"
    }

}