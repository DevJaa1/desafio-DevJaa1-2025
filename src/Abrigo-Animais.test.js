import { AbrigoAnimais } from './abrigoanimais.js';



test('Rex deve ser adotado pela pessoa 1, Fofo vai para o abrigo', () => {
  const abrigo = new AbrigoAnimais();
  const result = abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
  expect(result).toEqual({ lista: ['Fofo - abrigo', 'Rex - pessoa 1'] });
});

test('Animal inválido deve retornar erro', () => {
  const abrigo = new AbrigoAnimais();
  const result = abrigo.encontraPessoas('CAIXA,RATO','RATO,BOLA', 'Lulu');
  expect(result).toEqual({ erro: 'Animal inválido' });
});
