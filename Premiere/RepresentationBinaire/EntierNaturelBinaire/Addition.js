function Addition() {
    this.retenues = document.createElement("p")
    this.resultat = document.createElement("p")
    this.calcul = document.createElement("p")
    this.texte = document.createElement("p")
    this.etapes = [{calcul:"0 + 1 = 1",
                    texte:"je pose 1",
                    retenues:"         ",
                    resultat:"        1"},
                   {calcul:"1 + 1 = 10",
                    texte:"je pose 1, je retiens 1",
                    retenues:"    1    ",
                    resultat:"      0 1"},
                   {calcul:"1 + 1 + 0 = 10",
                    texte:"je pose 1, je retiens 1",
                    retenues:"  1 1    ",
                    resultat:"    0 0 1"},
                   {calcul:"1 + 1 + 1 = 11",
                    texte:"je pose 11",
                    retenues:"  1 1    ",
                    resultat:"1 1 0 0 1"},
                   {calcul:"",
                    texte:"",
                    retenues:"  1 1    ",
                    resultat:"1 1 0 0 1"}]
                    
    this.lancer = (event) => {
        var element = divAddition.lastElementChild; 
        while (element) {
            divAddition.removeChild(element);
            element = divAddition.lastElementChild;
        }
        this.retenues.textContent = " "
        divAddition.appendChild(this.retenues)
        var p = document.createElement("p")
        p.textContent = "  1 1 1 0"
        divAddition.appendChild(p)
        var p = document.createElement("p")
        p.textContent = "+ 1 0 1 1"
        p.className = "somme"
        divAddition.appendChild(p)
        this.resultat.textContent = " "
        divAddition.appendChild(this.resultat)
        divAddition.appendChild(document.createElement('br'))
        this.calcul.textContent = " "
        divAddition.appendChild(this.calcul)
        this.texte.textContent = " "
        divAddition.appendChild(this.texte)
        setTimeout(this.etape, 2000, 0)
    }
    
    this.etape = (i) => {
        if (i < this.etapes.length) {
            this.retenues.textContent = this.etapes[i].retenues
            this.resultat.textContent = this.etapes[i].resultat
            this.calcul.textContent = this.etapes[i].calcul
            this.texte.textContent = this.etapes[i].texte
            setTimeout(this.etape, 5000, i+1)
        }
    }
}

const divAddition = document.getElementById("addition")
const animationAddition = new Addition()
divAddition.addEventListener("click", animationAddition.lancer)
