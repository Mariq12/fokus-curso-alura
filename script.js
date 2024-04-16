// Seleccionar elementos del DOM
const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const botonIniciarPausar = document.querySelector('#start-pause');
const inputMusicaEnfoque = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');

// Definir objetos de audio
const musica = new Audio('./sounds/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sounds/play.wav');
const audioPausa = new Audio('./sounds/pause.mp3');
const audioTiempoFinalizado = new Audio('./sounds/beep.mp3');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

// Configuración inicial del objeto de música
musica.loop = true;

// Event listener para alternar la reproducción de música
inputMusicaEnfoque.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Event listener para el botón de enfoque
botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    // classList permite agregar y quitar clases
    botonEnfoque.classList.add('active');
});
// Event listener para el botón de descanso corto
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});
// Event listener para el botón de descanso largo
botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

// Función para cambiar el contexto de la aplicación
function cambiarContexto(contexto) {
    mostrarTiempo();
    botones.forEach(function (botonContexto){
        botonContexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/images/${contexto}.png`);
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `;
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie.<strong class="app__title-strong"> Haz una pausa larga.</strong>
            `;
            break;
        default:
            break;
    }
}

// Función para la cuenta regresiva
const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('¡Tiempo finalizado!');
        reiniciar();
        return;
    }
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
};

// Event listener para iniciar o pausar el temporizador
botonIniciarPausar.addEventListener('click', iniciarOpausar);

function iniciarOpausar() {
    if(idIntervalo){
        audioPausa.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `/images/pause.png`);
}

// Event listener para iniciar o pausar el temporizador
function reiniciar() {
    clearInterval(idIntervalo); 
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `/images/play_arrow.png`);
    idIntervalo = null;
}

// Función para mostrar el tiempo en pantalla
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-ES', {minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}
// Mostrar el tiempo inicial al cargar la página
mostrarTiempo();

