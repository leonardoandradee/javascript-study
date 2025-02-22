const frm = document.querySelector("form");
const resp1 = document.querySelector("#outResp1");
const resp2 = document.querySelector("#outResp2");

frm.addEventListener("submit", (e) => {
  const produto = frm.inProduto.value;
  const preco = frm.inPreco.value;

  const total = 2 * preco + preco * 0.5;
  const desconto = preco * 0.5;

  resp1.innerText = `${produto} - Promoção: Leve 3 por R$ ${total.toFixed(2)}`;
  resp2.innerText = `O 3º produto custa apenas R$: ${desconto.toFixed(2)}`;

  e.preventDefault();
});
