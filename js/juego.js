const totalTarjeta = 12
let cartasDisponibles = ['A', 'K', 'Q', 'J']
let carta = []
let selecionador = []
let valores = []
let movimiento = 0
let tiempo = 30
let temporizador;
let totalMovimientos = 0
let paresEncontrados = []

let lastarjetas = '<div class="carta"><div class="sello"></div><div class="cara"></div></div>'

function iniciarJuego() {
    const tiempoElemento = document.getElementById('tiempo')
    tiempoElemento.innerText = `Tiempo restante: ${tiempo} segundos`
    temporizador = setInterval(() => {
        tiempo--;
        tiempoElemento.innerText = `Tiempo restante: ${tiempo} segundos`
        if (tiempo <= 0) {
            clearInterval(temporizador)
            alert("¡Tiempo agotado!")
            window.location.href = "final.html";
            localStorage.setItem('paresEncontrados', paresEncontrados.join(','))

        } else if (document.querySelectorAll('.carta:not(.active)').length === 0) {
            clearInterval(temporizador);
            alert("¡Felicidades, has ganado!");
            window.location.href = "final.html";
            localStorage.setItem('paresEncontrados', paresEncontrados.join(','))


        }
    }, 1000)
}

function activar(e) {
    e.target.classList.add('active')
    if (!selecionador[0] || selecionador[0] !== e.target) {
        selecionador.push(e.target)
    }
    totalMovimientos++;
    document.getElementById('movimiento').innerText = `Movimientos: ${totalMovimientos}`
    if (selecionador.length === 2) {
        if (selecionador[0].querySelectorAll('.cara')[0].innerHTML === selecionador[1].querySelectorAll('.cara')[0].innerHTML) {
            paresEncontrados.push([selecionador[0].querySelector('.cara').innerHTML, selecionador[1].querySelector('.cara').innerHTML])
            selecionador = []
        } else {
            setTimeout(() => {
                selecionador[0].classList.remove('active')
                selecionador[1].classList.remove('active')
                selecionador = []
            }, 600);
        }
    }
}

function numrandom() {
    let numra = Math.floor(Math.random() * totalTarjeta * 0.5)
    let valore = valores.filter(values => values === numra)
    if (valore.length < 2) {
        valores.push(numra)

    } else {
        numrandom()
    }
}

function valoresCarta(valor) {
    let numra = valor;
    if (valor < cartasDisponibles.length) {
        numra = cartasDisponibles[valor];
    }
    return numra;
}

for (let i = 0; i < totalTarjeta; i++) {
    let div = document.createElement('div')
    div.innerHTML = lastarjetas
    carta.push(div)
    document.querySelector('#jue').append(carta[i])
    numrandom()
    carta[i].querySelector('.cara').innerHTML = valoresCarta(valores[i])
    carta[i].querySelectorAll('.carta')[0].addEventListener('click', activar)
}
iniciarJuego()