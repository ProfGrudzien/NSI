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
    form.base10 = Math.floor(5 + Math.random() * 250);
    form.base2 = form.base10.toString(2) ;
    form.sujet = `Convertir en base 10 l'entier naturel ${afficherBinaire(form.base2)} écrit en base 2.<br/>`
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
            const bits = Array.from(form.base2);
            while (bits.length < 8) {bits.unshift('0')}
            const tdbits = bits.map((bit, i) => `<td>${bit}</td>`)
            const colordeci = bits.map((bit, i) => bit == "0" ? "" : Math.pow(2, 7-i))
            const tddeci = colordeci.map(dec => `<td>${dec}</td>`)
            label.innerHTML = `
                <table>
                    <tr>${tdbits.join("")}</tr>
                    <tr><td>2<sup>7</sup></td><td>2<sup>6</sup></td><td>2<sup>5</sup></td><td>2<sup>4</sup></td><td>2<sup>3</sup></td><td>2<sup>2</sup></td><td>2<sup>1</sup></td><td>2<sup>0</sup></td></tr>
                    <tr><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
                    <tr>${tddeci.join("")}</tr>
                </table>
                <p>${colordeci.filter(dec => dec != "").join(" + ")} = ${form.base10}</p>
                <p>donc ${afficherBinaire(form.base2)} = (${form.base10})<sub>10</sub></p>
            `
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
    form.base10 = Math.floor(5 + Math.random() * 250);
    form.base2 = form.base10.toString(2) ;
    form.sujet = `Convertir en base 2 l'entier naturel (${form.base10})<sub>10</sub> écrit en base 10.<br/>`
    form.innerHTML = `
        <label name="question">${form.sujet}</label>
        <input type="number" name="rep"></input>
        <input type="submit" value="Vérifier"/>
        <label></label>
        <div class="correction" name="correction"><p class="adroite"><input type="button" value="Correction"/></p></div>
    `;
    soustractions = (n, p) => {
        if (n == 0) {return ""}
        if (Math.pow(2, p) > n) {return soustractions(n, p-1)}
        return `<p>${n} - ${Math.pow(2, p)} = ${n-Math.pow(2, p)}</p><p>${soustractions(n-Math.pow(2, p), p-1)}</p>`
    }
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const entry = event.target.previousElementSibling
            const label = event.target.nextElementSibling
            const form = entry.parentNode
            label.innerHTML = entry.value.match(RegExp(`^0*${form.base2}$$`)) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            const bits = Array.from(form.base2);
            while (bits.length < 8) {bits.unshift('0')}
            const deci = bits.map((bit, i) => bit == "0" ? "" : Math.pow(2, 7-i));
            label.innerHTML = `
                <div class="soustractions">${soustractions(form.base10, 7)}</div>
                <table>
                    <tr><td>2<sup>7</sup></td><td>2<sup>6</sup></td><td>2<sup>5</sup></td><td>2<sup>4</sup></td><td>2<sup>3</sup></td><td>2<sup>2</sup></td><td>2<sup>1</sup></td><td>2<sup>0</sup></td></tr>
                    <tr><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
                    <tr><td>${bits.join("</td><td>")}</td></tr>
                </table>
                donc (${form.base10})<sub>10</sub> = ${afficherBinaire(form.base2)}
            `
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
