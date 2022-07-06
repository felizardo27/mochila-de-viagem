const form = document.querySelector('#novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];


itens.forEach( (elemento) => {
    addItem(elemento);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];
    
    // Adicionando no LocalStorage
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };

    //buscando elemento se existe
    const existe = itens.find(elemento => elemento.nome === nome.value)

    // se o nome encontra atualizaElemento, se não cria elemento do zero
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        // trocando o conteudo do array itens com o nova quantidade
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        addItem(itemAtual);

        itens.push(itemAtual);
    }

    // gravando no localStorage
    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
});


function addItem(item){
    //`<li class="item"><strong>${quantidade}</strong>${nome}</li>`;
    const novoLi = document.createElement('li');
    novoLi.classList.add('item');

    const liNumero = document.createElement('strong');
    liNumero.innerHTML = item.quantidade;
    liNumero.dataset.id = item.id;

    novoLi.appendChild(liNumero);
    novoLi.innerHTML += item.nome;

    novoLi.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoLi);
}


function atualizaElemento(item) {
    document.querySelector('[data-id="'+item.id+'"]').innerHTML = item.quantidade;  
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';
    elementoBotao.classList.add('btn-deletar')

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));
}