const frm = document.querySelector("form");
const resp1 = document.querySelector("#outResp1");
const resp2 = document.querySelector("#outResp2");

frm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ladoA = Number(frm.inLadoA.value);
  const ladoB = Number(frm.inLadoB.value);
  const ladoC = Number(frm.inLadoC.value);

  if (ladoA + ladoB > ladoC && ladoA + ladoC > ladoB && ladoB + ladoC > ladoA) {
    resp1.innerText = `Os lados formam um triângulo.`;
    if (ladoA === ladoB && ladoB === ladoC) {
      resp2.innerText = `Tipo: Equilátero (todos os lados iguais)`;
    } else if (ladoA === ladoB || ladoA === ladoC || ladoB === ladoC) {
      resp2.innerText = `Tipo: Isósceles (dois lados iguais)`;
    } else {
      resp2.innerText = `Tipo: Escaleno (todos os lados diferentes)`;
    }
  } else {
    resp1.innerText = `Os lados formam um triângulo.`;
  }
});
