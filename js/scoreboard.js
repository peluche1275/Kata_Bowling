class scoreboard {
    constructor() {
        this.scoreboards = document.getElementsByClassName("scoreboard");
        this.buttonAddThrows = document.getElementsByClassName("scoreboard_Button");
        this.displayedNames = document.getElementsByClassName("scoreboard_Name");
        this.scoreSelect = document.getElementsByClassName("scoreboard_ScoreSelect")
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
        const frameScore = this.returnTheFrameScore(playerNumero);
        const actualTotalScore = this.calculateActualTotalScore(playerNumero);

        this.displayThePlayerThrow(playerNumero, IndexOfSlotToFill, playerThrow);
        this.showFrameScore(playerNumero, frameScore);
        this.showActualTotalScore(playerNumero, actualTotalScore);
    }

    setAbandonButtonHandler() {
        this.buttonAbandon.style.display = "block";
        this.buttonAbandon.addEventListener("click", (event) => {
            document.location.reload();
            event.preventDefault();
        });
    }
}