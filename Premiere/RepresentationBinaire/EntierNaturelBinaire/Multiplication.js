function Multiplication() {
    this.ligne1 = document.createElement("p")
    this.ligne2 = document.createElement("p")
    this.resultat = document.createElement("p")
    this.texte = document.createElement("p")
    this.etapes = [{ligne1:"    1 0 1 1",
                    ligne2:"           ",
                    resultat:"           ",
                    texte:"1011 × 1 = 1011"},
                   {ligne1:"    1 0 1 1",
                    ligne2:"          ·",
                    resultat:"           ",
                    texte:"En passant au bit suivant, on n'oublie pas le décallage."},
                   {ligne1:"    1 0 1 1",
                    ligne2:"        · ·",
                    resultat:"           ",
                    texte:"1011 × 0 = 0, on passe au bit suivant, sans oublier le décallage."},
                   {ligne1:"    1 0 1 1",
                    ligne2:"1 0 1 1 · ·",
                    resultat:"           ",
                    texte:"1011 × 1 = 1011"},
                   {ligne1:"    1 0 1 1",
                    ligne2:"1 0 1 1 · ·",
                    resultat:"1 1 0 1 1 1",
                    texte:"1011 + 101100 = 110111"}]
                    
    this.lancer = (event) => {
        var element = divMultiplication.lastElementChild; 
        while (element) {
            divMultiplication.removeChild(element);
            element = divMultiplication.lastElementChild;
        }
        var p = document.createElement("p")
        p.textContent = "    1 0 1 1"
        divMultiplication.appendChild(p)
        var p = document.createElement("p")
        p.textContent = "×     1 0 1"
        p.className = "somme"
        divMultiplication.appendChild(p)
        this.ligne1.textContent = " "
        divMultiplication.appendChild(this.ligne1)
        this.ligne2.textContent = " "
        divMultiplication.appendChild(this.ligne2)
        this.resultat.textContent = " "
        divMultiplication.appendChild(this.resultat)
        divMultiplication.appendChild(document.createElement('br'))
        this.texte.textContent = " "
        divMultiplication.appendChild(this.texte)
        setTimeout(this.etape, 2000, 0)
    }
    
    this.etape = (i) => {
        if (i == 4) {
            this.ligne2.className = "somme"
        }
        if (i < this.etapes.length) {
            this.ligne1.textContent = this.etapes[i].ligne1
            this.ligne2.textContent = this.etapes[i].ligne2
            this.resultat.textContent = this.etapes[i].resultat
            this.texte.textContent = this.etapes[i].texte
            setTimeout(this.etape, 5000, i+1)
        }
    }
}

const divMultiplication = document.getElementById("multiplication")
const animationMultiplication = new Multiplication()
divMultiplication.addEventListener("click", animationMultiplication.lancer)
