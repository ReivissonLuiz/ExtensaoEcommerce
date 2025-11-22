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
    
// Bloco de geração de linha no seu script.js (dentro do carrinho.forEach)
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
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        html += `
            <tr>
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                <td>
                    <button class="qty-btn" onclick="diminuirQuantidade('${item.nome}')">-</button>
                    <span class="qty-display">${item.quantidade}</span>
                    <button class="qty-btn" onclick="aumentarQuantidade('${item.nome}')">+</button>
                </td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td>
                    <button class="btn-remove" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>'; 
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

    // 1. Calcula o total da compra
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    // 2. Salva os dados da compra no localStorage para a tela de confirmação
    localStorage.setItem('compra_carrinho', JSON.stringify(carrinho));
    localStorage.setItem('compra_total', total.toFixed(2)); 

    // 3. Limpa o carrinho local e no localStorage (a compra foi "finalizada")
    carrinho = [];
    salvarCarrinho();
    
    // 4. Redireciona para a nova tela de confirmação
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
