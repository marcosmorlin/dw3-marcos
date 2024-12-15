// tests/calculadora.test.js
const request = require('supertest');
const app = require('../server');

describe('Testando a API de calculadora', () => {
    test('Soma de dois números', async () => {
        const response = await request(app)
            .post('/calcular')
            .send({ operacao: 'soma', num1: 5, num2: 3 });
        expect(response.body.resultado).toBe(8);
    });

    test('Divisão por zero', async () => {
        const response = await request(app)
            .post('/calcular')
            .send({ operacao: 'divisao', num1: 5, num2: 0 });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Divisão por zero não é permitida");
    });
});
