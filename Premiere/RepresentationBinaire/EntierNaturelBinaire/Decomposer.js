function Decomposer() {
    this.lancer = (event) => {
        var element = divDecomposer.lastElementChild; 
        while (element) {
            divDecomposer.removeChild(element);
            element = divDecomposer.lastElementChild;
        }
        const p = document.createElement('p')
        p.textContent = '   1010 1001'
        p.style.zIndex = 5
        divDecomposer.appendChild(p)
        setTimeout(this.etape1, 500)
    }
    
    this.etape1 = () => {
        const p = document.createElement('p')
        p.textContent = '=  1000 0000'
        p.style.zIndex = 1
        p.style.paddingTop = "50px"
        divDecomposer.appendChild(p)
        p.animate([{paddingTop: "0px"}, {paddingTop: "50px"}], 500);
        setTimeout(this.etape2, 500)
    }

    this.etape2 = () => {
        const p = document.createElement('p')
        p.textContent = '+    10 0000'
        p.style.zIndex = 2
        p.style.paddingTop = "100px"
        divDecomposer.appendChild(p)
        p.animate([{paddingTop: "0px"}, {paddingTop: "100px"}], 1000);
        setTimeout(this.etape3, 1000)
    }

    this.etape3 = () => {
        const p = document.createElement('p')
        p.textContent = '+       1000'
        p.style.zIndex = 3
        p.style.paddingTop = "150px"
        divDecomposer.appendChild(p)
        p.animate([{paddingTop: "0px"}, {paddingTop: "150px"}], 1500);
        setTimeout(this.etape4, 1500)
    }

    this.etape4 = () => {
        const p = document.createElement('p')
        p.textContent = '+          1'
        p.style.zIndex = 4
        p.style.paddingTop = "200px"
        divDecomposer.appendChild(p)
        p.animate([{paddingTop: "0px"}, {paddingTop: "200px"}], 2000);
        setTimeout(this.etape5, 3000)
    }

    this.etape5 = () => {
        const textes = ["", "128", " 32", "  8", "  1"]
        for(let i=1; i<5; i++) {
            var p = divDecomposer.children[i]
            p.textContent += "  ⇾ " + textes[i]
        }
        setTimeout(this.etape6, 1000)
    }

    this.etape6 = () => {
        const p = document.createElement('p')
        p.textContent = '1010 1001  ⇾ 128 + 32 + 8 + 1 = 169'
        p.style.paddingTop = "300px"
        divDecomposer.appendChild(p)
    }
}

const divDecomposer = document.getElementById("decomposer")
const animationDecomposer = new Decomposer()
divDecomposer.addEventListener("click", animationDecomposer.lancer)
