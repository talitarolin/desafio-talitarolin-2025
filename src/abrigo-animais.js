const ANIMAIS = {
  REX:   { especie: 'cao',    brinquedos: ['RATO', 'BOLA'] },
  MIMI:  { especie: 'gato',   brinquedos: ['BOLA', 'LASER'] },
  FOFO:  { especie: 'gato',   brinquedos: ['BOLA', 'RATO', 'LASER'] },
  ZERO:  { especie: 'gato',   brinquedos: ['RATO', 'BOLA'] },
  BOLA:  { especie: 'cao',    brinquedos: ['CAIXA', 'NOVELO'] },
  BEBE:  { especie: 'cao',    brinquedos: ['LASER', 'RATO', 'BOLA'] },
  LOCO:  { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
};

const TODOS_BRINQUEDOS = Array.from(new Set(
  Object.values(ANIMAIS).flatMap(a => a.brinquedos)
));

const STATUS = {
  PESSOA1: 'pessoa 1',
  PESSOA2: 'pessoa 2',
  ABRIGO:  'abrigo'
};


const normalizarLista = str =>
  str ? str.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) : [];

const temDuplicatas = arr => {
  const vistos = new Set();
  for (const item of arr) {
    if (vistos.has(item)) return true;
    vistos.add(item);
  }
  return false;
};

const combinaNaOrdem = (pattern, source) => {
  let indice = 0;
  for (const s of source) {
    if (s === pattern[indice]) indice++;
    if (indice === pattern.length) return true;
  }
  return pattern.length === 0;
};

const validarBrinquedos = lista => !temDuplicatas(lista) && lista.every(b => TODOS_BRINQUEDOS.includes(b));

const validarAnimais = ordem => ordem.length && !temDuplicatas(ordem) && ordem.every(a => ANIMAIS[a]);

const podeAdotarAnimal = (colecaoPessoa, animalKey, ignorarOrdem = false) => {
  const brinquedosNecessarios = ANIMAIS[animalKey].brinquedos;
  return ignorarOrdem
    ? brinquedosNecessarios.every(b => colecaoPessoa.includes(b))
    : combinaNaOrdem(brinquedosNecessarios, colecaoPessoa);
};

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const colecao1 = normalizarLista(brinquedosPessoa1);
      const colecao2 = normalizarLista(brinquedosPessoa2);
      const ordem = normalizarLista(ordemAnimais);

      if (!validarBrinquedos(colecao1) || !validarBrinquedos(colecao2)) return { erro: 'Brinquedo inválido' };
      if (!validarAnimais(ordem)) return { erro: 'Animal inválido' };

      const adotados = {};
      const contagem = { [STATUS.PESSOA1]: 0, [STATUS.PESSOA2]: 0 };

      for (const animal of ordem) {
        const isLoco = animal === 'LOCO';
        const p1Pode = podeAdotarAnimal(colecao1, animal, isLoco);
        const p2Pode = podeAdotarAnimal(colecao2, animal, isLoco);

        if (p1Pode && p2Pode) {
          adotados[animal] = STATUS.ABRIGO;
          continue;
        }

        if (p1Pode && contagem[STATUS.PESSOA1] < 3) {
          adotados[animal] = (isLoco && contagem[STATUS.PESSOA1] === 0) ? STATUS.ABRIGO : STATUS.PESSOA1;
          if (adotados[animal] === STATUS.PESSOA1) contagem[STATUS.PESSOA1]++;
          continue;
        }

        if (p2Pode && contagem[STATUS.PESSOA2] < 3) {
          adotados[animal] = (isLoco && contagem[STATUS.PESSOA2] === 0) ? STATUS.ABRIGO : STATUS.PESSOA2;
          if (adotados[animal] === STATUS.PESSOA2) contagem[STATUS.PESSOA2]++;
          continue;
        }

        adotados[animal] = STATUS.ABRIGO;
      }

      const lista = Object.keys(adotados)
        .map(a => `${a[0] + a.slice(1).toLowerCase()} - ${adotados[a]}`)
        .sort((x, y) => x.split(' - ')[0].localeCompare(y.split(' - ')[0]));

      return { lista };

    } catch (e) {
      return { erro: 'Animal inválido' };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
