// Carrinho lateral 

const btnCarrinho = document.querySelector("#btn-carrinho");
const btnFechar = document.querySelector("#btn-fechar-carrinho");
const carrinhoLateral = document.querySelector("#carrinho-lateral");
const carrinhoOverlay = document.querySelector("#carrinho-overlay");
const carrinhoItens = document.querySelector("#carrinho-itens");
const totalPreco = document.querySelector("#total-preco");
const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

// Carregar do localStorage
let carrinho = LocalStorageManager.carregarCarrinho();
console.log('📦 Carrinho carregado:', carrinho);

console.log("btnCarrinho:", btnCarrinho);
console.log("btnFechar:", btnFechar);
console.log("carrinhoLateral:", carrinhoLateral);
console.log("botoesAdicionar:", botoesAdicionar.length);

// Abrir carrinho
if (btnCarrinho) {
  btnCarrinho.addEventListener("click", () => {
    console.log("Botão carrinho clicado!");
    carrinhoLateral.classList.add("ativo");
    carrinhoOverlay.classList.add("ativo");
  });
}

// Fechar carrinho (botão X)
if (btnFechar) {
  btnFechar.addEventListener("click", () => {
    console.log("Botão fechar clicado!");
    carrinhoLateral.classList.remove("ativo");
    carrinhoOverlay.classList.remove("ativo");
  });
}

// Fechar carrinho clicando na overlay
if (carrinhoOverlay) {
  carrinhoOverlay.addEventListener("click", () => {
    console.log("Overlay clicada!");
    carrinhoLateral.classList.remove("ativo");
    carrinhoOverlay.classList.remove("ativo");
  });
}

// Adicionar produto ao carrinho
console.log("Procurando botões de adicionar...");
botoesAdicionar.forEach((botao, i) => {
  console.log(`Botão ${i}:`, botao);
  botao.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);

    console.log(`Produto adicionado: ${nome} - R$ ${preco}`);

    // Usar a classe para adicionar
    LocalStorageManager.adicionarAoCarrinho(nome, preco);
    carrinho = LocalStorageManager.carregarCarrinho();

    atualizarCarrinho();

    // Feedback visual
    alert(`${nome} adicionado ao carrinho! ✅`);
  });
});

// Atualizar carrinho
function atualizarCarrinho() {
  carrinhoItens.innerHTML = "";

  if (carrinho.length === 0) {
    carrinhoItens.innerHTML =
      '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
    totalPreco.textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const itemHTML = `
            <div class="item-carrinho">
                <div class="item-info">
                    <h4>${item.nome}</h4>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                </div>
                
                <div class="item-quantidade">
                    <button class="btn-quantidade" onclick="diminuirQuantidade(${index})">−</button>
                    <span class="quantidade-valor">${item.quantidade}</span>
                    <button class="btn-quantidade" onclick="aumentarQuantidade(${index})">+</button>
                </div>
                
                <button class="btn-remover" onclick="removerItem(${item.id})">🗑️</button>
            </div>
        `;

    carrinhoItens.innerHTML += itemHTML;
  });

  totalPreco.textContent = `R$ ${total.toFixed(2)}`;

  // Salvar após atualizar
  LocalStorageManager.salvarCarrinho(carrinho);
}

// Aumentar quantidade
function aumentarQuantidade(index) {
  carrinho[index].quantidade += 1;
  atualizarCarrinho();
}

// Diminuir quantidade
function diminuirQuantidade(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade -= 1;
  } else {
    removerItem(carrinho[index].id);
    return;
  }
  atualizarCarrinho();
}

// Remover item 
function removerItem(id) {
  // Usar a classe para remover
  LocalStorageManager.removerDoCarrinho(id);
  carrinho = LocalStorageManager.carregarCarrinho();
  atualizarCarrinho();
}

// Script todo do hero banner
const hero = document.querySelector(".hero");

let index = 0;

// Hero imagens mudando
const images = [
  // lista de imagens que coloquei no hero banner
  "assets/images/academia.jpg",
  "assets/images/academia2.jpg",
  "assets/images/academia3.jpg",
];

function changeImage() {
  hero.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url(${images[index]})
    `;

  index++;
  if (index >= images.length) {
    index = 0;
  }
}

setInterval(changeImage, 5000);

changeImage();


// Hero dots (Bolinhas para trocar de imagem)
const dots = document.querySelectorAll(".dot");

function updatedots() {
  dots.forEach((dot) => dot.classList.remove("active")); // Essa função mostra qual dot está ativo
  dots[index].classList.add("active");
}

dots.forEach((dot, idx) => {
  // Essa função ela adiciona o evento de clickar nos dots
  dot.addEventListener("click", () => {
    index = idx;
    changeImage();
    updatedots();
  });
});

updatedots();
