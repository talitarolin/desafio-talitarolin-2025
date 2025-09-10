import { AbrigoAnimais } from './abrigo-animais.js';

describe('AbrigoAnimais - Testes de adoção', () => {

  const abrigo = new AbrigoAnimais();

  test('Pessoa 1 adota Rex, Fofo vai para o abrigo', () => {
    const result = abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(result).toEqual({
      lista: ['Fofo - abrigo', 'Rex - pessoa 1']
    });
  });

  test('Animal inexistente retorna erro', () => {
    const result = abrigo.encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(result).toEqual({ erro: 'Animal inválido' });
  });

  test('Brinquedo inválido retorna erro', () => {
    const result = abrigo.encontraPessoas('BOLA,ESPADA', 'RATO,NOVELO', 'Rex');
    expect(result).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Brinquedo duplicado retorna erro', () => {
    const result = abrigo.encontraPessoas('BOLA,BOLA', 'RATO,NOVELO', 'Rex');
    expect(result).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Empate entre pessoas leva o gato Mimi para o abrigo', () => {
    const result = abrigo.encontraPessoas('BOLA,LASER', 'BOLA,LASER', 'Mimi');
    expect(result).toEqual({ lista: ['Mimi - abrigo'] });
  });

  test('Pessoa não pode adotar mais de 3 animais', () => {
    const result = abrigo.encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER',
      'RATO,BOLA,CAIXA,NOVELO,LASER',
      'Rex,Bola,Bebe'
    );
    expect(result.lista.length).toBe(3);
  });

  test('Loco vai para o abrigo se não houver outro animal antes', () => {
    const result = abrigo.encontraPessoas('SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(result).toEqual({ lista: ['Loco - abrigo'] });
  });

});
