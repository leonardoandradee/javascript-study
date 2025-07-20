const form = document.getElementById("formAluno");
const resultado = document.getElementById("resultado");
const btnGerar = document.getElementById("gerarNotas");
const btnCadastrar = document.getElementById("btnCadastrar");
const containerNotas = document.getElementById("notasContainer");
const filtroStatus = document.getElementById("filtroStatus");
const ordenarPor = document.getElementById("ordenarPor");
const filtroNome = document.getElementById("filtroNome");
const btnLimparLista = document.getElementById("btnLimparLista");
const containerFiltroStatus = document.getElementById("containerFiltroStatus");
const containerOrdenarPor = document.getElementById("containerOrdenarPor");
const containerFiltroNome = document.getElementById("containerFiltroNome");
const graficoContainer = document.getElementById("graficoDesempenhoContainer");
const btnExportarCSV = document.getElementById("btnExportarCSV");
const btnExportarJSON = document.getElementById("btnExportarJSON");

filtroStatus.addEventListener("change", exibirRelatorio);
ordenarPor.addEventListener("change", exibirRelatorio);
filtroNome.addEventListener("input", exibirRelatorio);
btnExportarCSV.addEventListener("click", exportarCSV);
btnExportarJSON.addEventListener("click", exportarJSON);

btnLimparLista.addEventListener("click", () => {
  const confirmacao = confirm(
    "Tem certeza que deseja limpar toda a lista de alunos?"
  );
  if (confirmacao) {
    alunos = [];
    salvarAlunosNoLocalStorage();
    exibirRelatorio(); // Atualiza a interface
  }
});

// Array para armazenar múltiplos alunos
let alunos = []; // usamos "let" porque vamos reatribuir após carregar do localStorage

function salvarAlunosNoLocalStorage() {
  localStorage.setItem("alunos", JSON.stringify(alunos));
  controlarVisibilidadeFiltros();
}

function carregarAlunosDoLocalStorage() {
  const alunosSalvos = localStorage.getItem("alunos");
  if (alunosSalvos) {
    alunos = JSON.parse(alunosSalvos);
  } else {
    alunos = [];
  }
  controlarVisibilidadeFiltros();
  exibirRelatorio(); // mostra o relatório automaticamente
}

function validarNota(valor) {
  const valorFormatado = valor.toString().replace(",", ".");

  const numero = Number(valorFormatado);
  if (isNaN(numero)) return false;
  if (numero < 0 || numero > 10) return false;

  // Se for inteiro (sem parte decimal), ok
  if (Number.isInteger(numero)) return true;

  // Se tem casas decimais, aceita até 2
  const partes = valorFormatado.split(".");
  if (partes.length === 2 && partes[1].length <= 2) {
    return true;
  }

  return false;
}

// Função para esconder o botão de cadastrar
function esconderBotaoCadastrar() {
  btnCadastrar.disabled = true;
  btnCadastrar.style.display = "none";
}

// Função para mostrar o botão de cadastrar
function mostrarBotaoCadastrar() {
  btnCadastrar.disabled = false;
  btnCadastrar.style.display = "inline-block";
}

// Inicialmente esconde o botão
esconderBotaoCadastrar();

// Função para controlar a visibilidade dos filtros e botão limpar
function controlarVisibilidadeFiltros() {
  const temAlunos = alunos.length > 0;

  containerFiltroStatus.style.display = temAlunos ? "inline-block" : "none";
  containerOrdenarPor.style.display = temAlunos ? "inline-block" : "none";
  containerFiltroNome.style.display = temAlunos ? "inline-block" : "none";
  btnLimparLista.style.display = temAlunos ? "inline-block" : "none";
}

btnGerar.addEventListener("click", () => {
  containerNotas.innerHTML = "";
  esconderBotaoCadastrar();

  const qtd = parseInt(document.getElementById("quantidade").value);

  if (isNaN(qtd) || qtd <= 0) {
    alert("Informe uma quantidade válida de bimestres.");
    return;
  }

  // Cria um grid temporário para alinhar os wrappers
  const gridContainer = document.createElement("div");
  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = "1fr 1fr";
  gridContainer.style.gap = "1rem";

  for (let i = 1; i <= qtd; i++) {
    const label = document.createElement("label");
    label.setAttribute("for", `nota${i}`);
    label.textContent = `Nota do ${i}º Bimestre:`;

    const input = document.createElement("input");
    input.type = "number";
    input.name = `nota${i}`;
    input.id = `nota${i}`;
    input.min = 0;
    input.max = 10;
    input.step = 0.01;
    input.required = true;

    const wrapper = document.createElement("div");
    wrapper.classList.add("nota-wrapper");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.appendChild(label);
    wrapper.appendChild(input);

    gridContainer.appendChild(wrapper);
  }

  containerNotas.appendChild(gridContainer);
  mostrarBotaoCadastrar();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const qtd = parseInt(document.getElementById("quantidade").value);

  if (isNaN(qtd) || qtd <= 0) {
    alert("Você deve gerar os campos de nota primeiro.");
    return;
  }

  let soma = 0;
  const notas = [];

  for (let i = 1; i <= qtd; i++) {
    const notaInput = document.getElementById(`nota${i}`).value;

    if (!validarNota(notaInput)) {
      alert(
        `Nota ${i} inválida. Informe um número entre 0 e 10, com até 2 casas decimais.`
      );
      return;
    }

    const nota = Number(notaInput.toString().replace(",", "."));
    notas.push(nota);
    soma += nota;
  }

  let media = soma / qtd; // <-- Calcular média aqui

  let status = "";

  if (media >= 6) {
    status = "Aprovado";
  } else if (media >= 4) {
    status = "Recuperação";
  } else {
    status = "Reprovado";
  }

  const aluno = {
    nome,
    notas,
    media,
    status,
  };

  alunos.push(aluno);
  salvarAlunosNoLocalStorage();
  exibirRelatorio();
  form.reset();
  containerNotas.innerHTML = "";
  esconderBotaoCadastrar();
});

// Limpa resultado ao carregar
resultado.innerHTML = "";

// Função original para encontrar maior média no array completo
function encontrarIndiceMaiorMedia() {
  if (alunos.length === 0) return -1;

  let indiceMaior = 0;
  let maiorMedia = alunos[0].media;

  for (let i = 1; i < alunos.length; i++) {
    if (alunos[i].media > maiorMedia) {
      maiorMedia = alunos[i].media;
      indiceMaior = i;
    }
  }
  return indiceMaior;
}

// Função nova para encontrar maior média no array filtrado
function encontrarIndiceMaiorMediaFiltrado(lista) {
  if (lista.length === 0) return -1;

  let indiceMaior = 0;
  let maiorMedia = lista[0].media;

  for (let i = 1; i < lista.length; i++) {
    if (lista[i].media > maiorMedia) {
      maiorMedia = lista[i].media;
      indiceMaior = i;
    }
  }

  return indiceMaior;
}

let chartInstance = null; // guarda instância do gráfico

function atualizarGrafico(alunosFiltrados) {
  const ctx = document.getElementById("graficoDesempenho").getContext("2d");

  // Se já existir gráfico, destrói antes de criar outro
  if (chartInstance) {
    chartInstance.destroy();
  }

  const nomes = alunosFiltrados.map((aluno) => aluno.nome);
  const medias = alunosFiltrados.map((aluno) => Number(aluno.media.toFixed(2)));

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: nomes,
      datasets: [
        {
          label: "Média do Aluno",
          data: medias,
          backgroundColor: "rgba(0, 113, 188, 1)",
          borderColor: "rgba(0, 113, 188, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
    },
  });
}

function exibirRelatorio() {
  if (alunos.length === 0) {
    resultado.style.display = "none";
    resultado.innerHTML = "";
    graficoContainer.style.display = "none"; // esconde gráfico
    controlarVisibilidadeFiltros();
    return;
  }

  graficoContainer.style.display = "block"; // mostra gráfico quando há alunos

  // Filtrar
  let alunosFiltrados = alunos.slice(); // copia do array

  const statusSelecionado = filtroStatus.value;

  const statusMap = {
    aprovado: "Aprovado",
    recuperacao: "Recuperação",
    reprovado: "Reprovado",
  };

  if (statusSelecionado !== "todos") {
    const statusComparado = statusMap[statusSelecionado];
    alunosFiltrados = alunosFiltrados.filter(
      (aluno) => aluno.status === statusComparado
    );
  }

  // Filtro por nome
  const nomeBuscado = filtroNome.value.toLowerCase().trim();
  if (nomeBuscado !== "") {
    alunosFiltrados = alunosFiltrados.filter((aluno) =>
      aluno.nome.toLowerCase().includes(nomeBuscado)
    );
  }

  // Ordenar
  const ordenar = ordenarPor.value;
  if (ordenar === "nome") {
    alunosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (ordenar === "media") {
    alunosFiltrados.sort((a, b) => b.media - a.media);
  }

  // Atualizar índice do destaque (maior média do conjunto filtrado)
  const indiceDestaque = encontrarIndiceMaiorMediaFiltrado(alunosFiltrados);

  resultado.style.display = "block";

  let html = "<h2 style='text-align:center;'>Relatório Geral</h2>";
  html += '<div class="relatorio-grid">';

  alunosFiltrados.forEach((aluno, index) => {
    let statusClass = "";
    if (aluno.status === "Aprovado") {
      statusClass = "status-aprovado";
    } else if (aluno.status === "Recuperação") {
      statusClass = "status-recuperacao";
    } else {
      statusClass = "status-reprovado";
    }

    // Para pegar o índice original no array alunos, usamos:
    const indiceOriginal = alunos.indexOf(aluno);

    const destaqueClass = index === indiceDestaque ? "aluno-destaque" : "";
    const estrela = index === indiceDestaque ? " ⭐" : "";

    html += `
    <div class="aluno-relatorio ${destaqueClass}">
        <p><strong>Aluno ${index + 1}: ${aluno.nome}${estrela}</strong></p>
        <p>Notas: ${aluno.notas
          .map((n) => n.toFixed(2).replace(".", ","))
          .join(", ")}</p>
        <p>Média: ${aluno.media.toFixed(2).replace(".", ",")}</p>
        <p>Status: <strong class="${statusClass}">${aluno.status}</strong></p>
        <div class="botoes-acao">
          <button onclick="editarAluno(${indiceOriginal})">Editar</button>
          <button onclick="excluirAluno(${indiceOriginal})">Excluir</button>
        </div>
    </div>
  `;
  });

  html += "</div>";
  resultado.innerHTML = html;

  // Atualiza o gráfico com os alunos filtrados
  atualizarGrafico(alunosFiltrados);
}

function excluirAluno(index) {
  if (
    confirm(`Tem certeza que deseja excluir o aluno "${alunos[index].nome}"?`)
  ) {
    alunos.splice(index, 1); // remove do array
    salvarAlunosNoLocalStorage();
    exibirRelatorio(); // atualiza visualmente
  }
}

function editarAluno(index) {
  const aluno = alunos[index];

  // Preenche os dados no formulário
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("quantidade").value = aluno.notas.length;

  // Gera os campos de nota novamente
  btnGerar.click(); // simula clique no botão de gerar notas

  // Espera um pequeno tempo para garantir que os inputs foram criados
  setTimeout(() => {
    aluno.notas.forEach((nota, i) => {
      document.getElementById(`nota${i + 1}`).value = nota;
    });

    // Remove o aluno atual do array (vamos substituí-lo ao enviar novamente)
    alunos.splice(index, 1);
    salvarAlunosNoLocalStorage();
    exibirRelatorio(); // atualiza visualmente

    mostrarBotaoCadastrar();
  }, 100);
}

window.onload = function () {
  carregarAlunosDoLocalStorage();
};

function exportarCSV() {
  if (alunos.length === 0) {
    alert("Não há alunos para exportar.");
    return;
  }

  function csvEscape(text) {
    if (typeof text !== "string") {
      text = String(text);
    }
    text = text.replace(/"/g, '""');
    return `"${text}"`;
  }

  let csv = "Nome;Notas;Média;Status\n";

  alunos.forEach((aluno) => {
    const notasStr = aluno.notas
      .map((n) => n.toFixed(2).replace(".", ","))
      .join(", ");

    const linha =
      csvEscape(aluno.nome) +
      ";" +
      csvEscape(notasStr) +
      ";" +
      csvEscape(aluno.media.toFixed(2).replace(".", ",")) +
      ";" +
      csvEscape(aluno.status) +
      "\n";

    csv += linha;
  });

  const BOM = "\uFEFF"; // BOM para UTF-8
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "alunos_boletim.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportarJSON() {
  if (alunos.length === 0) {
    alert("Não há alunos para exportar.");
    return;
  }

  const jsonStr = JSON.stringify(alunos, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "alunos_boletim.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
