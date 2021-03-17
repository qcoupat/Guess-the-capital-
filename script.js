window.onload = init;

function init(){
    document.querySelector('#cardi').style.display = 'none';
    document.querySelector('#validation').onclick = appelAjax;
} 
function appelAjax(){
    document.querySelector('#cardi').style.display = '';
    let pays = document.querySelector('#saisie').value;
    let xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Abandon, impossible de créer une instance de XMLHTTP');
        return false;
    }

    xhr.open("GET", "https://restcountries.eu/rest/v2/name/"+pays+"?format=json&field=name;altSpellings;capital;regionalBlocs;currencies;topLevelDomain;population", true);
    xhr.onreadystatechange = retour;
    xhr.send(null);

    function retour(){
        let listesPays = "";
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200){
                //   console.log('retour ' + xhr.responseText);
                //   console.log('retour2 ' + xhr.responseXML);    // null

                let response = xhr.responseText;
                listesPays = JSON.parse(response);
                affiche(listesPays);
            } else {
                alert('Il y a eu un pb avec la requete');
            }
        }
    }
}

function affiche(listesPays){
    let Pays = document.querySelector("#pays");
    Pays.style = "display: flex; flex-direction: column;";

    listesPays.forEach(pays => {
        //flag
        let flag = document.createElement("img");
        flag.src = pays.flag
        flag.id = "cardi";
        flag.style = "width: 20rem;";
        Pays.append(flag);
        //pays
        let h2 = document.createElement("h2");
        let text = document.createTextNode(pays.name );
        h2.appendChild(text);
        Pays.append(h2);
        //capital
        let span1 = document.createElement("div");
        let textCapital = document.createTextNode("Capital : " + pays.capital);
        span1.appendChild(textCapital);
        Pays.append(span1);
        //monaie
        let span2 = document.createElement("span");
        let textSymbole = document.createTextNode("Monnaie : " + pays.currencies[0].name + " ");
        let textMonnaie = document.createTextNode(pays.currencies[0].symbol);
        span2.appendChild(textSymbole);
        span2.appendChild(textMonnaie);
        Pays.append(span2);
        //population
        let span3 = document.createElement("p");
        let textPop = document.createTextNode("Population : " + pays.population);
        span3.appendChild(textPop);
        Pays.append(span3);
    })
}
        // let text = document.createTextNode(pays.name + ' - drapeau : ' + pays.flag + ' - capital ' + pays.capital);
