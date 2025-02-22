// Cria referência ao form e elementos de resposta do programa
const frm = document.querySelector("form");
const resp1 = document.querySelector("h3");
const resp2 = document.querySelector("h4");

// Cria um "ouvinte" de evento, acionado quando o botão submit for clicado
frm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o envio do Form
  const nome = frm.inNome.value; // Obtém os valores do Form
  const nota1 = Number(frm.inNota1.value);
  const nota2 = Number(frm.inNota2.value);
  const media = (nota1 + nota2) / 2; // Calcula a média das notas
  resp1.innerText = `Média das Notas ${media.toFixed(2)}`;
  // Cria as condições
  if (media >= 7) {
    // Altera o texto e estilo da cor do elemento resp2
    resp2.innerText = `Parabéns ${nome}! Você foi aprovado(a)`;
    resp2.style.color = "green";
  } else if (media >= 4) {
    resp2.innerText = `Atenção ${nome}. Você está em análise`;
    resp2.style.color = "blue";
  } else {
    resp2.innerText = `Ops ${nome}... Você foi reprovado(a)`;
    resp2.style.color = "red";
  }
});
