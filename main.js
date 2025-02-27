const fundo = document.querySelector('html');
const BTfoco = document.querySelector('.app__card-button--foco');
const BTcurto = document.querySelector('.app__card-button--curto');
const BTlongo = document.querySelector('.app__card-button--longo');
const tempoTemporizador = document.querySelector('#timer');

let BTatual = BTfoco;

const imagem = document.querySelector('.app__image');
let titulo = document.querySelector('.app__title');

const botaoSom = document.querySelector('#alternar-musica');
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;

const BTtempo = document.querySelector('#start-pause span');
const imagemBotaoTempo = document.querySelector('.app__card-primary-butto-icon') 
let tempoEmSegundos = 1500;
let tempoTotal = tempoEmSegundos;
mostraTempo(tempoTotal);

let intervaloid = null;


botaoSom.addEventListener('click', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

BTfoco.addEventListener('click', () => {    
    const contexto = 'foco';
    alterarContexto(contexto);
    alterarTexto(contexto);
    alteraBotoes(BTfoco);

    tempoEmSegundos = 1500;
    tempoTotal = tempoEmSegundos;
    zerarTemporizador();
})

BTcurto.addEventListener('click', () => {
    const contexto = 'descanso-curto';
    alterarContexto(contexto);
    alterarTexto(contexto);
    alteraBotoes(BTcurto);

    tempoEmSegundos = 300;
    tempoTotal = tempoEmSegundos;
    zerarTemporizador();
})

BTlongo.addEventListener('click', () => {
    const contexto = 'descanso-longo';
    alterarContexto(contexto);
    alterarTexto(contexto);
    alteraBotoes(BTlongo);

    tempoEmSegundos = 900;
    tempoTotal = tempoEmSegundos;
    zerarTemporizador();
})


function alterarContexto(contexto){
    fundo.setAttribute('data-contexto', contexto) ;
    imagem.setAttribute('src', `./imagens/${contexto}.png`);
}

function alteraBotoes (BTclicado) {
    BTatual.classList.remove('active');
    BTclicado.classList.add('active');
    BTatual = BTclicado;
}

function alterarTexto(contexto){
    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class "app__title-strong"> mergulhe no que importa <strong/>`;
            break
        case "descanso-curto":
            titulo.innerHTML = `que tal dar uma respirada?<strong class = "app__title-strong"> faça uma pausa curta<strong/>`;
            break
        
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class = "app__title-strong "> Faça uma pausa longa.<strong/>`
            break
    }
}

const somInicioTemporizador = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somFimTemporizador = new Audio('./sons/beep.mp3');

function temporizador (){
    if(intervaloid){
        somPause.play();
        zerarTemporizador();
        return
    }
    somInicioTemporizador.play();
    intervaloid = setInterval(contagemRegresiva, 1000);
    BTtempo.textContent = "Pausar";
    imagemBotaoTempo.setAttribute('src', './imagens/pause.png');
}

function zerarTemporizador(){
    clearInterval(intervaloid);
    intervaloid  = null;
    BTtempo.textContent = 'Começar';
    imagemBotaoTempo.setAttribute('src', './imagens/play_arrow.png');
    mostraTempo(tempoTotal);
}

const contagemRegresiva = () => {     
    if(tempoEmSegundos <= 0){
        zerarTemporizador();
        somFimTemporizador.play();
        alert('tempo finalizado');
        const fundoAtivo = fundo.getAttribute('data-contexto') == "foco";
        if(fundoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }

        return;
    }
    tempoEmSegundos -= 1;
    mostraTempo(tempoEmSegundos);
}

BTtempo.addEventListener('click',temporizador);

function mostraTempo(time){
    const tempo = new Date (time*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute:'2-digit', second:'2-digit'}); 
   tempoTemporizador.innerHTML = `${tempoFormatado}`;
}