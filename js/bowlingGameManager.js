class bowlingGameManager {
    constructor() {
        this.scoreCalculator = new scoreCalculator()
        this.scoreboard = new scoreboard()
        this.nameRegister = new nameRegister()
        this.formRequest = new formRequest()
        this.messageDisplayer = new messageDisplayer()
        this.numberOfPlayers = 0
        this.playersInformations = []
    }

    setStartButtonHandler() {
        this.formRequest.buttonStart.addEventListener("click", (event) => {
            this.requestTheNumbersOfPlayers()
            this.formRequest.buttonStart.style.display = "none"
            event.preventDefault()
        })
    }

    requestTheNumbersOfPlayers() {
        this.formRequest.form.style.display = "flex"
        this.formRequest.submitButton.addEventListener("click", (event) => {
            this.numberOfPlayers = this.formRequest.select.value
            this.formRequest.form.style.display = "none"
            this.nameRegister.displayNameFields(this.numberOfPlayers)
            this.setSubmitButtonHandler()
            event.preventDefault()
        })
    }

    setSubmitButtonHandler() {
        this.nameRegister.submitButton.addEventListener("click", (event) => {
            if (this.nameRegister.checkIfThePlayersNamesAreValid(this.numberOfPlayers) === false) {
                this.messageDisplayer.errorMessage.innerHTML = "Il y a un problème avec un pseudo!"
            } else {
                this.playersInformations = this.scoreboard.createThePlayerInformation(this.numberOfPlayers)
                this.displayTheScoreboardOfEachPlayer()
                this.messageDisplayer.errorMessage.innerHTML = ""
                this.nameRegister.form.style.display = "none"
            }
            event.preventDefault()
        })
    }

    displayTheScoreboardOfEachPlayer() {
        for (let playerNumero = 0; playerNumero < this.numberOfPlayers; playerNumero++) {
            this.scoreboard.displayedNames[playerNumero].innerHTML = this.playersInformations[playerNumero].name
            this.scoreboard.scoreboards[playerNumero].style.display = "block"

            this.setAbandonButtonHandler()
            this.setTheButtonAddThrow(playerNumero)
        }
    }

    setTheButtonAddThrow(playerNumero) {
        this.scoreboard.buttonAddThrows[playerNumero].addEventListener("click", (event) => {
            const throwInformation = this.scoreboard.defineAThrowInformation(this.playersInformations[playerNumero].throwHistory, playerNumero)
            const frameInformation = this.scoreboard.defineAframeInformation(throwInformation, this.playersInformations[playerNumero])
            const checkCondition = this.scoreCalculator.checkCondition(throwInformation)
            const playerCantPlay = this.scoreCalculator.determinateIfPlayerCantDoTheThrow(checkCondition)

            if (playerCantPlay != null) {
                this.messageDisplayer.errorMessage.innerHTML = playerCantPlay
            } else {
                const playerThrow = this.manageThePlayerThrow(checkCondition, throwInformation)
                const frameThrow = this.manageTheFrameThrow(frameInformation, playerNumero)
                const totalScore = this.manageTheTotalScore(throwInformation)

                this.scoreboard.updateTheScoreboardOnTheScreen(throwInformation, playerThrow, frameThrow, frameInformation.frameHistory, totalScore)
                this.tryToFinishTheGame(throwInformation)
            }
            event.preventDefault()
        })
    }

    manageTheFrameThrow(frameInformation, playerNumero) {
        const frameThrow = this.scoreCalculator.returnTheFrameScore(frameInformation.indexOfTheFirstThrowOfTheCurrentFrame, this.playersInformations[playerNumero])
        this.scoreCalculator.pushTheScoreInTheFrameHistory(frameInformation.frameHistory, frameThrow)
        return frameThrow
    }

    manageThePlayerThrow(checkCondition, throwInformation) {
        const playerThrow = this.scoreCalculator.returnThePlayerThrow(checkCondition, throwInformation)
        this.scoreCalculator.pushTheScoreInTheThrowHistory(throwInformation.throwHistory, playerThrow)
        return playerThrow
    }

    manageTheTotalScore(throwInformation) {
        const totalScore = this.scoreCalculator.calculateActualTotalScore(this.playersInformations[throwInformation.playerNumero])
        this.playersInformations[throwInformation.playerNumero].totalScore = totalScore
        return totalScore
    }

    tryToFinishTheGame(throwInformation) {
        const indexOfCurrentSlot = throwInformation.IndexOfSlotToFill
        this.checkIfPlayerFinish(indexOfCurrentSlot, throwInformation)
        this.checkIfAllPlayersFinish()
    }

    setAbandonButtonHandler() {
        this.scoreboard.buttonAbandon.style.display = "block"
        this.scoreboard.buttonAbandon.addEventListener("click", (event) => {
            document.location.reload()
            event.preventDefault()
        })
    }

    checkIfPlayerFinish(IndexOfCurrentSlot, throwInformation) {
        const lastSlotAfterNormalThrow = IndexOfCurrentSlot == 19 && (throwInformation.throwHistory[throwInformation.throwHistory.length - 1] + throwInformation.throwHistory[throwInformation.throwHistory.length - 2]) < 10
        const lastSlotAfterStrikeOrPair = IndexOfCurrentSlot == 20

        if (lastSlotAfterNormalThrow || lastSlotAfterStrikeOrPair) {
            this.scoreboard.buttonAddThrows[throwInformation.playerNumero].disabled = true
            this.playersInformations[throwInformation.playerNumero].endOfTheGame = true
        }
    }

    checkIfAllPlayersFinish() {
        let allPlayersFinished = true
        this.playersInformations.forEach(playerInformation => {
            if (playerInformation.endOfTheGame == false) {
                allPlayersFinished = false
            }
        })
        if (allPlayersFinished) {
            this.showTheWinner()
        }
    }

    showTheWinner() {
        let betterScore = 0
        let winners = []
        this.playersInformations.forEach(player => {
            if (player.totalScore > betterScore) {
                betterScore = player.totalScore
            }
        })
        this.playersInformations.forEach(player => {
            if (player.totalScore == betterScore) {
                winners.push(player.name)
            }
        })
        if (winners.length == 1) {
            this.messageDisplayer.winMessage.innerHTML = "Bravo le gagnant est : " + winners[0]
        } else {
            this.messageDisplayer.winMessage.innerHTML = "Bravo les gagnants sont : " + winners.toString()
        }
    }
}