// Elementos do formulário
const form = document.querySelector('#formCadastro');
const emailInput = document.querySelector('#email');
const cpfInput = document.querySelector('#cpf');
const nomeInput = document.querySelector('#nome');
const senhaInput = document.querySelector('#senha');
const confirmaSenhaInput = document.querySelector('#confirmaSenha');
const telefoneCelularInput = document.querySelector('#telefoneCelular');
const telefoneFixoInput = document.querySelector('#telefoneFixo');
const cepInput = document.querySelector('#cep');
const ruaInput = document.querySelector('#rua');
const numeroInput = document.querySelector('#numero');
const bairroInput = document.querySelector('#bairro');
const cidadeInput = document.querySelector('#cidade');
const estadoInput = document.querySelector('#estado');

const btnMostrarSenha = document.querySelector('#btnMostrarSenha');
const btnVoltar = document.querySelector('#btnVoltar');
const mensagemAlerta = document.querySelector('#mensagemAlerta');
const barraProgresso = document.querySelector('#barraProgresso');
const textoSeguranca = document.querySelector('#textoSeguranca');

// ========================================
// VALIDAÇÕES
// ========================================

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar e formatar CPF
function validarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (cpfLimpo.length !== 11) {
        return false;
    }
    
    // Validação básica (evitar CPF com todos os dígitos iguais)
    const digitos = [...cpfLimpo].map(Number);
    if (digitos.every(d => d === digitos[0])) {
        return false;
    }
    
    return true;
}

// Formatar CPF enquanto digita
function formatarCPF(value) {
    const cpfLimpo = value.replace(/\D/g, '');
    const match = cpfLimpo.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    if (!match) return value;
    
    let cpfFormatado = match[1];
    if (match[2]) cpfFormatado += '.' + match[2];
    if (match[3]) cpfFormatado += '.' + match[3];
    if (match[4]) cpfFormatado += '-' + match[4];
    
    return cpfFormatado;
}

// Formatar telefone
function formatarTelefone(value, isCelular = true) {
    const telefoneLimpo = value.replace(/\D/g, '');
    
    if (isCelular) {
        const match = telefoneLimpo.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        if (!match) return value;
        
        let telefoneFormatado = '';
        if (match[1]) telefoneFormatado = '(' + match[1];
        if (match[2]) telefoneFormatado += ') ' + match[2];
        if (match[3]) telefoneFormatado += '-' + match[3];
        
        return telefoneFormatado;
    } else {
        const match = telefoneLimpo.match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        if (!match) return value;
        
        let telefoneFormatado = '';
        if (match[1]) telefoneFormatado = '(' + match[1];
        if (match[2]) telefoneFormatado += ') ' + match[2];
        if (match[3]) telefoneFormatado += '-' + match[3];
        
        return telefoneFormatado;
    }
}

// Formatar CEP
function formatarCEP(value) {
    const cepLimpo = value.replace(/\D/g, '');
    const match = cepLimpo.match(/(\d{0,5})(\d{0,3})/);
    if (!match) return value;
    
    let cepFormatado = match[1];
    if (match[2]) cepFormatado += '-' + match[2];
    
    return cepFormatado;
}

// Calcular força da senha
function calcularForcaSenha(senha) {
    let forca = 0;
    
    if (senha.length >= 6) forca += 10;
    if (senha.length >= 8) forca += 10;
    if (senha.length >= 12) forca += 10;
    
    if (/[a-z]/.test(senha)) forca += 10;
    if (/[A-Z]/.test(senha)) forca += 10;
    if (/[0-9]/.test(senha)) forca += 10;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(senha)) forca += 10;
    
    return Math.min(forca, 100);
}

// Atualizar indicador de força de senha
function atualizarIndicadorSenha() {
    const senha = senhaInput.value;
    
    if (senha.length === 0) {
        barraProgresso.className = 'barra-progresso';
        textoSeguranca.textContent = 'Digite uma senha';
        return;
    }
    
    const forca = calcularForcaSenha(senha);
    
    barraProgresso.classList.remove('fraca', 'media', 'forte');
    
    if (forca <= 40) {
        barraProgresso.classList.add('fraca');
        textoSeguranca.textContent = 'Senha fraca';
    } else if (forca <= 70) {
        barraProgresso.classList.add('media');
        textoSeguranca.textContent = 'Senha média';
    } else {
        barraProgresso.classList.add('forte');
        textoSeguranca.textContent = 'Senha forte';
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Formatar CPF em tempo real
cpfInput.addEventListener('input', (e) => {
    e.target.value = formatarCPF(e.target.value);
});

// Formatar telefone celular
telefoneCelularInput.addEventListener('input', (e) => {
    e.target.value = formatarTelefone(e.target.value, true);
});

// Formatar telefone fixo
telefoneFixoInput.addEventListener('input', (e) => {
    e.target.value = formatarTelefone(e.target.value, false);
});

// Formatar CEP
cepInput.addEventListener('input', (e) => {
    e.target.value = formatarCEP(e.target.value);
});

// Mostrar/esconder senha
btnMostrarSenha.addEventListener('click', (e) => {
    e.preventDefault();
    
    const tipo = senhaInput.type === 'password' ? 'text' : 'password';
    senhaInput.type = tipo;
    
    // Trocar ícone ou adicionar feedback visual
    const icon = btnMostrarSenha.querySelector('.icon-eye');
    icon.style.opacity = tipo === 'password' ? '0.6' : '1';
});

// Atualizar indicador de força de senha
senhaInput.addEventListener('input', atualizarIndicadorSenha);

// Botão voltar
btnVoltar.addEventListener('click', () => {
    window.location.href = 'login.html';
});

// ========================================
// ENVIO DO FORMULÁRIO
// ========================================

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Limpar mensagem anterior
    mensagemAlerta.className = 'mensagem-alerta mensagem-oculta';
    
    // Validar campos obrigatórios
    const email = emailInput.value.trim();
    const cpf = cpfInput.value.trim();
    const nome = nomeInput.value.trim();
    const senha = senhaInput.value;
    const confirmaSenha = confirmaSenhaInput.value;
    const telefoneCelular = telefoneCelularInput.value.trim();
    const cep = cepInput.value.trim();
    const rua = ruaInput.value.trim();
    const numero = numeroInput.value.trim();
    const bairro = bairroInput.value.trim();
    const cidade = cidadeInput.value.trim();
    const estado = estadoInput.value.trim();
    
    // Validação 1: Email
    if (!email) {
        exibirErro('O campo E-mail é obrigatório');
        return;
    }
    if (!validarEmail(email)) {
        exibirErro('Por favor, digite um e-mail válido');
        return;
    }
    
    // Validação 2: CPF
    if (!cpf) {
        exibirErro('O campo CPF é obrigatório');
        return;
    }
    if (!validarCPF(cpf)) {
        exibirErro('CPF inválido. Por favor, verifique o número digitado');
        return;
    }
    
    // Validação 3: Nome
    if (!nome) {
        exibirErro('O campo Nome Completo é obrigatório');
        return;
    }
    if (nome.split(' ').length < 2) {
        exibirErro('Por favor, digite seu nome e sobrenome');
        return;
    }
    
    // Validação 4: Telefone
    if (!telefoneCelular) {
        exibirErro('O campo Telefone Celular é obrigatório');
        return;
    }
    
    // Validação 5: Senha
    if (!senha) {
        exibirErro('O campo Senha é obrigatório');
        return;
    }
    if (senha.length < 6) {
        exibirErro('A senha deve ter no mínimo 6 caracteres');
        return;
    }
    
    // Validação 6: Confirmação de Senha
    if (!confirmaSenha) {
        exibirErro('O campo Confirmar Senha é obrigatório');
        return;
    }
    if (senha !== confirmaSenha) {
        exibirErro('As senhas não coincidem. Por favor, verifique');
        return;
    }
    
    // Validação 7: Endereço
    if (!cep) {
        exibirErro('O campo CEP é obrigatório');
        return;
    }
    if (!rua) {
        exibirErro('O campo Rua é obrigatório');
        return;
    }
    if (!numero) {
        exibirErro('O campo Número é obrigatório');
        return;
    }
    if (!bairro) {
        exibirErro('O campo Bairro é obrigatório');
        return;
    }
    if (!cidade) {
        exibirErro('O campo Cidade é obrigatório');
        return;
    }
    if (!estado) {
        exibirErro('Por favor, selecione um Estado');
        return;
    }
    
    // Se chegou aqui, todos os campos são válidos
    exibirSucesso('Cadastro realizado com sucesso! Redirecionando...');
    
    // Simular envio e redirecionar
    setTimeout(() => {
        // Aqui você faria um POST para seu backend
        console.log('Dados do formulário:', {
            email,
            cpf,
            nome,
            telefoneCelular,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        });
        
        // Redirecionar para página de sucesso ou login
        window.location.href = 'login.html';
    }, 2000);
});

// Funções auxiliares para mostrar mensagens
function exibirErro(mensagem) {
    mensagemAlerta.textContent = mensagem;
    mensagemAlerta.className = 'mensagem-alerta mensagem-erro';
    
    // Scroll até a mensagem
    mensagemAlerta.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function exibirSucesso(mensagem) {
    mensagemAlerta.textContent = mensagem;
    mensagemAlerta.className = 'mensagem-alerta mensagem-sucesso';
    
    // Scroll até a mensagem
    mensagemAlerta.scrollIntoView({ behavior: 'smooth', block: 'start' });
}