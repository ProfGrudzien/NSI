const divAddition = document.getElementById("addition")
var celluleA, celluleB, celluleC, celluleD, celluleE, celluleF, celluleG
const etapes = [{calcul:"0 + 1 = 1",
                 texte:"je pose 1",
                 cellules:[celluleA]},
                {calcul:"1 + 1 = 10",
                 texte:"je pose 1, je retiens 1",
                 cellules:[celluleB, celluleC]},
                {calcul:"1 + 1 + 0 = 10",
                 texte:"je pose 1, je retiens 1",
                 cellules:[celluleD, celluleE]},
                {calcul:"1 + 1 + 1 = 11",
                 texte:"",
                 cellules:[celluleF, celluleG]}]

function lancer(event) {
    var element = divAddition.lastElementChild; 
    while (element) {
        divAddition.removeChild(element);
        element = divAddition.lastElementChild;
    }
    /* ici afficher l'addition et déclarer les cellules et la zone de texte */
    setTimeout(etape, 1000, 0)
}

function etape(i) {
    if (i<etapes.length) {
        /* ici changer calcul, texte, cellules.style */
        setTimeout(etape, 2000, i+1)
    }
}

divAddition.addEventListener("click", lancer)
