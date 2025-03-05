const frm = document.querySelector("form");
const resp = document.querySelector("h3");

frm.addEventListener("submit", (e) => {
  e.preventDefault();

  const velocidade1 = Number(frm.inPermitida.value);
  const velocidade2 = Number(frm.inCondutor.value);
  const tolerancia = velocidade1 * 1.2;

  if (velocidade2 <= velocidade1) {
    resp.innerText = `Situação: Sem Multa`;
  } else if (velocidade2 <= tolerancia) {
    resp.innerText = `Situação: Multa Leve`;
  } else {
    resp.innerText = `Situação: Multa Grave`;
  }
});
