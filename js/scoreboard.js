class scoreboard {
    constructor() {
        this.scoreboards = document.getElementsByClassName("scoreboard");
        this.buttonAddThrows = document.getElementsByClassName("scoreboard_Button");
        this.displayedNames = document.getElementsByClassName("scoreboard_Name");
        this.scoreSelect = document.getElementsByClassName("scoreboard_ScoreSelect")
        this.throwScoreboard = document.getElementsByClassName("throwScoreboard")
        this.buttonAbandon = document.getElementById("leaveButton");
    }

    setTheScoreboard() {
        this.displayTheScoreboardOfEachPlayer();
        // this.setAbandonButtonHandler();
    }

    createThePlayerInformation(numberOfPlayers) {
        for (let i = 0; i < numberOfPlayers; i++) {
            const input = document.getElementById("input_" + i).value;
            const arrayToReturn = [];
            const playerInformation = { name: input, throwHistory: [], frameHistory: [], indexOfTheFirstThrowOfTheCurrentFrame: 0 }
            arrayToReturn.push(playerInformation);
            return arrayToReturn;
        }
    }

    addScoreToTheScoreboard(playerNumero, score) {
        const IndexOfSlotToFill = this.defineTheIndexOfSlotToFill(playerNumero);
        const playerThrow = this.returnThePlayerThrow(playerNumero, score, IndexOfSlotToFill);
        // const frameScore = this.returnTheFrameScore(playerNumero);
        // const actualTotalScore = this.calculateActualTotalScore(playerNumero);

        // this.displayThePlayerThrow(playerNumero, IndexOfSlotToFill, playerThrow);
        // this.showFrameScore(playerNumero, frameScore);
        // this.showActualTotalScore(playerNumero, actualTotalScore);
    }

    defineTheIndexOfSlotToFill(playerNumero) {
        const box = this.throwScoreboard[playerNumero].getElementsByTagName("td");

        for (let i = 0; i < 21; i++) {
            if (box[i].innerHTML === "") {
                return i;
            }
        }
    }

    returnThePlayerThrow(playerNumero, score, IndexOfSlotToFill) {
        const throwHistory = this.playersInformations[playerNumero].throwHistory;

        if (IndexOfSlotToFill === 20) {
            if ((throwHistory[throwHistory.length - 1] + throwHistory[throwHistory.length - 2]) < 10) {
                // this.changeDisplayedErrorMessage("Vous avez atteint le nombre maximal de lancer");
                return
            }
        }

        if (IndexOfSlotToFill % 2 != 0) {
            const previousThrow = throwHistory[throwHistory.length - 1]

            if ((score + previousThrow) > 10 || previousThrow === "X" && IndexOfSlotToFill < 18) {
                // this.changeDisplayedErrorMessage("Vous ne pouvez pas faire tomber autant de quille !");
                return
            }

            if ((score + previousThrow) === 10) {
                // throwHistory.push(score);
                return "/"
            }
        }

        if (score === 10) {
            if (throwHistory[throwHistory.length - 1] === 0 && (IndexOfSlotToFill % 2) != 0) {
                throwHistory.push(10);
            } else {
                // throwHistory.push("X");
                if (IndexOfSlotToFill > 17) {
                    return "X"
                } else {
                    return "XX"
                }
            }
        }

        this.changeDisplayedErrorMessage("");
        throwHistory.push(score);
        return score;
    }

}