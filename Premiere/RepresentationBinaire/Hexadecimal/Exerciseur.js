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

function hexaVersDecimal(event) {
    const div = document.getElementById("hexaVersDecimal")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.base10 = Math.floor(20 + Math.random() * 65515);
    form.base16 = form.base10.toString(16) ;
    form.sujet = `Convertir en base 10 l'entier naturel (${form.base16})<sub>16</sub> écrit en base 16.`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="number" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><span class="aDroite"><input type="button" value="Correction"/></span></div>
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
            const bits = Array.from(form.base16);
            while (bits.length < 4) {bits.unshift('0')}
                const tdbits = bits.map((bit, i) => `<td>${bit}</font>`)
                const dico = {'a':10, 'b':11, 'c':12, 'd':13, 'e':14, 'f':15}
                const calculdeci = bits.map((bit, i) => bit == "0" ? "" : `${dico[bits[i]] ? dico[bits[i]] : bits[i]} &times; ${Math.pow(16, 3-i)}`)
                label.innerHTML = `
                    <table>
                        <tr>${tdbits.join("")}</tr>
                        <tr><td>16<sup>3</sup></td><td>16<sup>2</sup></td><td>16<sup>1</sup></td><td>16<sup>0</sup></td></tr>
                        <tr><td>4096</td><td>256</td><td>16</td><td>1</td></tr>
                    </table>
                    <p>${calculdeci.filter(dec => dec != "").join(" + ")} = ${form.base10}</p>
                    <p>donc (${form.base16})<sub>16</sub> = (${form.base10})<sub>10</sub></p>
                `
            }
    };
    form.addEventListener("click", form.handleEvent)
}

function decimalVersHexa(event) {
    const div = document.getElementById("decimalVersHexa")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.base10 = Math.floor(20 + Math.random() * 65515);
    form.base16 = form.base10.toString(16) ;
    form.sujet = `Convertir en base 16 l'entier naturel (${form.base10})<sub>10</sub> écrit en base 10.`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="text" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><span class="aDroite"><input type="button" value="Correction"/></span></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const entry = event.target.previousElementSibling
            const label = event.target.nextElementSibling
            const form = entry.parentNode
            label.innerHTML = (entry.value.toUpperCase() == form.base16.toUpperCase()) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            const restes = [0]
            const quotients = [form.base10]
            while (quotients[quotients.length-1] > 0) {
                restes.push(quotients[quotients.length-1] % 16)
                quotients.push(Math.floor(quotients[quotients.length-1] / 16))
            }
            const dico = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
            const txtDiv = []
            const txtDec = []
            const txtHex = []
            for(let i=1 ; i<restes.length; i++) {
                txtDiv.push(divisionEuclidienne(quotients[i-1], 16, quotients[i], restes[i]));
                txtDec.unshift(restes[i])
                txtHex.unshift(dico[restes[i]])
            }
            label.innerHTML = `
                <p>On utilise la méthode des divisions :</p>
                <p class="centrer">${txtDiv.join("   ")}</p>
                <p>On liste les restes (en partant de la dernière division posée) :</p>
                <p class="centrer">${txtDec.join(" ; ")}</p>
                <p>On traduit en hexadécimal :</p>
                <p class="centrer">${txtHex.join(" ; ")}</p>
                <p>donc (${form.base10})<sub>10</sub> = (${form.base16})<sub>16</sub></p>
            `
        }
    };
    form.addEventListener("click", form.handleEvent)
}

function hexaVersBinaire(event) {
    const div = document.getElementById("hexaVersBinaire")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.base10 = Math.floor(20 + Math.random() * 65515);
    form.base16 = form.base10.toString(16);
    form.base2 = form.base10.toString(2);
    form.sujet = `Convertir en base 2 l'entier naturel (${form.base16})<sub>16</sub> écrit en base 16.`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="number" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><span class="aDroite"><input type="button" value="Correction"/></span></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const entry = event.target.previousElementSibling
            const label = event.target.nextElementSibling
            const form = entry.parentNode
            label.innerHTML = entry.value.match(RegExp(`^0*${form.base2}$`)) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            const morceauxBase2 = []
            const morceauxBase10 = []
            const morceauxBase16 = []
            for (i=0; i<form.base16.length; i++) {
                const base10 = parseInt(form.base16[i],16)
                var base2 = base10.toString(2)
                if (base2.length % 4 != 0) {
                    base2 = "0".repeat(4 - base2.length % 4) + base2
                }
                morceauxBase2.push(base2)
                morceauxBase10.push(base10)
                morceauxBase16.push(form.base16[i])
            }
            var txtReponse = ""
            txtReponse += '<p>On converti en binaire chaque caractère hexadécimal (sur 4 bits).</p>'
            txtReponse += '<table><tr><td>'
            txtReponse += morceauxBase16.join("</td><td>")
            txtReponse += '</td></tr><tr><td>'
            txtReponse += morceauxBase10.join("</td><td>")
            txtReponse += '</td></tr><tr><td>'
            txtReponse += morceauxBase2.join("</td><td>")
            txtReponse += '</td></tr></table>'
            txtReponse += '<p>On assemble les bits obtenus.</p>'
            txtReponse += `<p class="centrer">${morceauxBase2.join(" ")}</p>`
            label.innerHTML = txtReponse
        }
    };
    form.addEventListener("click", form.handleEvent)
}

function binaireVersHexa(event) {
    const div = document.getElementById("binaireVersHexa")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.base10 = Math.floor(20 + Math.random() * 65515);
    form.base16 = form.base10.toString(16);
    form.base2 = form.base10.toString(2);
    form.sujet = `Convertir en base 16 l'entier naturel (${form.base2})<sub>2</sub> écrit en base 2.`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="text" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><span class="aDroite"><input type="button" value="Correction"/></span></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const entry = event.target.previousElementSibling
            const label = event.target.nextElementSibling
            const form = entry.parentNode
            label.innerHTML = (entry.value.toUpperCase() == form.base16.toUpperCase()) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            const nbZeros = form.base2.length % 4 == 0 ? 0 : 4 - form.base2.length % 4
            const newBase2 = '0'.repeat(nbZeros) + form.base2
            const morceauxBase2 = []
            const morceauxBase10 = []
            const morceauxBase16 = []
            for (i=0; i<newBase2.length / 4; i++) {
                const base10 = parseInt(newBase2.slice(i*4, i*4+4),2)
                morceauxBase2.push(newBase2.slice(i*4, i*4+4))
                morceauxBase10.push(base10)
                morceauxBase16.push(base10.toString(16))
            }
            var txtReponse = ""
            if (form.base2.length % 4 != 0) {
                txtReponse += '<p>On ajoute des 0 à la représentation binaire pour obtenir un nombre de bit multiple de 4.</p>'
                txtReponse += '<p class="centrer">'+'0'.repeat(nbZeros)+form.base2+'</p>'
            }
            txtReponse += '<p>On découpe la représentation binaire en morceaux de 4 bits.</p>'
            txtReponse += `<p class="centrer">${morceauxBase2.join("  ")}</p>`
            txtReponse += '<p>On converti en héxadécimal chacun de ces morceaux.</p>'
            txtReponse += '<table><tr><td>'
            txtReponse += morceauxBase2.join("</td><td>")
            txtReponse += '</td></tr><tr><td>'
            txtReponse += morceauxBase10.join("</td><td>")
            txtReponse += '</td></tr><tr><td>'
            txtReponse += morceauxBase16.join("</td><td>")
            txtReponse += '</td></tr></table>'
            txtReponse += '<p>On assemble les caractères hexadécimals obtenus.</p>'
            txtReponse += `<p class="centrer">${morceauxBase16.join("")}</p>`
            label.innerHTML = txtReponse
        }
    };
    form.addEventListener("click", form.handleEvent)
}

hexaVersDecimal(null)
const btnHexaVersDecimal = document.getElementById("hexaVersDecimal").nextElementSibling
btnHexaVersDecimal.addEventListener("click", hexaVersDecimal)

decimalVersHexa(null)
const btnDecimalVersHexa = document.getElementById("decimalVersHexa").nextElementSibling
btnDecimalVersHexa.addEventListener("click", decimalVersHexa)

hexaVersBinaire(null)
const btnHexaVersBinaire = document.getElementById("hexaVersBinaire").nextElementSibling
btnHexaVersBinaire.addEventListener("click", hexaVersBinaire)

binaireVersHexa(null)
const btnBinaireVersHexa = document.getElementById("binaireVersHexa").nextElementSibling
btnBinaireVersHexa.addEventListener("click", binaireVersHexa)
