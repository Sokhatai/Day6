function exo() 
{
    var input = document.getElementById("input").value;      /* On récupère l'input entré */
    let hands = input.match(/[A-Z\d]+ \d+/g);
    let fiveOfAKind = [];
    let fourOfAKind = [];
    let fullHouse = [];
    let threeOfAKind = [];
    let twoPair = [];
    let onePair = [];
    let highCard = [];
    let result = 0;
    for (let hand of hands){
        let handPower = power(hand.split(" ")[0]);
        switch(handPower){
            case 6: 
            fiveOfAKind.push(hand);
            break;

            case 5: 
            fourOfAKind.push(hand);
            break;
            
            case 4: 
            fullHouse.push(hand);
            break;
            
            case 3: 
            threeOfAKind.push(hand);
            break;
            
            case 2: 
            twoPair.push(hand);
            break;
            
            case 1: 
            onePair.push(hand);
            break;
            
            case 0: 
            highCard.push(hand);
            break;
        }
    }
    arrange(fiveOfAKind);
    arrange(fourOfAKind);
    arrange(fullHouse);
    arrange(threeOfAKind);
    arrange(twoPair);
    arrange(onePair);
    arrange(highCard);
    for (let i = 0; i < highCard.length; i++){
        let bid = highCard[i].split(" ")[1];
        result = (1 + i) * bid + result;
    }
    for (let i = 0; i < onePair.length; i++){
        let bid = onePair[i].split(" ")[1];
        result = (1 + highCard.length + i) * bid + result;
    }
    for (let i = 0; i < twoPair.length; i++){
        let bid = twoPair[i].split(" ")[1];
        result = (1 + highCard.length + onePair.length+ i) * bid + result;
    }
    for (let i = 0; i < threeOfAKind.length; i++){
        let bid = threeOfAKind[i].split(" ")[1];
        result = (1 + highCard.length + onePair.length+ twoPair.length + i) * bid + result;
    }
    for (let i = 0; i < fullHouse.length; i++){
        let bid = fullHouse[i].split(" ")[1];
        result = (1 + highCard.length + onePair.length+ twoPair.length + threeOfAKind.length + i) * bid + result;
    }
    for (let i = 0; i < fourOfAKind.length; i++){
        let bid = fourOfAKind[i].split(" ")[1];
        result = (1 + highCard.length + onePair.length+ twoPair.length + threeOfAKind.length + fullHouse.length + i) * bid + result;
    }
    for (let i = 0; i < fiveOfAKind.length; i++){
        let bid = fiveOfAKind[i].split(" ")[1];
        result = (1 + highCard.length + onePair.length+ twoPair.length + threeOfAKind.length + fullHouse.length + fourOfAKind.length + i) * bid + result;
    }
    let showResult = document.getElementById("result");
    showResult.innerHTML = "<p>Le résultat de la première partie de l'exo est " + result /*+ " et " + result2 + " pour la deuxième partie";  /* On affiche le résultat obtenu */

}

function power(hand){           /* fonction pour déterminer la puissance d'une main */
    let cards = hand.match(/./g);
    let value = 1;
    let valueDouble = 1;
    let double = null;
    for (let i = 0; i < cards.length; i++) { // nested for loop
        for (let j = i+1; j < cards.length; j++) {
            // prevents the element from comparing with itself
            if (i !== j) {
                // check if elements' values are equal
                if (cards[i] === cards[j] && cards[i] != null) {
                    // duplicate element present                                
                    if (double == cards[i] || double == null){
                    double = cards[i];  
                    value++;
                    cards[j] = null;
                    }
                    else{
                        valueDouble++;
                        cards[j] = null;
                    }
                }
            }
        }
}   
    if(value == 5 ){
        return 6; /* Five of a kind */
    }
    if(value == 4){
        return 5; /* Four of a kind */
    }
    if(value == 3 && valueDouble == 2 || value == 2 && valueDouble ==3){
        return 4; /* Full house */
    }
    if(value == 3){
        return 3; /* Brelan */
    }
    if(value == 2 && valueDouble == 2){
        return 2; /* Two pair */
    }
    if(value == 2){
        return 1; /* One pair */
    }
    if(value == 1){
        return 0; /* High card */
    }
}

function arrange(hands){    /* fonction pour réaranger le tableau en fonction de leurs puissance */
    hands.sort(function (a, b){
        a = a.split(" ")[0]     /* on supprime le "bid" car il nous intéresse pas ici*/
        b = b.split(" ")[0]
        let cardsA = a.split("");
        let cardsB = b.split("");
        for(let i=0; i < cardsA.length; i++){
            switch(cardsA[i]){
                case 'A':
                    cardsA[i] = 14;
                    break;
                case 'K':
                    cardsA[i] = 13;
                    break;
                case 'Q':
                    cardsA[i] = 12;
                    break;
                case 'J':
                    cardsA[i] = 11;
                    break;
                case 'T':
                    cardsA[i] = 10;
                    break;
            }
            switch(cardsB[i]){
                case 'A':
                    cardsB[i] = 14;
                    break;
                case 'K':
                    cardsB[i] = 13;
                    break;
                case 'Q':
                    cardsB[i] = 12;
                    break;
                case 'J':
                    cardsB[i] = 11;
                    break;    
                case 'T':
                    cardsB[i] = 10;
                    break;
            }
            if (parseInt(cardsB[i]) < parseInt(cardsA[i])){
                return 1;
            }
            if (parseInt(cardsB[i]) > parseInt(cardsA[i])){
                return -1;
            }
        }
    
        return 0;
    
    });
    return hands;
}



const selection = document.getElementById("input");
selection.addEventListener("change", exo);


