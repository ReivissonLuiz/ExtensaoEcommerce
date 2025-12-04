document.addEventListener('DOMContentLoaded', () => {
    const totalElem = document.getElementById('display-total');
    const compraTotal = localStorage.getItem('compra_total');
    if (compraTotal) {
        totalElem.textContent = compraTotal.replace('.', ',');
    } else {
        alert('Nenhum pedido encontrado. Você será redirecionado ao carrinho.');
        window.location.href = 'carrinho.html';
    }

    window.processarPagamento = function() {
        const name = document.getElementById('card-name').value.trim();
        const number = document.getElementById('card-number').value.replace(/\s+/g, '');
        const expiry = document.getElementById('card-expiry').value.trim();
        const cvv = document.getElementById('card-cvv').value.trim();

        if (!name || !number || !expiry || !cvv) {
            alert('Por favor, preencha todos os campos do cartão.');
            return;
        }

        if (!/^[0-9]{13,19}$/.test(number)) {
            alert('Número do cartão inválido. Digite apenas números (13-19 dígitos).');
            return;
        }

        if (!/^[0-9]{3,4}$/.test(cvv)) {
            alert('CVV inválido. Deve conter 3 ou 4 dígitos.');
            return;
        }

        const last4 = number.slice(-4);
        localStorage.setItem('forma_pagamento', 'cartao');
        localStorage.setItem('pagamento_cartao', JSON.stringify({card_last4: last4, card_name: name}));

        window.location.href = 'confirmacao.html';
    };
});
