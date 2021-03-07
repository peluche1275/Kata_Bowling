class scoreCalculator {
    constructor() {}

    returnThePlayerThrow(itIsTheSecondThrow, previousThrow, throwHistory, score, IndexOfSlotToFill) {
        const pair = this.checkIfItIsAPair(itIsTheSecondThrow, score, previousThrow)
        const strike = this.checkIfItIsAStrike(score, throwHistory, IndexOfSlotToFill)

        if (pair) {
            score = "/"
        } else if (strike) {
            score = "X"
        }
        return score;
    }

    checkIfThePlayerCanPlay(IndexOfSlotToFill, throwHistory) {
        let playerCanDoTheNextThrow = true;
        if (IndexOfSlotToFill === 20) {
            if ((throwHistory[throwHistory.length - 1] + throwHistory[throwHistory.length - 2]) < 10) {
                playerCanDoTheNextThrow = false
            }
            return playerCanDoTheNextThrow
        }
    }

    checkIfItIsAStrike(score, throwHistory, IndexOfSlotToFill) {
        let itIsAStrike = false;

        if (score === 10) {
            if (throwHistory[throwHistory.length - 1] === 0 && (IndexOfSlotToFill % 2) != 0) {
                console.log("NO PROBLEM")
            } else {
                itIsAStrike = true;
            }
        }
        return itIsAStrike;
    }

    checkIfItIsAPair(itIsTheSecondThrow, score, previousThrow) {
        let itIsAPair = false
        if (itIsTheSecondThrow && (score + previousThrow) === 10) {
            itIsAPair = true
        }
        return itIsAPair
    }

    checkIfThePlayerCanEnterThisScore(score, previousThrow, IndexOfSlotToFill) {
        let validScore = true;
        if ((score + previousThrow) > 10 || previousThrow === "X" && IndexOfSlotToFill < 18) {
            validScore = false;
        }
        return validScore;
    }

    pushTheScoreInTheThrowHistory(throwHistory, score) {
        throwHistory.push(score);
    }

    checkIfItIsTheSecondThrow(IndexOfSlotToFill) {
        let itIsTheSecondThrow = false;
        if (IndexOfSlotToFill % 2 != 0) {
            itIsTheSecondThrow = true;
        }
        return itIsTheSecondThrow;
    }









    // -------------------------------------- //

    returnTheFrameScore(playerNumero) {
        const throwHistory = this.playersInformations[playerNumero].throwHistory;
        const indexOfTheFirstThrowOfTheCurrentFrame = this.playersInformations[playerNumero].indexOfTheFirstThrowOfTheCurrentFrame;
        const frameHistory = this.playersInformations[playerNumero].frameHistory;

        const firstThrow = throwHistory[indexOfTheFirstThrowOfTheCurrentFrame];
        const secondThrow = throwHistory[indexOfTheFirstThrowOfTheCurrentFrame + 1];
        const thirdThrow = throwHistory[indexOfTheFirstThrowOfTheCurrentFrame + 2];
        const currentFrame = firstThrow + secondThrow;

        if (firstThrow === "X") {
            if (secondThrow != null && thirdThrow != null) {
                let sumOfFrameScores = 0;
                for (let i = 0; i < 3; i++) {
                    if (throwHistory[indexOfTheFirstThrowOfTheCurrentFrame + i] === "X") {
                        sumOfFrameScores += 10
                    } else {
                        sumOfFrameScores += throwHistory[indexOfTheFirstThrowOfTheCurrentFrame + i]
                    }
                }
                frameHistory.push(sumOfFrameScores)
                this.playersInformations[playerNumero].indexOfTheFirstThrowOfTheCurrentFrame += 1;
                return frameHistory[frameHistory.length - 1]
            } else {
                return
            }
        } else if (firstThrow != null && secondThrow != null) {
            if (currentFrame === 10) {
                if (thirdThrow != null) {
                    if (thirdThrow === "X") {
                        frameHistory.push(20)
                    } else {
                        frameHistory.push((10 + thirdThrow))
                    }
                    this.playersInformations[playerNumero].indexOfTheFirstThrowOfTheCurrentFrame += 2;
                    return frameHistory[frameHistory.length - 1]
                } else {
                    return
                }
            }
            frameHistory.push(currentFrame)
            this.playersInformations[playerNumero].indexOfTheFirstThrowOfTheCurrentFrame += 2;
            return frameHistory[frameHistory.length - 1]
        }
    }

    calculateActualTotalScore(playerNumero) {
        const frameHistory = this.playersInformations[playerNumero].frameHistory;
        let totalScore = 0;

        for (let i = 0; i < frameHistory.length; i++) {
            totalScore += frameHistory[i]
        }
        return totalScore;
    }
}