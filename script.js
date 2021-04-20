window.onload = init;

function init(){
    document.querySelector('#cardi').style.display = 'none';
    document.querySelector('#saisie').onkeyup = appelAjax;
    afficheJoueurs();
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

// function afficheJoueurs() {
//     const select = document.querySelector("#players").value;
//     console.log(select);
//     select.addEventListener('change', function(event){
//         console.log("coucou");
//     })
// }
