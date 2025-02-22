const frm = document.querySelector("form");
const resp1 = document.querySelector("h3");
const resp2 = document.querySelector("h4");

frm.addEventListener("submit", (e) => {
  const medicamento = frm.inMedicamento.value;
  const precoMedicamento = Number(frm.inPrecoMedicamento.value);

  const preco = Math.floor(precoMedicamento * 2);

  resp1.innerText = `Promoção de ${medicamento}`;
  resp2.innerText = `Leve 2 por apenas: R$ ${preco.toFixed(0)}`;

  e.preventDefault();
});
