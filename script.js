function exo() {
    var input = document.getElementById("input").value;      /* On récupère l'input entré */
    let times = input.split(":")[1];
    let record = input.split(":")[2];
    let timesArray = times.match(/\d+/g);
    let recordArray = record.match(/\d+/g);
    let result = 1;
    let timeTotal = times.replaceAll(' ','').match(/\d+/);
    let recordTotal = record.replaceAll(' ','').match(/\d+/);
    let result2 = possibility(timeTotal, recordTotal);
    for(let i =0; i < timesArray.length; i++){  /* on fait une boucle pour chaque course et on utilise le position array pour tout récupérer */
        let numberOfPossibility = possibility(timesArray[i], recordArray[i]);        
        result = result*numberOfPossibility;
        }   
    let showResult = document.getElementById("result");
    showResult.innerHTML = "<p>Le résultat de la première partie de l'exo est " + result + " et " + result2 + " pour la deuxième partie";  /* On affiche le résultat obtenu */
}

function possibility(times, record) {      /* fonction qui permet de calculer toutes les possibilités de battre le record */
    let numberOfPossibility = 0;
    for (let i = 0; i <= times; i++) {  /* on fait une boucle sur chaque possibilité de chaque course */
        let boatspeed = i;
        let distance = boatspeed * (times-i);
        if(distance > record){
            numberOfPossibility++;
        }
    }
    return numberOfPossibility;
}
const selection = document.getElementById("input");
selection.addEventListener("change", exo);


