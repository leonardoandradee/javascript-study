const frm = document.querySelector("form");
const resp1 = document.querySelector("#outResp1");
const resp2 = document.querySelector("#outResp2");
const resp3 = document.querySelector("#outResp3");

frm.addEventListener("submit", (e) => {
  // "Escuta" evento submit do form
  e.preventDefault(); // Evita envio do form
  const saque = Number(frm.inSaque.value); // Obtém valor do saque
  if (saque % 10 != 0) {
    // Se saque não é múltiplo de 10
    alert("Valor inválido para notas disponíveis (R$ 10, 50, 100");
    frm.inSaque.focus();
    return;
  }
  const notasCem = Math.floor(saque / 100); // Calcula notas de 100
  let resto = saque % 100; // Quanto sobra para pagar
  const notasCinquenta = Math.floor(resto / 50); // Calcula notas de 50
  resto = resto % 50; // Quanto ainda sobra
  const notasDez = Math.floor(resto / 10); // Calcula notas de 10
  if (notasCem > 0) {
    // Exibe as notas se houver
    resp1.innerText = `Notas de R$ 100: ${notasCem}`;
  }
  if (notasCinquenta > 0) {
    resp2.innerText = `Notas de R$ 50: ${notasCinquenta}`;
  }
  if (notasDez > 0) {
    resp3.innerText = `Notas de R$ 10: ${notasDez}`;
  }
});
