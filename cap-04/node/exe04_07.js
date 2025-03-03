const prompt = require("prompt-sync")() // Adiciona pacote prompt-sync
const pessoas = Number(prompt("Nº Pessoas: ")) // Lê dados de entrada
const peixes = Number(prompt("Nº Peixes: "))
let pagar // Declada variável pagar
if (peixes <= pessoas) { // Condição definida no exemplo
    pagar = pessoas * 20
} else {
    pagar = (pessoas * 20) + ((peixes - pessoas) * 12)
}
console.log(`Pagar R$: ${pagar.toFixed(2)}`) // Exibe o valor a ser pago