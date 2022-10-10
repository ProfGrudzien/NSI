function divisionEuclidienne(a, b, q, r) {
    return `
        <table class="division">
            <tr><td class="borderRight">${a}</td><td class="borderBottom">${b}</td></tr>
            <tr><td class="suspension">&#8285;</td><td>${q}</td></tr>
            <tr><td class="borderRight">${r}</td><td></td></tr>
        </table>
    `
}

const trDecomposition = document.getElementById("exempleDecomposition")
const listeDecomposition = [{a:15952, b:4096, q:3, r:3664},
                            {a:3664, b:256, q:14, r:80},
                            {a:80, b:16, q:5, r:0},
                            {a:0, b:1, q:0, r:0}]

listeDecomposition.forEach (data => {
    const td = document.createElement("td")
    td.innerHTML = divisionEuclidienne(data.a, data.b, data.q, data.r)
    trDecomposition.appendChild(td)
})

const pDivisions = document.getElementById("exempleDivisions")
const listeDivisions = [{a:15952, b:16, q:997, r:0},
                        {a:997, b:16, q:62, r:5},
                        {a:62, b:16, q:3, r:14},
                        {a:3, b:16, q:0, r:3}]
pDivisions.innerHTML = listeDivisions.reduce((texte, data) => texte + divisionEuclidienne(data.a, data.b, data.q, data.r), "")
