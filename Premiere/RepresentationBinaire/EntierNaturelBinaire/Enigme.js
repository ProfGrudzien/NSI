const btnEnigme = document.getElementById("btnEnigme")
const pCodeEnigme = document.getElementById("enigmeCode")
const pMessageEnigme = document.getElementById("enigmeMessage")
const pChiffre1 = document.getElementById("chiffre1")
const pChiffre2 = document.getElementById("chiffre2")
const pChiffre3 = document.getElementById("chiffre3")
const pChiffre4 = document.getElementById("chiffre4")

const chiffre1 = Math.floor(4 + Math.random() * 6);
const chiffre2 = Math.floor(Math.random() * 10);
const chiffre3 = Math.floor(Math.random() * 10);
const chiffre4 = Math.floor(Math.random() * 10);
const decimal = chiffre1*4096+chiffre2*256+chiffre3*16+chiffre4
const binaire = decimal.toString(2)
pCodeEnigme.textContent = "0".repeat(16-binaire.length) + binaire
pChiffre1.value = null;
pChiffre2.value = null;
pChiffre3.value = null;
pChiffre4.value = null;

function verifier(event) {
    if (chiffre1 == pChiffre1.value && chiffre2 == pChiffre2.value && chiffre3 == pChiffre3.value && chiffre4 == pChiffre4.value) {
        pMessageEnigme.textContent = "Bravo, vous avez trouvé le code !"
    } else {
        pMessageEnigme.textContent = "Code faux, continuez à chercher !"
    }
}

btnEnigme.addEventListener("click", verifier)
