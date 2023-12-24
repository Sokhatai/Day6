function exo() 
{
    var input = document.getElementById("input").value;     // On récupère l'input entré
    let roadMap = String(input.match(/\S+/));
    let goingTo = "AAA";
    let regex = new RegExp(goingTo+" = [^ ]+ [^ ]+");
    let position = String(input.match(regex));        // Permet d'avoir les infos de la position actuelle dans [0] le chemin a gauche dans le [1] et celui de droite dans le [2]
    let stepTaken = 0;
    while (position.match(/[A-Z]+/g)[0] != "ZZZ"){
    for (let direction of roadMap.split("")){
        if(direction == 'L'){
            goingTo = position.match(/[A-Z]+/g)[1];
        }
        if(direction == 'R'){
            goingTo = position.match(/[A-Z]+/g)[2];
        }
        regex = new RegExp(goingTo+" = [^ ]+ [^ ]+");
        position = String(input.match(regex)); 
        stepTaken++;
    }
}
let showResult = document.getElementById("result");
showResult.innerHTML = "<p>Il faudra " + stepTaken + " pour atteindre ZZZ"/*+ " et " + result2 + " pour la deuxième partie";  /* On affiche le résultat obtenu */
}


const selection = document.getElementById("input");
selection.addEventListener("change", exo);


