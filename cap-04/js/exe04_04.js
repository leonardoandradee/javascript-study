// Cria referência ao form e elemento onde será exibida a resposta
const frm = document.querySelector("form");
const resp = document.querySelector("h3");

// "Ouvinte" de evento, acionado quando o botão submit for clicado
frm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Obtém e converte o conteúdo do campo inHoraBrasil
  const horaBrasil = Number(frm.inHoraBrasil.value);
  let horaFranca = horaBrasil + 5; // Calcula o horário na França
  if (horaFranca > 24) {
    // Se passar das 24 horas na frança
    horaFranca = horaFranca - 24; // ... Subtrai 24
  }
  // Exibe a resposta (altera o conteúdo do elemento h3 da página)
  resp.innerText = `Hora na França ${horaFranca.toFixed(2)}`;
});
