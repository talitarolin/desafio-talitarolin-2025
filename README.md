# Abrigo de Animais 🐶

Simulação de adoção de animais em um abrigo, considerando brinquedos desejados, limites de adoção por pessoa e regras especiais.

---

## Descrição do Projeto

O projeto implementa a classe `AbrigoAnimais`, que permite determinar **quem pode adotar cada animal** com base nos brinquedos que cada pessoa possui. O código se destaca por:

1. **Validação robusta e modular**  
   - Verifica duplicatas, brinquedos inválidos e animais inválidos antes de processar a lógica de adoção.  
   - Funções modulares como `validarBrinquedos` e `validarAnimais` tornam o código reutilizável e fácil de manter.

2. **Suporte a regras especiais**  
   - O animal `LOCO` possui regras específicas: só vai para o abrigo se certas condições forem atendidas.  
   - Cada pessoa pode adotar no máximo **3 animais**, mantendo prioridade clara.

3. **Flexibilidade na lógica de correspondência**  
   - Função `podeAdotarAnimal` permite verificar se os brinquedos de uma pessoa seguem a ordem desejada ou podem ser desconsiderados, permitindo regras de subsequência ou simples presença.  

4. **Legibilidade e manutenção**  
   - Nomes descritivos como `combinaNaOrdem`, `temDuplicatas` e `podeAdotarAnimal` facilitam a compreensão.  
   - Código modularizado com funções de propósito único facilita testes unitários e refatoração.

5. **Formatação e apresentação dos resultados**  
   - A lista final é formatada como `Animal - Destino` e ordenada alfabeticamente, facilitando leitura e integração com front-end ou relatórios.

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/talitarolin/desafio-talitarolin-2025.git
cd desafio-talitarolin-2025


### INSTALANDO E RODANDO NA SUA MÁQUINA
1. Instalar o [Node](https://nodejs.org/en/)
2. Instalar dependencias do projeto com o seguinte comando:
```bash
npm install
```

### Uso

Exemplo básico de uso:

```bash
import { AbrigoAnimais } from './abrigo-animais.js';

const abrigo = new AbrigoAnimais();

const resultado = abrigo.encontraPessoas(
  'RATO,BOLA',          // brinquedos da pessoa 1
  'RATO,NOVELO',        // brinquedos da pessoa 2
  'Rex,Fofo'            // ordem dos animais
);

console.log(resultado);

```
Saída esperada:

```bash
{
  "lista": ["Fofo - abrigo", "Rex - pessoa 1"]
}
```

###Testes

O projeto utiliza Jest para testes unitários.

Instale Jest (se ainda não estiver instalado):

```bash
npm install --save-dev jest
```
Execute os testes:

```bash
npm test
```


### Os testes cobrem:

- Casos válidos de adoção;
- Animais inexistentes;
- Brinquedos inválidos;
- Brinquedos duplicados;
- Empates entre pessoas;
- Limite de 3 animais por pessoa;
- Regras especiais do animal LOCO.

Observação: durante testes atuais, algumas linhas específicas (como adoção pela pessoa 2 e o bloco catch) podem não ser acionadas se nenhum cenário específico ocorrer, mas fazem parte de uma parte adicional pensada na robustez do código para tratamento de exceções.

### Estrutura do Projeto

```bash
abrigo-animais/
├─ abrigo-animais.js       # Classe principal
├─ abrigo-animais.test.js  # Testes unitários
├─ package.json            # Dependências e scripts
└─ README.md               # Este arquivo
```

### Contribuição

Pull requests são bem-vindos! <3

Sinta-se à vontade para sugerir melhorias na lógica de adoção, testes adicionais ou documentação. 
