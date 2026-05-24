function exibirRelatorio() {
    const carrinho = LocalStorageManager.carregarCarrinho();
    const usuario = LocalStorageManager.carregarUsuarioLogado();
    const cadastros = LocalStorageManager.carregarCadastros();

    // Exibir dados brutos
    document.getElementById('relatorio-carrinho').textContent = 
        carrinho.length > 0 ? JSON.stringify(carrinho, null, 2) : 'Carrinho vazio';
    
    document.getElementById('relatorio-usuario').textContent = 
        usuario ? JSON.stringify(usuario, null, 2) : 'Nenhum usuário logado';
    
    document.getElementById('relatorio-cadastros').textContent = 
        cadastros.length > 0 ? JSON.stringify(cadastros, null, 2) : 'Nenhum cadastro';

    // Atualizar badges
    document.getElementById('badge-carrinho').textContent = carrinho.length;
    document.getElementById('badge-usuario').textContent = usuario ? '✅ Online' : '❌ Offline';
    document.getElementById('badge-cadastros').textContent = cadastros.length;

    // Calcular resumo
    const totalCarrinho = carrinho.reduce((total, item) => 
        total + (item.preco * item.quantidade), 0
    );
    
    const qtdProdutos = carrinho.reduce((total, item) => 
        total + item.quantidade, 0
    );
    
    document.getElementById('resumo-carrinho-total').textContent = 
        `R$ ${totalCarrinho.toFixed(2)}`;
    
    document.getElementById('resumo-carrinho-qtd').textContent = 
        qtdProdutos > 0 ? `${qtdProdutos} produto(s)` : '0 produtos';
    
    document.getElementById('resumo-usuarios').textContent = cadastros.length;
    
    document.getElementById('resumo-acesso').textContent = 
        usuario?.dataLogin || 'Sem acesso registrado';

    console.log('📊 Relatório atualizado!');
}

function limparTodos() {
    if (confirm('⚠️ ATENÇÃO!\n\nVocê tem certeza? Isso apagará TODOS os dados armazenados:\n- Carrinho\n- Usuário Logado\n- Cadastros\n\nEsta ação não pode ser desfeita!')) {
        if (confirm('Confirmar exclusão?')) {
            LocalStorageManager.limparTudo();
            alert('✅ Todos os dados foram apagados com sucesso!');
            exibirRelatorio();
            
            // Redirecionar para home
            setTimeout(() => {
                window.location.href = 'Index.html';
            }, 1500);
        }
    }
}

function exportarRelatorio() {
    const dados = LocalStorageManager.obterTodosDados();
    const json = JSON.stringify(dados, null, 2);
    
    // Criar blob e download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nextshape-relatorio-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Relatório exportado com sucesso!');
}

// Carregar ao abrir a página
window.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Página de relatório carregada');
    exibirRelatorio();
});

// Recarregar a cada 3 segundos (para ver atualizações em tempo real)
setInterval(exibirRelatorio, 3000);