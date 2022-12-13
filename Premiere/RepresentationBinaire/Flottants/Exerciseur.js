function afficherBinaire(binaire) {
    var txt = binaire
    if (txt.length > 8) {
        return binaire
    }
    while (txt.length < 8) {
        txt = "0" + txt
    }
    return "(" + txt.slice(0, 4) + " " + txt.slice(4, 8) + ")<sub>2</sub>"
}

function binaireVersDecimal(event) {
    const div = document.getElementById("binaireVersDecimal")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.base10 = Math.floor(-128 + Math.random() * 256);
    if (form.base10 < 0) {
        form.tmpbase2 = (-form.base10).toString(2);
        while (form.tmpbase2.length < 8) {
            form.tmpbase2 = '0'+ form.tmpbase2
        }
        const listeBase2 = Array.from(form.tmpbase2).map(e => e=='0'?'1':'0')
        i = listeBase2.length - 1
        while (listeBase2[i] == "1") {
            listeBase2[i] = "0"
            i = i - 1
        }
        listeBase2[i] = "1"
        form.base2 = listeBase2.join("")
    } else {
        form.base2 = form.base10.toString(2);
        while (form.base2.length < 8) {
            form.base2 = '0'+ form.base2
        }
    }
    form.sujet = `Convertir en décimal l'entier naturel ${afficherBinaire(form.base2)} écrit en base 2 par la méthode du complément à 2 sur 1 octet.<br/>`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="number" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><p class="adroite"><input type="button" value="Correction"/></p></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const entry = event.target.previousElementSibling
            const label = event.target.nextElementSibling
            const form = entry.parentNode
            label.innerHTML = (entry.value == form.base10) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            var txtReponse = ""
            if (form.base10 < 0) {
                txtReponse = '<p class="left">Comme la représentation binaire de ce nombre commence par 1, le nombre est négatif.</p>'
                txtReponse += '<p class="left">On inverse tous les bits.</p>'
                txtReponse += `<p class="centrer">${afficherBinaire(Array.from(form.base2).map(e => e == "1" ? "0" : "1").join(""))}</p>`
                txtReponse += '<p class="left">On ajoute 1.</p>'
                txtReponse += `<p class="centrer">${afficherBinaire(form.tmpbase2)}</p>`
                txtReponse += '<p class="left">On suit la méthode de conversion des entiers naturels<p>'
                txtReponse += `<p class="centrer">${afficherBinaire(form.tmpbase2)} = (${-form.base10})<sub>10</sub></p>`
                txtReponse += `<p class="left">Donc ${afficherBinaire(form.base2)} = (${form.base10})<sub>10</sub><p>`
            } else {
                txtReponse = '<p class="left">Comme la représentation binaire de ce nombre commence par 0, le nombre est positif.</p>'
                txtReponse += '<p class="left">On suit la méthode de conversion des entiers naturels<p>'
                txtReponse += `<p class="centrer">${afficherBinaire(form.base2)} = (${form.base10})<sub>10</sub></p>`
            }
            label.innerHTML = txtReponse
        }
    };
    form.addEventListener("click", form.handleEvent)
}

function decimalVersBinaire(event) {
    const div = document.getElementById("decimalVersBinaire")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.base10 = Math.floor(-128 + Math.random() * 256);
    if (form.base10 < 0) {
        form.tmpbase2 = (-form.base10).toString(2);
        while (form.tmpbase2.length < 8) {
            form.tmpbase2 = '0'+ form.tmpbase2
        }
        const listeBase2 = Array.from(form.tmpbase2).map(e => e=='0'?'1':'0')
        i = listeBase2.length - 1
        while (listeBase2[i] == "1") {
            listeBase2[i] = "0"
            i = i - 1
        }
        listeBase2[i] = "1"
        form.base2 = listeBase2.join("")
    } else {
        form.base2 = form.base10.toString(2);
        while (form.base2.length < 8) {
            form.base2 = '0'+ form.base2
        }
    }
    form.sujet = `Convertir en base 2 par la méthode du complément à 2 sur 1 octet l'entier naturel (${form.base10})<sub>10</sub> écrit en base 10.<br/>`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="text" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><p class="adroite"><input type="button" value="Correction"/></p></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const entry = event.target.previousElementSibling
            const label = event.target.nextElementSibling
            const form = entry.parentNode
            label.innerHTML = entry.value.split(" ").join("") == form.base2 ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            var txtReponse = ""
            if (form.base10 < 0) {
                txtReponse = `<p class="left">On convertit ${-form.base10} en suivant la méthode de conversion des entiers naturels</p>`
                txtReponse += `<p class="centrer">(${-form.base10})<sub>10</sub> = (${(-form.base10).toString(2)})<sub>2</sub></p>`
                txtReponse += '<p class="left">On complète la représentation binaire par des 0 pour obtenir 8 bits.</p>'
                txtReponse += `<p class="centrer">(${-form.base10})<sub>10</sub> = ${afficherBinaire(form.tmpbase2)}</p>`
                txtReponse += '<p class="left">On inverse tous les bits.</p>'
                txtReponse += `<p class="centrer">${afficherBinaire(Array.from(form.tmpbase2).map(e => e == "1" ? "0" : "1").join(""))}</p>`
                txtReponse += '<p class="left">On termine la conversion en ajoutant 1.</p>'
                txtReponse += `<p class="centrer">(${form.base10})<sub>10</sub> = ${afficherBinaire(form.base2)}</p>`
            } else {
                txtReponse = '<p class="left">Comme le nombre est positif, on suit la méthode de conversion des entiers naturels<p>'
                txtReponse += `<p class="centrer">(${form.base10})<sub>10</sub> = (${form.base10.toString(2)})<sub>2</sub></p>`
                txtReponse += '<p class="left">On complète la représentation binaire par des 0 pour obtenir 8 bits.</p>'
                txtReponse += `<p class="centrer">(${form.base10})<sub>10</sub> = ${afficherBinaire(form.base2)}</p>`
            }
            label.innerHTML = txtReponse
        }
    };
    form.addEventListener("click", form.handleEvent)
}

binaireVersDecimal(null)
const btnBinaireVersDecimal = document.getElementById("binaireVersDecimal").nextElementSibling
btnBinaireVersDecimal.addEventListener("click", binaireVersDecimal)

decimalVersBinaire(null)
const btnDecimalVersBinaire = document.getElementById("decimalVersBinaire").nextElementSibling
btnDecimalVersBinaire.addEventListener("click", decimalVersBinaire)
