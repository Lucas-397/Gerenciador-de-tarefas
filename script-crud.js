const BTadcionartarefa = document.querySelector('.app__button--add-task');
const AddTarefa = document.querySelector('.app__form-add-task');  
const BTcancelar = document.querySelector('.app__form-footer__button--cancel');
const BTdeletar = document.querySelector('.app__form-footer__button--delete');
const Areatxt = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const tarefasEmAndamento = document.querySelector('.app__section-active-task-description');
const BTremoverTodos = document.querySelector('#btn-remover-todas')
const BTremoverConcluidas = document.querySelector('#btn-remover-concluidas');

let tarefaSelecionada = null;
let liTarefaSelecionada = null;  

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizaTarefa(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarELementoTarefa (tarefa){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.valor
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.onclick = () =>{
        const newDescription = prompt("Insira a nova tarefa");
        paragrafo.textContent = newDescription;
        tarefa.valor = newDescription;
        atualizaTarefa();
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', './imagens/edit.png');


    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa){
        li.classList.remove('app__section-task-list-item-active');
        li.classList.add('app__section-task-list-item-complete');
    }else{
        li.onclick = () =>{
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })

            if(tarefaSelecionada == tarefa){
                tarefaSelecionada = null;
                tarefasEmAndamento.textContent = '';
                liTarefaSelecionada = '';
                return li;
            }

            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            tarefasEmAndamento.textContent = tarefa.valor;
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

BTadcionartarefa.addEventListener('click', () => {
    AddTarefa.classList.toggle('hidden');
})


AddTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const tarefa = {
        valor: Areatxt.value    
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarELementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizaTarefa();
    Areatxt.value = '';
    AddTarefa.classList.add('hidden');  
})

BTcancelar.onclick = () => {
    Areatxt.value = '';
    AddTarefa.classList.add('hidden');
}

BTdeletar.onclick  = () => {
    Areatxt.value = '';
    AddTarefa.classList.add('hidden');
}


tarefas.forEach(tarefa => {
    const elementoTarefa = criarELementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () =>{
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', true);
        tarefasEmAndamento.textContent = '';
        tarefaSelecionada.completa = true;
        tarefasConcluidas.push(liTarefaSelecionada);
        atualizaTarefa();
    }
})

BTremoverTodos.onclick = () =>{
    console.log('hello')    
    localStorage.clear();
}

BTremoverConcluidas.onclick = () => {
    const tarefasConcluidas = document.querySelectorAll('.app__section-task-list-item-complete');
    tarefasConcluidas.forEach(element => {
        element.remove();   
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa);
    atualizaTarefa();
}
