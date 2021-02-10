const application = document.getElementById("app");
const form = document.getElementById("mainForm");
let playersName = [];

function run() {
    const buttonStart = document.getElementById("startGame");

    buttonStart.addEventListener("click", (event) => {
        requestNumbersOfPlayers();
        event.preventDefault();
        buttonStart.style.display = "none";
    });
}

function requestNumbersOfPlayers() {

    let label, select, option, submitButton;

    label = document.createElement("label");
    label.innerHTML = "Définissez le nombre de joueur.";

    select = document.createElement("select");

    for (let i = 1; i < 5; i++) {
        option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i;
        select.appendChild(option);
    }

    submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";
    submitButton.addEventListener("click", (event) => {
        enterThePlayersNames(select.value);
        event.preventDefault();
    });

    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(submitButton);

}

function enterThePlayersNames(numberOfPlayers) {

    let input, label, submitButton;

    form.innerHTML = '';

    for (let i = 0; i < numberOfPlayers; i++) {

        label = document.createElement("label");
        label.innerHTML = 'Joueur n° ' + (i + 1);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("minlength", 4);
        input.setAttribute("maxlength", 20);
        input.setAttribute("name", i);

        form.appendChild(label);
        form.appendChild(input);
    }

    submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";
    submitButton.addEventListener("click", (event) => {

        if (checkInputs()) {
            savePlayersName();
            showPlayersName();
            leaveTheGame();
        } else {
            showError();
        }

        event.preventDefault();
    })

    form.appendChild(submitButton);
}

function checkInputs() {

    let input, passTheTest;
    let arrayOfInput = form.getElementsByTagName("input");

    for (let i = 0; i < arrayOfInput.length; i++) {

        input = arrayOfInput[i].value;

        passTheTest = input.match(/^[a-zA-Z]\w{3,20}$/g) // The string must be between 4 and 20 characters long. It accepts letters and numbers. No spaces or special characters.

        if (!passTheTest) {
            return false;
        }

    }

    return true;

}

function savePlayersName() {
    let arrayOfInput = form.getElementsByTagName("input");

    for (let i = 0; i < arrayOfInput.length; i++) {
        playersName.push(arrayOfInput[i].value);
    }
}

function showPlayersName() {

    let displayOfAPlayerName

    application.innerHTML = '';

    for (let i = 0; i < playersName.length; i++) {

        displayOfAPlayerName = document.createElement('p');
        displayOfAPlayerName.innerHTML = playersName[i];

        application.appendChild(displayOfAPlayerName);
    }

}

function leaveTheGame() {

    let buttonLeave;

    buttonLeave = document.createElement("button");
    buttonLeave.innerHTML = 'Quitter';
    buttonLeave.addEventListener("click", (event) => {
        document.location.reload();
        event.preventDefault();
    });
    application.appendChild(buttonLeave);
}

function showError() {
    const errorMessage = document.getElementById("errorMessage");
    
    errorMessage.innerHTML = "Il y a un problème avec un pseudo";
    errorMessage.style.display = "block";
}

// App Launch

run();
