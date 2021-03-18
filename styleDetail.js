window.onload = appelAjax;

function appelAjax(){

    let tab = window.location.search.split("=");
    console.log(tab);
    let codePays = tab[1].toLowerCase();
    console.log(codePays);

    let xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Abandon, impossible de créer une instance de XMLHTTP');
        return false;
    }
    xhr.open("GET", "https://restcountries.eu/rest/v2/name/"+codePays+"?format=json&field=name;altSpellings;capital;regionalBlocs;currencies;topLevelDomain;population;altSpellings;languages", true);
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

function affiche(paysSelec) {
    let paysDetail = paysSelec[0];

    let Pays = document.querySelector("#container");
    let div = document.createElement("div");
    Pays.append(div);
    let flag = document.createElement("img");
    flag.src = paysDetail.flag
    flag.style = "width: 20rem;";
    div.append(flag);
    //pays
    let text = document.createTextNode(paysDetail.name );
    document.querySelector('#pays').appendChild(text);
    //text pour legend
    let textLegend = document.createTextNode("Country : " + paysDetail.name );
    document.querySelector('#legend').appendChild(textLegend);
    //capital
    let textCapital = document.createTextNode("Capital : " + paysDetail.capital);
    document.querySelector('#capital').appendChild(textCapital);
    //Official Name
    let textOffName = document.createTextNode("Official Name : "+ paysDetail.altSpellings[1]);
    document.querySelector('#offiName').appendChild(textOffName);
    //population
    let textPop = document.createTextNode("Population : " + paysDetail.population);
    document.querySelector('#population').appendChild(textPop);
    //monnaie
    let textMonnaie = document.createTextNode("Currency : " + paysDetail.currencies[0].name + " " + paysDetail.currencies[0].symbol);
    document.querySelector('#monnaie').appendChild(textMonnaie);
    //region
    let textRegion = document.createTextNode("Continent : " + paysDetail.region);
    document.querySelector('#region').appendChild(textRegion);
    //subRegion
    let textSubRegion = document.createTextNode("Region : "+ paysDetail.subregion);
    document.querySelector('#sousRegion').appendChild(textSubRegion);
    //langue
    let textLangue = document.createTextNode("Language : " + paysDetail.languages[0].name);
    document.querySelector('#langue').append(textLangue);
}