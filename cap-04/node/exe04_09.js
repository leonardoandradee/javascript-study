const prompt = require("prompt-sync")() // Adiciona pacote prompt-sync
const numero = Number(prompt("Número (centena): ")) // Lê o número
if (numero < 100 || numero >= 1000) {
    console.log("Erro... deve ser uma centena")
    return
}
const num1 = Math.floor(numero / 100) // Obtém 1º número
const sobra = numero % 100 // O que sobra (dezena)
const num2 = Math.floor(sobra / 10) // Obtém 2º número
const num3 = sobra % 10 // Obtém 3º número
console.log(`Invertido: ${num3}${num2}${num1}`) // Exibe o número invertido