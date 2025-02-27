// Cria referência ao form e elemento onde será exibida a resposta
const frm = document.querySelector("form");
const resp = document.querySelector("h3");

// "Ouvinte" de evento, acionado quando o botão submit for clicado
frm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita envio do form

  const nome = frm.inNome.value; // Obtém valores do form
  const masculino = frm.inMasculino.checked;
  const altura = Number(frm.inAltura.value);

  /* let peso; // Declara a variável peso
  if (masculino) {
    // Se masculino (ou, if masculino == true)
    peso = 22 * Math.pow(altura, 2); // Math.pow eleva ao quadrado
  } else {
    peso = 21 * Math.pow(altura, 2);
  } */
    
  // Aplicando operador ternário para minificar o JS do if e else
  const peso = masculino ? 22 * Math.pow(altura, 2) : 21 * Math.pow(altura, 2);

  // Apresenta a resposta (altera o conteúdo do elemento h3 da página)
  resp.innerText = `${nome}: Seu peso ideal é ${peso.toFixed(3)} kg`;

  frm.addEventListener("reset", () => {
    resp.innerText = ""; // Limpa o conteúdo do elemento h3 que exibe a resposta
  });
});
