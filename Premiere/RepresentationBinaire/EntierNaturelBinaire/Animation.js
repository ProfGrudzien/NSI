const div = document.getElementById("animation")
const btn = document.getElementById("lancer")

function lancer(event) {
    var element = div.lastElementChild; 
    while (element) {
        div.removeChild(element);
        element = div.lastElementChild;
    }
    const p = document.createElement('p')
    p.textContent = '   1010 1001'
    p.style.zIndex = 5
    div.appendChild(p)
    setTimeout(etape1, 500)
}

function etape1() {
    const p = document.createElement('p')
    p.textContent = '=  1000 0000'
    p.style.zIndex = 1
    p.style.paddingTop = "50px"
    div.appendChild(p)
    p.animate([{paddingTop: "0px"}, {paddingTop: "50px"}], 500);
    setTimeout(etape2, 500)
}

function etape2() {
    const p = document.createElement('p')
    p.textContent = '+    10 0000'
    p.style.zIndex = 2
    p.style.paddingTop = "100px"
    div.appendChild(p)
    p.animate([{paddingTop: "0px"}, {paddingTop: "100px"}], 1000);
    setTimeout(etape3, 1000)
}

function etape3() {
    const p = document.createElement('p')
    p.textContent = '+       1000'
    p.style.zIndex = 3
    p.style.paddingTop = "150px"
    div.appendChild(p)
    p.animate([{paddingTop: "0px"}, {paddingTop: "150px"}], 1500);
    setTimeout(etape4, 1500)
}

function etape4() {
    const p = document.createElement('p')
    p.textContent = '+          1'
    p.style.zIndex = 4
    p.style.paddingTop = "200px"
    div.appendChild(p)
    p.animate([{paddingTop: "0px"}, {paddingTop: "200px"}], 2000);
    setTimeout(etape5, 3000)
}

function etape5() {
    const textes = ["", "128", " 32", "  8", "  1"]
    for(let i=1; i<5; i++) {
        var p = div.children[i]
        p.textContent += "  ⇾ " + textes[i]
    }
    setTimeout(etape6, 1000)
}

function etape6() {
    const p = document.createElement('p')
    p.textContent = '1010 1001  ⇾ 128 + 32 + 8 + 1 = 169'
    p.style.paddingTop = "300px"
    div.appendChild(p)
}

btn.addEventListener("click", lancer)
