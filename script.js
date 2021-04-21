window.onload = init;

function init(){
    document.querySelector('#cardi').style.display = 'none';
    document.querySelector('#quizz').style.display = 'none';
    document.querySelector('#saisie').onkeyup = appelAjax;
} 
function appelAjax(){
    document.querySelector('#cardi').style.display = '';
    let pays = document.querySelector('#saisie').value;
    let xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Abandon, impossible de créer une instance de XMLHTTP');
        return false;
    }

    xhr.open("GET", "https://restcountries.eu/rest/v2/name/"+pays+"?format=json&field=name;altSpellings;capital;regionalBlocs;currencies;topLevelDomain;population;", true);
    xhr.onreadystatechange = retour;
    xhr.send(null);

    function retour(){
        let listesPays = "";
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200){
                let response = xhr.responseText;
                listesPays = JSON.parse(response);
                affiche(listesPays);
            } else if (xhr.status === 404) {
                erreur();
            }
            else {
                alert('Il y a eu un pb avec la requete');
            }
        }
    }
}

function affiche(listesPays){

    clear();

    let Pays = document.querySelector("#pays");
    Pays.style = "display: flex; flex-direction: row; flex-wrap: wrap;";

    listesPays.forEach(pays => {
        let div = document.createElement("div");
        div.style = "display: flex; flex-direction: column; border: 1px solid black; margin: 5px; width: fit-content; background-color: white;";
        Pays.append(div);
        //flag
        let flag = document.createElement("img");
        flag.src = pays.flag
        flag.id = "cardi";
        flag.style = "width: 20rem;";
        div.append(flag);
        //pays
        let h2 = document.createElement("h2");
        let text = document.createTextNode(pays.name );
        h2.style = "padding: 10px;"
        h2.appendChild(text);
        div.append(h2);
        // redirection vers 2nd page
        let redir = document.createElement("a");
        redir.href = "./detail.html?id="+pays.name;
        redir.appendChild(text);
        h2.append(redir);
        //capital
        let span1 = document.createElement("div");
        let textCapital = document.createTextNode("Capital : " + pays.capital);
        span1.style = "padding: 10px;"
        span1.appendChild(textCapital);
        div.append(span1);
        //monaie
        let span2 = document.createElement("span");
        let textSymbole = document.createTextNode("Monnaie : " + pays.currencies[0].name + " ");
        let textMonnaie = document.createTextNode(pays.currencies[0].symbol);
        span2.style = "padding: 10px;"
        span2.style = "padding: 10px;"
        span2.appendChild(textSymbole);
        span2.appendChild(textMonnaie);
        div.append(span2);
        //population
        let span3 = document.createElement("p");
        let textPop = document.createTextNode("Population : " + pays.population);
        span3.style = "padding: 10px;"
        span3.appendChild(textPop);
        div.append(span3);
    })
}

function clear () {
    let divListePays = document.querySelector('#pays');
    while (divListePays.firstChild) {
        divListePays.removeChild(divListePays.lastChild);
    }
}

//TODO Ne fonctionne pas à corriger
function erreur(){
    clear();
    let divError = createElement("div");
    let textError = createTextNode("Mais ... Il faut que tu rentres un pays");
    divError.appendChild(textError);
    div.append(divError);
}

// JS pour récupérer les noms des joueurs et préparer leur fiche joueurs

const namePlayer1 = document.querySelector("#j1").addEventListener("click", afficheJoueur1);
const namePlayer2 = document.querySelector("#j2").addEventListener("click", afficheJoueur2);

function afficheJoueur1() {
    const joueur = document.querySelector("#joueur1").value;
    if (joueur == null || joueur == "" || joueur == " "){
        alert("Il faut rentrer un nom");
    } else {
        document.querySelector
        addCheckPlayer1();
    }
}
function afficheJoueur2() {
    const joueur = document.querySelector("#joueur2").value;
    if (joueur == null || joueur == "" || joueur == " "){
        alert("Il faut rentrer un nom");
    } else {
        addCheckPlayer2();
    }
}

function addCheckPlayer1 () {
    let player1Child = document.querySelector(".player1Child");
    player1Child.style = "display: flex; align-items: center;";
    let check = document.createElement("img");
    check.src = "./assets/img/check-solid.svg";
    check.style = "width: 20px; margin-left: 10px";
    document.querySelector("#j1").style.display = 'none';
    player1Child.append(check);

    // Rajout des informations pour calculer le score
    let player1 = document.querySelector(".player1");
    let score = document.createElement("div");
    score.className = "score";
    score.style = "padding: 15px;"
    let gain = document.createTextNode("Correct answers : ");
    let loss = document.createTextNode("Wrong answers : ");
    let gainEl = document.createElement("div");
    let lossEl = document.createElement("div");
    gainEl.appendChild(gain);
    lossEl.appendChild(loss);
    gainEl.style = "text-align: initial;";
    lossEl.style = "text-align: initial;";
    player1.append(gainEl, lossEl);
}

function addCheckPlayer2 () {
    let player1Child = document.querySelector(".player2Child");
    player1Child.style = "display: flex; align-items: center;";
    let check = document.createElement("img");
    check.src = "./assets/img/check-solid.svg";
    check.style = "width: 20px; margin-left: 10px";
    document.querySelector("#j2").style.display = 'none';
    player1Child.append(check);

    // Rajout des informations pour calculer le score
    let player2 = document.querySelector(".player2");
    let score = document.createElement("div");
    score.className = "score";
    score.style = "padding: 15px;"
    let gain = document.createTextNode("Correct answers : ");
    let loss = document.createTextNode("Wrong answers : ");
    let gainEl = document.createElement("div");
    let lossEl = document.createElement("div");
    gainEl.appendChild(gain);
    lossEl.appendChild(loss);
    gainEl.style = "text-align: initial;";
    lossEl.style = "text-align: initial;";
    player2.append(gainEl, lossEl);
}
//TODO A terminer pour éviter les alert
// function emptyString () {
//     let error = document.querySelector(".player1");
//     let div = document.createElement("div");
//     let info = document.createTextNode("You must enter a name to play the game");
//     div.append(info);
//     error.append(div);
// }

//TODO A terminer, se renseigner comment faire pour check quand les 2 fonctions addCheck sont terminées pour envoyer la fct dessous
function startTheGame() {
    let start = document.querySelector(".startFather");
    let button = document.createElement("button");
    button.className = "start";
    start.appendChild(button);
}

const startGame = document.querySelector("#start").addEventListener("click",game);

function game() {
    const quizz = document.querySelector("#quizz").style.display = '';
    console.log("c'est good - je peux bientot joue")
}