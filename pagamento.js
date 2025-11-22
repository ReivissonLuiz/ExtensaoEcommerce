document.addEventListener('DOMContentLoaded', ( ) => {
    const options = document.querySelectorAll('.payment-option');
    const continueBtn = document.getElementById('continue-payment-btn');
    let selectedMethod = null;

    // 1. Adiciona o evento de clique para selecionar a forma de pagamento
    options.forEach(option => {
        option.addEventListener('click', () => {
          
            options.forEach(opt => opt.classList.remove('selected'));
            
         
            option.classList.add('selected');
            
         
            selectedMethod = option.getAttribute('data-method');
            
           
            continueBtn.disabled = false;
        });
    });

    // 2. Adiciona o evento de clique para continuar
    continueBtn.addEventListener('click', () => {
        if (selectedMethod) {
            // Salva a forma de pagamento escolhida no localStorage
            localStorage.setItem('forma_pagamento', selectedMethod);
            
            // Redireciona para a tela de confirmação
            window.location.href = 'confirmacao.html';
        } else {
            alert('Por favor, selecione uma forma de pagamento para continuar.');
        }
    });
    
    // Opcional: Verifica se os dados do carrinho existem antes de mostrar a tela
    const carrinhoJSON = localStorage.getItem('compra_carrinho');
    if (!carrinhoJSON) {
        alert('Não há itens no carrinho para finalizar a compra.');
        window.location.href = 'carrinho.html'; // Volta para o carrinho se não houver dados
    }
});
