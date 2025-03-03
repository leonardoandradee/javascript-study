const frm = document.querySelector("form"); // Obtém elementos da página
const resp = document.querySelector("h3");

frm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita envio do form
  const numero = Number(frm.inNumero.value); // Obtém número digitado no form
  const raiz = Math.sqrt(numero); // Calcula raiz quadrada do número
  if (Number.isInteger(raiz)) {
    // Se valor da raiz for um número inteiro
    resp.innerText = `Raiz: ${raiz}`; // ... Mostra a raiz
  } else {
    // Senão,
    resp.innerText = `Não há raiz exata para ${numero}`; // ... Mostra mensagem
  }
});
