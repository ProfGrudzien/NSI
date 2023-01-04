function insererEspace(binaire, n) {
    if (binaire == "") {
        return ""
    } else if (n == 8) {
        return insererEspace(binaire.slice(0, -1), 1) + binaire.charAt(binaire.length-1) + " "
    } else {
        return insererEspace(binaire.slice(0, -1), n+1) + binaire.charAt(binaire.length-1)
    }
}

function afficherBinaire(binaire) {
    return `(${insererEspace(binaire, 0)})<sub>2</sub>`
}

function afficherDecimal(decimal) {
    return decimal.toString().replace("-", "&minus;").replace(".", ",")
}

function mantisseBinaire(mantisse) {
    var binaire = mantisse.toString(2);
    while (binaire.charAt(binaire.length-1)=="0") {
        binaire = binaire.slice(0, -1)
    }
    return binaire.slice(1)
}

function signeBinaire(signe) {
    return signe == 1 ? "0" : "1"
}

function formaterMantisse(mantisse) {
    return mantisse + "0".repeat(23-mantisse.length)
}

function formaterExposant(exposant) {
    const binaire = (exposant + 127).toString(2);
    return "0".repeat(8-binaire.length) + binaire
}

function sommeBits(binaire) {
    var S = 0
    for (let i=0; i<binaire.length; i++) {
        S += parseInt(binaire.charAt(i))
    }
    return S
}

function sommeMantisse(mantisse) {
    var txt = "2<sup>0</sup>"
    Array.from(mantisse).forEach((bit, index) => {
        if (bit == 1) {
            txt += ` + 2<sup>${-index-1}</sup>`
        }
    })
    return txt
}

function flottantsEnDecimal(event) {
    const div = document.getElementById("flottantsEnDecimal")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.signe = 2*Math.floor(Math.random()*2) - 1
    form.exposant = Math.floor(Math.random() * 16) - 4;
    const base = Math.pow(2, Math.min(5+form.exposant, 12))
    form.base = base + Math.floor(Math.random() * (base-1)) + 1;
    form.base10 = form.signe * form.base * Math.pow(2, form.exposant-form.base.toString(2).length+1);
    form.mantisse = mantisseBinaire(form.base.toString(2))
    form.base2 = signeBinaire(form.signe) + formaterExposant(form.exposant) + formaterMantisse(form.mantisse);
    form.sujet = `Convertir en décimal le nombre flottant représenté en binaire (simple précision) par :<p class="centrer">${afficherBinaire(form.base2)}</p>`
    form.innerHTML = `
        ${form.sujet}
        <label>Ce nombre est</label>
        <select id="exo1Signe">
            <option value="1">positif</option>
            <option value="-1">négatif</option>
        </select>
        <span id="exo1VerdictSigne"></span>
        <br/>
        <label>La mantisse (en binaire) est :</label>
        <input type="text" id="exo1Mantisse"></input>
        <span id="exo1VerdictMantisse"></span>
        <br/>
        <label>L'exposant (en décimal) est :</label>
        <input type="number" id="exo1Exposant"></input>
        <span id="exo1VerdictExposant"></span>
        <br/>
        <label>La valeur en base 10 de ce nombre est :</label>
        <input type="number" id="exo1Decimal"></input>
        <span id="exo1VerdictDecimal"></span>
        <input type="submit" value="Vérifier"/>
        <div class="correction" ><span class="aDroite"><input type="button" value="Correction"/></span></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const verdictSigne = document.getElementById("exo1VerdictSigne")
            const verdictMantisse = document.getElementById("exo1VerdictMantisse")
            const verdictExpossant = document.getElementById("exo1VerdictExposant")
            const verdictDecimal = document.getElementById("exo1VerdictDecimal")
            verdictSigne.textContent = (document.getElementById("exo1Signe").value == form.signe) ? "Vrai" : "Faux"
            var reponseMantisse = document.getElementById("exo1Mantisse").value
            while (reponseMantisse.charAt(reponseMantisse.length-1)=="0") {
                reponseMantisse = reponseMantisse.slice(0, -1)
            }
            verdictMantisse.textContent = (reponseMantisse == "1,"+form.mantisse) ? "Vrai" : "Faux"
            verdictExpossant.textContent = (document.getElementById("exo1Exposant").value == form.exposant) ? "Vrai" : "Faux"
            verdictDecimal.textContent = (document.getElementById("exo1Decimal").value == form.base10) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            var txtReponse = "<p class='left'>On commence par séparer les bits en trois groupes pour retrouver les informations sur le signe, l'exposant et sur la mantisse : </p>"
            txtReponse += `<p class="centrer">${afficherBinaire(form.base2).slice(0,2) + '|'+afficherBinaire(form.base2).slice(2,11) + '|' + afficherBinaire(form.base2).slice(11)}</p>`
            txtReponse += `<p class='left'>Comme le premier bit est ${form.signe==1?0:1}, le nombre est ${form.signe==1?"positif":"négatif"}.</p>`
            txtReponse += `<p class='left'>L'exposant est codé par ${afficherBinaire(form.base2.slice(1,9))} ce qui donne ${form.exposant+127} en décimal. En utilisant le décallage de +127 utilisé lors du codage de l'exposant, on retrouve un exposant égal à&nbsp;${form.exposant}.</p>`
            txtReponse += `<p class='left'>La mantisse est codée par ${afficherBinaire(form.base2.slice(9))}. Elle est donc égale (en binaire) à 1,${form.mantisse} ce qui correspond à :</p>`
            txtReponse += `<p class='centrer'>${sommeMantisse(form.mantisse)}</p>`
            txtReponse += "<p class='left'>Le nombre cherché est donc :</p>"
            txtReponse += `<p class='centrer'>${form.signe==1?"":"&minus;"}(${sommeMantisse(form.mantisse)}) &times; 2<sup>${form.exposant}</sup> = ${afficherDecimal(form.base10)}</p>`
            label.innerHTML = txtReponse
        }
    };
    form.addEventListener("click", form.handleEvent)
}

function flottantsEnBinaire(event) {
    const div = document.getElementById("flottantsEnBinaire")
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const form = document.createElement("form");
    div.appendChild(form);
    form.signe = 2*Math.floor(Math.random()*2) - 1
    form.exposant = Math.floor(Math.random() * 16) - 4;
    const base = Math.pow(2, Math.min(5+form.exposant, 12))
    form.base = base + Math.floor(Math.random() * (base-1)) + 1;
    form.base10 = form.signe * form.base * Math.pow(2, form.exposant-form.base.toString(2).length+1);
    form.mantisse = mantisseBinaire(form.base.toString(2))
    form.base2 = signeBinaire(form.signe) + formaterExposant(form.exposant) + formaterMantisse(form.mantisse);
    form.sujet = `Convertir le nombre flottant (${afficherDecimal(form.base10)})<sub>10</sub> en binaire (simple précision).<br/>`
    form.innerHTML = `
        ${form.sujet}
        <label>Le signe sera codé en binaire par</label>
        <input type="text" id="exo2Signe"></input>
        <span id="exo2VerdictSigne"></span>
        <br/>
        <label>La mantisse (en binaire) est :</label>
        <input type="text" id="exo2Mantisse"></input>
        <span id="exo2VerdictMantisse"></span>
        <br/>
        <label>L'exposant (en décimal) est :</label>
        <input type="number" id="exo2Exposant"></input>
        <span id="exo2VerdictExposant"></span>
        <br/>
        <label>L'exposant sera codé en binaire par :</label>
        <input type="text" id="exo2CodageExposant"></input>
        <span id="exo2VerdictCodageExposant"></span>
        <br/>
        <label>Ce nombre sera codé en binaire par :</label>
        <p class="centrer">
            <input type="text" id="exo2Binaire" class="long"></input>
            <span id="exo2VerdictBinaire"></span>
        </p>
        <p class="centrer"><input type="submit" value="Vérifier"/></p>
        <div class="correction"><span class="aDroite"><input type="button" value="Correction"/></span></div>
    `;
    form.handleEvent = (event) => {
        if (event.target.type == "submit") {
            event.preventDefault()
            const verdictSigne = document.getElementById("exo2VerdictSigne")
            const verdictMantisse = document.getElementById("exo2VerdictMantisse")
            const verdictExpossant = document.getElementById("exo2VerdictExposant")
            const verdictCodageExpossant = document.getElementById("exo2VerdictCodageExposant")
            const verdictBinaire = document.getElementById("exo2VerdictBinaire")
            verdictSigne.textContent = (document.getElementById("exo2Signe").value === signeBinaire(form.signe)) ? "Vrai" : "Faux"
            var reponseMantisse = document.getElementById("exo2Mantisse").value
            while (reponseMantisse.charAt(reponseMantisse.length-1)=="0") {
                reponseMantisse = reponseMantisse.slice(0, -1)
            }
            verdictMantisse.textContent = (reponseMantisse == "1,"+form.mantisse) ? "Vrai" : "Faux"
            verdictExpossant.textContent = (document.getElementById("exo2Exposant").value == form.exposant) ? "Vrai" : "Faux"
            verdictCodageExpossant.textContent = (document.getElementById("exo2CodageExposant").value == formaterExposant(form.exposant)) ? "Vrai" : "Faux"
            verdictBinaire.textContent = (document.getElementById("exo2Binaire").value.replace(/ /g, '') == form.base2) ? "Vrai" : "Faux"
        }
        if (event.target.type == "button") {
            const label = event.target.parentNode.parentNode
            const form = label.parentNode
            var partieDecimale = Math.abs(form.base10-parseInt(form.base10))
            var partieDecimaleMantisse = ","
            var txtReponse = `<p class='left'>Comme le nombre est ${form.signe==1?"positif":"négatif"}, le bit codant le signe est ${signeBinaire(form.signe)}.</p>`
            if (partieDecimale == 0) {
                txtReponse += `<p class='left'>Le nombre ${parseInt(Math.abs(form.base10))} se code par ${afficherBinaire(Math.abs(form.base10).toString(2))}.</p>`
                txtReponse += `<p class='left'>Comme ${parseInt(Math.abs(form.base10)).toString(2)} = 1,${form.mantisse} &times; 2<sup>${form.exposant}</sup>, la mantisse est 1,${form.mantisse} et l'exposant est ${form.exposant}.</p>`
            } else {
                txtReponse += "<p class='left'>Écrivons ce nombre en binaire à virgule fixe :<ul>"
                txtReponse += `<li>La partie entière, ${parseInt(Math.abs(form.base10))}, se code par ${afficherBinaire(parseInt(Math.abs(form.base10)).toString(2))}.</li>`
                txtReponse += `<li>Ce nombre commence par ${parseInt(Math.abs(form.base10)).toString(2)},...<br/>On se concentre sur la partie décimale ${afficherDecimal(partieDecimale)} :`
                txtReponse += "<ul>"
                while (partieDecimale != 0) {
                    txtReponse += `<li>${afficherDecimal(partieDecimale)} &times; 2 = ${afficherDecimal(2*partieDecimale)}`
                    txtReponse += ` donc le bit suivant est ${parseInt(2*partieDecimale)}.</li>`
                    partieDecimaleMantisse += parseInt(2*partieDecimale)
                    partieDecimale = 2*partieDecimale - parseInt(2*partieDecimale)
                }
                txtReponse += `</ul>Ce nombre s'écrit donc ${parseInt(Math.abs(form.base10)).toString(2)+partieDecimaleMantisse} en binaire.`
                txtReponse += "</li></ul></p>"
                txtReponse += `<p class='left'>Comme ${parseInt(Math.abs(form.base10)).toString(2)+partieDecimaleMantisse} = 1,${form.mantisse} &times; 2<sup>${form.exposant}</sup>, la mantisse est 1,${form.mantisse} et l'exposant est&nbsp;${form.exposant}.</p>`
            }
            txtReponse += `<p class='left'>Seule la partie après la virgule sera encodé en binaire, complétée pour atteindre 23 bits. On encode donc ${afficherBinaire(formaterMantisse(form.mantisse))}.</p>`
            txtReponse += `<p class='left'>Un décallage est appliqué avant d'encoder l'exposant en binaire. On encode donc ${form.exposant}&nbsp;+&nbsp;127&nbsp;=&nbsp;${form.exposant + 127} et on obtient ${afficherBinaire(formaterExposant(form.exposant))}.</p>`
            txtReponse += "<p class='left'>Il ne reste plus qu'a assembler dans l'ordre : le signe puis l'exposant et enfin la mantisse. On obtient :</p>"
            txtReponse += `<p class='centrer'>${afficherBinaire(form.base2)}</p>`
            label.innerHTML = txtReponse
        }
    };
    form.addEventListener("click", form.handleEvent)
}

flottantsEnDecimal(null)
const btnflottantsEnDecimal = document.getElementById("flottantsEnDecimal").nextElementSibling
btnflottantsEnDecimal.addEventListener("click", flottantsEnDecimal)

flottantsEnBinaire(null)
const btnflottantsEnBinaire = document.getElementById("flottantsEnBinaire").nextElementSibling
btnflottantsEnBinaire.addEventListener("click", flottantsEnBinaire)
