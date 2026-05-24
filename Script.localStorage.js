class LocalStorageManager {
    
    // ========== Carrinho ==========
    
    static salvarCarrinho(carrinho) {
        localStorage.setItem('nextshape_carrinho', JSON.stringify(carrinho));
        console.log('✅ Carrinho salvo:', carrinho);
    }
    
    static carregarCarrinho() {
        const carrinho = localStorage.getItem('nextshape_carrinho');
        return carrinho ? JSON.parse(carrinho) : [];
    }
    
    static adicionarAoCarrinho(nome, preco) {
        let carrinho = this.carregarCarrinho();
        
        const produtoExistente = carrinho.find(item => item.nome === nome);
        
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            carrinho.push({
                id: Date.now(),
                nome: nome,
                preco: preco,
                quantidade: 1,
                dataAdicionado: new Date().toLocaleString()
            });
        }
        
        this.salvarCarrinho(carrinho);
        return carrinho;
    }
    
    static removerDoCarrinho(id) {
        let carrinho = this.carregarCarrinho();
        carrinho = carrinho.filter(item => item.id !== id);
        this.salvarCarrinho(carrinho);
        return carrinho;
    }
    
    static limparCarrinho() {
        localStorage.removeItem('nextshape_carrinho');
    }
    
    // ========== Usuário ==========
    
    static salvarUsuarioLogado(email, nome) {
        const usuario = {
            email: email,
            nome: nome,
            dataLogin: new Date().toLocaleString(),
            logado: true
        };
        localStorage.setItem('nextshape_usuario', JSON.stringify(usuario));
        console.log('✅ Usuário salvo:', usuario);
    }
    
    static carregarUsuarioLogado() {
        const usuario = localStorage.getItem('nextshape_usuario');
        return usuario ? JSON.parse(usuario) : null;
    }
    
    static fazerLogout() {
        localStorage.removeItem('nextshape_usuario');
        console.log('✅ Usuário deslogado');
    }
    
    static estaLogado() {
        const usuario = this.carregarUsuarioLogado();
        return usuario && usuario.logado === true;
    }
    
    // ========== Cadastro ==========
    
    static salvarCadastro(dadosFormulario) {
        let cadastros = this.carregarCadastros();
        
        const novoCadastro = {
            id: Date.now(),
            ...dadosFormulario,
            dataCadastro: new Date().toLocaleString()
        };
        
        cadastros.push(novoCadastro);
        localStorage.setItem('nextshape_cadastros', JSON.stringify(cadastros));
        console.log('✅ Cadastro salvo:', novoCadastro);
        
        return novoCadastro;
    }
    
    static carregarCadastros() {
        const cadastros = localStorage.getItem('nextshape_cadastros');
        return cadastros ? JSON.parse(cadastros) : [];
    }
    
    static verificarEmailExistente(email) {
        const cadastros = this.carregarCadastros();
        return cadastros.some(cadastro => cadastro.email === email);
    }
    
    // ========== Geral ==========
    
    static obterTodosDados() {
        return {
            carrinho: this.carregarCarrinho(),
            usuarioLogado: this.carregarUsuarioLogado(),
            cadastros: this.carregarCadastros(),
            timestamp: new Date().toLocaleString()
        };
    }
    
    static limparTudo() {
        localStorage.clear();
        console.log('✅ LocalStorage completamente limpo');
    }
    
    static exibirDados() {
        console.table(this.obterTodosDados());
    }
}