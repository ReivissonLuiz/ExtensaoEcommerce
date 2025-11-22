let carrinho = [];

document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
    atualizarContador();
});

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarContador();
    mostrarNotificacao(`${nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
    carregarCarrinho();
}

function aumentarQuantidade(nome) {
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade++;
        salvarCarrinho();
        carregarCarrinho();
    }
}

function diminuirQuantidade(nome) {
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        if (item.quantidade > 1) {
            item.quantidade--;
        } else {
            removerDoCarrinho(nome);
        }
        salvarCarrinho();
        carregarCarrinho();
    }
}

function atualizarContador() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        cartCount.textContent = totalItens;
    }
}

function exibirCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = '0,00';
        return;
    }
    
    // 1. Inicia a tabela com cabeçalho e corpo (para o CSS responsivo)
    let html = '<table class="cart-table"><thead><tr><th>Produto</th><th>Preço</th><th>Qtd</th><th>Subtotal</th><th>Ação</th></tr></thead><tbody>';
    let total = 0;
    
    // 2. Loop para adicionar cada item do carrinho
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        // Gera a linha da tabela com os atributos data-label
        html += `
            <tr>
                <td data-label="Produto">${item.nome}</td>
                <td data-label="Preço">R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                <td data-label="Qtd">
                    <button class="qty-btn" onclick="diminuirQuantidade('${item.nome}')">-</button>
                    <span class="qty-display">${item.quantidade}</span>
                    <button class="qty-btn" onclick="aumentarQuantidade('${item.nome}')">+</button>
                </td>
                <td data-label="Subtotal">R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td data-label="Ação">
                    <button class="btn-remove" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                </td>
            </tr>
        `;
    });
    
    // 3. Fecha o corpo e a tabela
    html += '</tbody></table>';
    
    // 4. Insere o HTML e atualiza o total
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}


function limparCarrinho() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        carrinho = [];
        salvarCarrinho();
        carregarCarrinho();
        exibirCarrinho();
    }
}

// FUNÇÃO CORRIGIDA PARA FINALIZAR A COMPRA E REDIRECIONAR
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    localStorage.setItem('compra_carrinho', JSON.stringify(carrinho));
    localStorage.setItem('compra_total', total.toFixed(2)); 

    window.location.href = 'pagamento.html';
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
    exibirCarrinho();
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

function filterProducts() {
    const input = document.getElementById('search-input');
    const filter = input.value.toUpperCase();
    const grid = document.querySelector('.grid');
    const cards = grid.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        const h3 = cards[i].getElementsByTagName('h3')[0];
        const txtValue = h3.textContent || h3.innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = ""; // Mostra o card
        } else {
            cards[i].style.display = "none"; // Esconde o card
        }
    }
}
