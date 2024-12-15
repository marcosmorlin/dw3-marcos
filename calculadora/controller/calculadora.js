fSoma(num1Par, num2Par){
    return n1 + n2;
}

fSubtracao(num1Par, num2Par){
    return n1 - n2;
}

fDivisao(num1Par, num2Par){
    return n1 * n2;
}

fMulti(num1Par, num2Par){
    return n1 / n2;
}

fCalculo (request, res) =>{
    const { operacao, num1, num2 } = request.body;

    let resultado;
    try {
        switch (operacao) {
            case 'soma':
                resultado = fSoma(num1, num2);
                break;
            case 'subtracao':
                resultado = fSubtracao(num1, num2);
                break;
            case 'multiplicacao':
                resultado = fMultiplicacao(num1, num2);
                break;
            case 'divisao':
                resultado = fDivisao(num1, num2);
                break;
            default:
                return res.status(400).send("Operação inválida");
        }
        res.json({ resultado });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { fSoma, fSubtracao, fMultiplicacao, fDivisao, fCalculo };