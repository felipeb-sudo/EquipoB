// Recuperar paresEncontrados del almacenamiento local y convertirlo a un array
let paresEncontrados = localStorage.getItem('paresEncontrados')
if (paresEncontrados) {
    paresEncontrados = paresEncontrados.split(',')
} else {
    paresEncontrados = [];
}

document.getElementById('pares').innerText = paresEncontrados.length


//boton de final
document.getElementById('boton-reiniciar').addEventListener('click', function() {
    window.location.href = 'juego.html'
});