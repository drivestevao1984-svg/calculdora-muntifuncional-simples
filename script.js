// ==========================================================================
// 1. BLOQUEIO DE CARACTERES INVÁLIDOS (LETRAS) COM MENSAGEM DE ERRO
// ==========================================================================
document.addEventListener('input', function(e) {
    // Executa a validação apenas nos campos num1 e num2
    if (e.target && (e.target.id === 'num1' || e.target.id === 'num2')) {
        let campo = e.target;
        let valorOriginal = campo.value;
        const nomeCampo = campo.id === 'num1' ? "Número 1" : "Número 2";

        // Verifica se existe qualquer caractere que NÃO seja número, ponto, vírgula ou hífen
        if (/[^0-9.,-]/.test(valorOriginal)) 
            // Dispara o pop-up de alerta na tela
            alert("Erro: Caractere inválido detectado no campo " + nomeCampo + "! Use apenas números.");
            
            // Remove o caractere inválido imediatamente do campo
            valorOriginal = valorOriginal.replace(/[^0-9.,-]/g, '');
        }

        // Garante que o sinal de menos (-) só exista na primeira posição
        if (valorOriginal.indexOf('-') > 0) {
            valorOriginal = valorOriginal.substring(0, valorOriginal.indexOf('-')) + 
                            valorOriginal.substring(valorOriginal.indexOf('-') + 1);
        }

        // Permite apenas um único separador decimal (ponto ou vírgula)
        const primeiroSeparador = valorOriginal.match(/[.,]/);
        if (primeiroSeparador) {
            const indexPrimeiro = valorOriginal.indexOf(primeiroSeparador);
            valorOriginal = valorOriginal.substring(0, indexPrimeiro + 1) + 
                            valorOriginal.substring(indexPrimeiro + 1).replace(/[.,]/g, '');
        }

        campo.value = valorOriginal;
    }
});


// ==========================================================================
// 2. MOTOR DE CÁLCULO E TRATAMENTO DE ERRO DE DIVISÃO POR ZERO
// ==========================================================================
document.getElementById('calculate-btn').addEventListener('click', function() {
    let rawNum1 = document.getElementById('num1').value;
    let rawNum2 = document.getElementById('num2').value;
    
    // Substitui vírgulas por pontos para o interpretador do JavaScript
    rawNum1 = rawNum1.replace(',', '.');
    rawNum2 = rawNum2.replace(',', '.');

    const num1 = parseFloat(rawNum1);
    const num2 = parseFloat(rawNum2);
    
    const operation = document.getElementById('operation').value;
    const resultSpan = document.getElementById('result-value');
    
    let resultado = 0;

    // Validação se o campo de operação estiver vazio
    if (!operation) {
        resultSpan.textContent = "Selecione!";
        return;
    }

    if (isNaN(num1)) {
        resultSpan.textContent = "N1 inválido";
        return;
    }

    switch (operation) {
        case 'soma':
            resultado = num1 + (isNaN(num2) ? 0 : num2);
            break;
        case 'subtracao':
            resultado = num1 - (isNaN(num2) ? 0 : num2);
            break;
        case 'multiplicacao':
            resultado = num1 * (isNaN(num2) ? 1 : num2);
            break;
        case 'divisao':
            // VALIDAÇÃO DA DIVISÃO POR ZERO: Dispara o pop-up e interrompe o cálculo
            if (num2 === 0) {
                alert("Erro: Não é possível dividir por zero!");
                resultSpan.textContent = "Erro (Div/0)";
                return;
            }
            resultado = num1 / num2;
            break;
        case 'potenciacao':
            const expoente = isNaN(num2) ? 2 : num2;
            resultado = Math.pow(num1, expoente);
            break;
        case 'radiciacao':
            const indice = isNaN(num2) ? 2 : num2;
            if (num1 < 0 && indice % 2 === 0) {
                resultSpan.textContent = "Raiz Negativa";
                return;
            }
            resultado = Math.pow(num1, 1 / indice);
            break;
        default:
            resultado = 0;
    }

    if (!isNaN(resultado)) {
        let finalValue = Number(resultado.toFixed(4)).toString();
        resultSpan.textContent = finalValue.replace('.', ',');
    }
});
s