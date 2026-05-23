/* Código JavaScript para o rodapé realizado por Eduardo Alcantara */

const btnSobre = document.getElementById("abrir-sobre");
const btnPolitica = document.getElementById("abrir-politica");
const btnTermos = document.getElementById("abrir-termos");

const modalSobre = document.getElementById("modal-sobre");
const modalPolitica = document.getElementById("modal-politica");
const modalTermos = document.getElementById("modal-termos");

btnSobre.addEventListener("click", (event) => {
  event.preventDefault();
  modalSobre.style.display = "flex";
});

btnPolitica.addEventListener("click", (event) => {
  event.preventDefault();
  modalPolitica.style.display = "flex";
});

btnTermos.addEventListener("click", (event) => {
  event.preventDefault();
  modalTermos.style.display = "flex";
});

const fechar = document.querySelectorAll(".fechar");

fechar.forEach((botao) => {
  botao.addEventListener("click", () => {
    modalSobre.style.display = "none";
    modalPolitica.style.display = "none";
    modalTermos.style.display = "none";
  });
});
