
class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };

    this.todosBrinquedos = new Set(
      Object.values(this.animais).flatMap(a => a.brinquedos)
    );
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const p1 = this._parseBrinquedos(brinquedosPessoa1);
      const p2 = this._parseBrinquedos(brinquedosPessoa2);

      const animaisOrdem = ordemAnimais.split(',').map(a => a.trim());

      // valida animais
      if (new Set(animaisOrdem).size !== animaisOrdem.length) {
        return { erro: 'Animal inválido' };
      }
      for (let a of animaisOrdem) {
        if (!this.animais[a]) return { erro: 'Animal inválido' };
      }

      let resultado = [];
      let adotadosP1 = 0;
      let adotadosP2 = 0;
      let locoAcompanhado = false;

      for (let animalNome of animaisOrdem) {
        const animal = this.animais[animalNome];

        let p1Ok = this._podeAdotar(animalNome, p1);
        let p2Ok = this._podeAdotar(animalNome, p2);

        if (animalNome === 'Loco') {

          if ((p1Ok || p2Ok) && locoAcompanhado) {
            if (p1Ok && adotadosP1 < 3) {
              adotadosP1++;
              resultado.push(`${animalNome} - pessoa 1`);
            } else if (p2Ok && adotadosP2 < 3) {
              adotadosP2++;
              resultado.push(`${animalNome} - pessoa 2`);
            } else {
              resultado.push(`${animalNome} - abrigo`);
            }
          } else {
            resultado.push(`${animalNome} - abrigo`);
          }
          continue;
        }

        if (p1Ok && p2Ok) {
          resultado.push(`${animalNome} - abrigo`);
        } else if (p1Ok && adotadosP1 < 3) {
          adotadosP1++;
          resultado.push(`${animalNome} - pessoa 1`);
          locoAcompanhado = true;
        } else if (p2Ok && adotadosP2 < 3) {
          adotadosP2++;
          resultado.push(`${animalNome} - pessoa 2`);
          locoAcompanhado = true;
        } else {
          resultado.push(`${animalNome} - abrigo`);
        }
      }

      return { lista: resultado.sort() };
    } catch (e) {
      return { erro: e.message };
    }
  }

  _parseBrinquedos(txt) {
    const lista = txt.split(',').map(b => b.trim());
    if (new Set(lista).size !== lista.length) {
      throw new Error('Brinquedo inválido');
    }
    for (let b of lista) {
      if (!this.todosBrinquedos.has(b)) {
        throw new Error('Brinquedo inválido');
      }
    }
    return lista;
  }

  _podeAdotar(animalNome, brinquedosPessoa) {
    const animal = this.animais[animalNome];

    if (animalNome === 'Loco') return true;

    const favoritos = animal.brinquedos;
    let i = 0;

    for (let b of brinquedosPessoa) {
      if (b === favoritos[i]) i++;
      if (i === favoritos.length) return true;
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
