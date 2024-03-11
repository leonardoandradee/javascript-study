// Cria referência ao form e ao elemento H3 (onde será exibida a resposta)
const frm = document.querySelector("form");
const resp = document.querySelector("h3");

// Cria um "ouvinte" de evento, acionado quando o botão submit for clicado
frm.addEventListener("submit", (e) => {
  const nome = frm.inNome.value; // Obtém o nome digitado no form
  resp.innerText = `Olá ${nome}!`; // Exibe a resposta do programa
  e.preventDefault(); // Evita envio do form
});

/* 
    const resp = document.querySelector("h3")  // Primeiro elemento h3 da página
    const cor = document.querySelector("#inCor") // Elemento com Id = inCor
    const lista = document.querySelector(".lista") // Elemento da class = lista
*/
