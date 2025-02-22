const frm = document.querySelector("form");
const resp1 = document.querySelector("h3");

frm.addEventListener("submit", (e) => {
  const valorMin = Number(frm.inValorMin.value);
  const tempo = Number(frm.inTempo.value);

  const valor15 = Math.ceil(tempo / 15);
  const pagar = valor15 * valorMin;

  resp1.innerText = `Valor a Pagar R$: ${pagar.toFixed(2)}`;

  e.preventDefault();
});
