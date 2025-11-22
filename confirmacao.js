document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('confirmation-content');
    const backButton = document.getElementById('back-to-shop-btn');

    // 1. Recupera os dados da compra
    const carrinhoJSON = localStorage.getItem('compra_carrinho');
    const total = localStorage.getItem('compra_total');
    const formaPagamento = localStorage.getItem('forma_pagamento');

    if (carrinhoJSON && total) {
        const carrinho = JSON.parse(carrinhoJSON);


        let resumoHTML = `
            <h1>✅ Pagamento Confirmado!</h1>
            <p>Obrigado por sua compra. Seu pedido foi processado com sucesso.</p>
            
            <div class="summary-box">
                <h3>Resumo do Pedido</h3>
                <ul id="product-list">
        `;

        carrinho.forEach(item => {
           
            const subtotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',');
            resumoHTML += `
                <li>
                    <span>${item.quantidade}x ${item.nome}</span>
                    <span>R$ ${subtotal}</span>
                </li>
            `;
        });

        resumoHTML += `
                </ul>
                <p><strong>Forma de Pagamento:</strong> ${formaPagamento.toUpperCase()}</p> <!-- NOVO -->
                <strong>Total Pago: R$ ${total.replace('.', ',')}</strong>
            </div>
        `;

        contentDiv.innerHTML = resumoHTML;

   
        localStorage.removeItem('compra_carrinho');
        localStorage.removeItem('compra_total');

    } else {
        contentDiv.innerHTML = `
            <h1>⚠️ Erro</h1>
            <p>Não foi possível encontrar os detalhes do pedido. Por favor, verifique seu histórico de compras.</p>
        `;
    }

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
