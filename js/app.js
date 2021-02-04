const application = document.getElementById("app");

function run() {

    let buttonStart;

    buttonStart = document.createElement("button");
    buttonStart.innerHTML = "Nouvelle Partie";
    buttonStart.addEventListener("click", () => { requestNumbersOfPlayers() });

    application.appendChild(buttonStart);

}

function requestNumbersOfPlayers() {

    let form, select, submitButton;

    form = createForm();
    select = form.children[1];
    submitButton = form.children[2];

    submitButton.addEventListener("click", (event) => {
        enterThePlayersNames(select.value);
        event.preventDefault();
    });

    application.innerHTML = "";
    application.appendChild(form);

}

function createForm() {

    let form, label, select, option, submitButton;

    form = document.createElement("form");
    form.setAttribute("id", "formulary");

    label = document.createElement("label");
    label.innerHTML = "Définissez le nombre de joueur.";

    select = document.createElement("select");
    select.setAttribute("id", "selectChoice");

    for (let i = 1; i < 5; i++) {
        option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i;
        select.appendChild(option);
    }

    submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";

    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(submitButton);

    return form;

}

function enterThePlayersNames(numberOfPlayers) {

    let playersName = [];
    let form, input, label, submitButton;

    application.innerHTML = '';

    form = document.createElement("form");
    form.setAttribute("id", "formulary");

    for (let i = 0; i < numberOfPlayers; i++) {

        label = document.createElement("label");
        label.innerHTML = 'Joueur n° ' + (i + 1);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("minlength", 4);
        input.setAttribute("maxlength", 20);
        input.setAttribute("name", i);

        playersName.push(input);

        form.appendChild(label);
        form.appendChild(input);
    }

    submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";
    submitButton.addEventListener("click", (event) => {
        savePlayersName(playersName);
        event.preventDefault();
    })

    form.appendChild(submitButton);
    application.appendChild(form);
}

function savePlayersName(arrayOfInput) {

    let name;

    application.innerHTML = '';

    for (let i = 0; i < arrayOfInput.length; i++) {
        name = document.createElement('p');
        name.innerHTML = arrayOfInput[i].value;
        application.appendChild(name)
    }

}

// App Launch

run();
