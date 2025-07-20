const prompt = require("prompt-sync")();
const fs = require("fs");

const totalBimestres = Number(prompt("Quantos bimestres a turma possui? "));
const alunos = [];

let continuar = true;

while (continuar) {
  const nome = prompt("Digite o nome do aluno: ");
  const notas = [];

  for (let i = 0; i < totalBimestres; i++) {
    let notaValida = false;
    let nota;

    while (!notaValida) {
      nota = Number(prompt(`Digite a nota do ${i + 1}º bimestre (0 a 10): `));

      if (nota >= 0 && nota <= 10) {
        notaValida = true;
      } else {
        console.log("Nota inválida! Digite um valor entre 0 e 10.");
      }
    }

    notas.push(nota);
  }

  // Calcula a média
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  const media = soma / totalBimestres;

  // Define situação
  let situacao = "";
  if (media >= 9) {
    situacao = "Aprovado com mérito";
  } else if (media >= 6) {
    situacao = "Aprovado";
  } else {
    situacao = "Reprovado";
  }

  // Salva os dados do aluno no array
  alunos.push({
    nome: nome,
    notas: notas,
    media: media.toFixed(2),
    situacao: situacao,
  });

  // Pergunta se deseja continuar
  const resposta = prompt(
    "Deseja cadastrar outro aluno? (s/n): "
  ).toLowerCase();
  if (resposta !== "s") {
    continuar = false;
  }

  console.log(); // linha em branco
}

// Mostra o relatório final
console.log("\n--- RELATÓRIO FINAL ---");
for (let i = 0; i < alunos.length; i++) {
  const aluno = alunos[i];
  console.log(`\nAluno: ${aluno.nome}`);
  for (let j = 0; j < aluno.notas.length; j++) {
    console.log(`${j + 1}º Bimestre: ${aluno.notas[j]}`);
  }
  console.log(`Média final: ${aluno.media}`);
  console.log(`Situação: ${aluno.situacao}`);
}

// Resumo geral
let aprovados = 0;
let comMerito = 0;
let reprovados = 0;

for (let i = 0; i < alunos.length; i++) {
  const situacao = alunos[i].situacao;
  if (situacao === "Aprovado com mérito") {
    comMerito++;
  } else if (situacao === "Aprovado") {
    aprovados++;
  } else if (situacao === "Reprovado") {
    reprovados++;
  }
}

console.log("\n--- RESUMO ---");
console.log(`Total de alunos: ${alunos.length}`);
console.log(`Aprovados com mérito: ${comMerito}`);
console.log(`Aprovados: ${aprovados}`);
console.log(`Reprovados: ${reprovados}`);

// Maior Média
let maiorMedia = 0;
let melhorAluno = "";

for (let i = 0; i < alunos.length; i++) {
  const mediaAtual = Number(alunos[i].media);
  if (mediaAtual > maiorMedia) {
    maiorMedia = mediaAtual;
    melhorAluno = alunos[i].nome;
  }
}

console.log(
  `\nAluno com a maior média: ${melhorAluno} (${maiorMedia.toFixed(2)})`
);

// Salvar relatório
let relatorio = "--- RELATÓRIO FINAL ---\n";

for (let i = 0; i < alunos.length; i++) {
  const aluno = alunos[i];
  relatorio += `\nAluno: ${aluno.nome}\n`;
  for (let j = 0; j < aluno.notas.length; j++) {
    relatorio += `${j + 1}º Bimestre: ${aluno.notas[j]}\n`;
  }
  relatorio += `Média final: ${aluno.media}\n`;
  relatorio += `Situação: ${aluno.situacao}\n`;
}

relatorio += "\n--- RESUMO ---\n";
relatorio += `Total de alunos: ${alunos.length}\n`;
relatorio += `Aprovados com mérito: ${comMerito}\n`;
relatorio += `Aprovados: ${aprovados}\n`;
relatorio += `Reprovados: ${reprovados}\n`;
relatorio += `\nAluno com a maior média: ${melhorAluno} (${maiorMedia.toFixed(
  2
)})\n`;

fs.writeFileSync("relatorio_final.txt", relatorio);

console.log("\nRelatório salvo como 'relatorio_final.txt'");
