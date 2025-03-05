const frm = document.querySelector("form");
const resp1 = document.querySelector("#outResp1");
const resp2 = document.querySelector("#outResp2");

frm.addEventListener("submit", (e) => {
    e.preventDefault()

    const valor = Number(frm.inValor.value)
    const temp1 = 1.00
    const temp2 = 1.75
    const temp3 = 3.00

    if (valor < temp1) {
        resp1.innerText = `Valor Insuficiente.`
        frm.inValor.focus()
        return
    }

    if (valor >= 3.00) {
        resp1.innerText = `Tempo: 120 min`
        resp2.innerText = `Troco R$: ${valor - temp3.toFixed(2)}`
    } else if (valor >= 1.75) {
        resp1.innerText = `Tempo: 60 min`
        resp2.innerText = `Troco R$: ${valor - temp2.toFixed(2)}`
    } else {
        resp1.innerText = `Tempo: 30 min`
        resp2.innerText = `Troco R$: ${valor - temp1.toFixed(2)}`
    }
})
