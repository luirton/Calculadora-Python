/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Copy,
  Check,
  Download,
  Play,
  RotateCcw,
  BookOpen,
  Code2,
  GitBranch,
  AlertTriangle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const PYTHON_CODE = `# Importa o módulo 'math' da biblioteca padrão do Python para cálculos matemáticos
import math


def somar(a: float, b: float) -> float:
    """Retorna a soma de dois números."""
    # Soma o primeiro número (a) com o segundo número (b) e devolve o resultado
    return a + b


def subtrair(a: float, b: float) -> float:
    """Retorna a subtração de dois números."""
    # Subtrai o segundo número (b) do primeiro número (a) e devolve o resultado
    return a - b


def multiplicar(a: float, b: float) -> float:
    """Retorna a multiplicação de dois números."""
    # Multiplica o primeiro número (a) pelo segundo número (b) e devolve o resultado
    return a * b


def dividir(a: float, b: float) -> float:
    """Retorna a divisão de dois números, tratando divisão por zero."""
    # Verifica se o divisor (b) é igual a zero antes de dividir
    if b == 0:
        # Lança um erro do tipo ZeroDivisionError com uma mensagem explicativa
        raise ZeroDivisionError("Não é possível dividir um número por zero.")
    # Caso o divisor seja diferente de zero, realiza a divisão normalmente
    return a / b


def potencia(base: float, expoente: float) -> float:
    """Retorna a base elevada ao expoente."""
    # Utiliza a função math.pow ou o operador ** para calcular a potência
    return base ** expoente


def raiz_quadrada(numero: float) -> float:
    """Retorna a raiz quadrada de um número, tratando números negativos."""
    # Verifica se o número informado é menor que zero (negativo)
    if numero < 0:
        # Lança um erro ValueError pois não existe raiz quadrada real de número negativo
        raise ValueError("Não é possível calcular raiz quadrada real de número negativo.")
    # Usa a função sqrt() do módulo math para calcular a raiz quadrada
    return math.sqrt(numero)


def porcentagem(percentual: float, valor_total: float) -> float:
    """Calcula quanto vale 'percentual'% de 'valor_total'."""
    # Divide o percentual por 100 e multiplica pelo valor total
    return (percentual / 100) * valor_total


def ler_numero(mensagem: str) -> float:
    """Lê um número digitado pelo usuário com validação de erros."""
    # Inicia um laço infinito que só termina quando o usuário digitar um número válido
    while True:
        # Bloco try tenta executar a conversão do texto digitado para número decimal (float)
        try:
            # Pede a entrada no terminal, troca vírgula por ponto e converte para float
            entrada = input(mensagem).strip().replace(",", ".")
            # Retorna o número convertido, encerrando a função e o loop while
            return float(entrada)
        # Captura o erro ValueError caso o usuário digite letras ou símbolos inválidos
        except ValueError:
            # Exibe uma mensagem amigável orientando o usuário a tentar novamente
            print("❌ Erro: Entrada inválida! Digite apenas números (ex: 10 ou 3.5).")


def exibir_historico(historico: list) -> None:
    """Exibe todas as operações salvas na lista de histórico."""
    # Imprime um cabeçalho visual para separar a seção de histórico no terminal
    print("\\n" + "=" * 48)
    # Imprime o título centralizado da seção de histórico
    print("           HISTÓRICO DE OPERAÇÕES")
    # Imprime a linha inferior do cabeçalho
    print("=" * 48)
    # Verifica se a lista de histórico está vazia (nenhuma operação realizada ainda)
    if not historico:
        # Informa ao usuário que ainda não há cálculos registrados
        print("Nenhuma operação foi realizada até o momento.")
    # Caso existam itens na lista de histórico
    else:
        # Percorre a lista numerando cada operação a partir de 1 com enumerate()
        for indice, operacao in enumerate(historico, start=1):
            # Exibe o número da operação e o texto detalhado do cálculo
            print(f"{indice}. {operacao}")
    # Imprime uma linha de fechamento para manter a organização visual
    print("=" * 48)


def exibir_menu() -> None:
    """Imprime o menu principal de opções no terminal."""
    # Imprime uma linha divisória no topo do menu
    print("\\n" + "=" * 48)
    # Imprime o título da calculadora
    print("          CALCULADORA COMPLETA EM PYTHON")
    # Imprime outra linha divisória abaixo do título
    print("=" * 48)
    # Exibe a opção 1 para Soma
    print(" [1] Soma (+)")
    # Exibe a opção 2 para Subtração
    print(" [2] Subtração (-)")
    # Exibe a opção 3 para Multiplicação
    print(" [3] Multiplicação (*)")
    # Exibe a opção 4 para Divisão
    print(" [4] Divisão (/)")
    # Exibe a opção 5 para Potência
    print(" [5] Potência (x^y)")
    # Exibe a opção 6 para Raiz quadrada
    print(" [6] Raiz quadrada (√x)")
    # Exibe a opção 7 para Porcentagem
    print(" [7] Porcentagem (% de um valor)")
    # Exibe a opção 8 para consultar o Histórico de operações
    print(" [8] Histórico de operações")
    # Exibe a opção 0 para encerrar o programa
    print(" [0] Sair")
    # Imprime a linha final do menu
    print("=" * 48)


def executar_calculadora() -> None:
    """Função principal que gerencia o fluxo e o loop do menu da calculadora."""
    # Cria uma lista vazia para armazenar o histórico de todas as operações realizadas
    historico = []

    # Inicia o loop principal que mantém a calculadora funcionando até o usuário sair
    while True:
        # Chama a função que mostra as opções na tela
        exibir_menu()
        # Lê a opção escolhida pelo usuário e remove espaços extras nas pontas
        opcao = input("Escolha uma opção (0 a 8): ").strip()

        # Verifica se o usuário escolheu a opção 0 (Sair)
        if opcao == "0":
            # Exibe mensagem de despedida
            print("\\nEncerrando a calculadora. Até logo! 👋")
            # O comando break interrompe o loop while e finaliza o programa
            break

        # Verifica se o usuário escolheu a opção 8 (Histórico de operações)
        if opcao == "8":
            # Chama a função responsável por listar o histórico salvo na memória
            exibir_historico(historico)
            # O comando continue volta para o início do loop while sem executar o resto abaixo
            continue

        # Verifica se a opção digitada está entre as operações que usam DOIS números (1, 2, 3, 4, 5, 7)
        if opcao in ("1", "2", "3", "4", "5", "7"):
            # Usa um bloco try para capturar erros matemáticos como divisão por zero ou estouro numérico
            try:
                # Se for porcentagem (opção 7), personaliza as perguntas para ficar mais claro
                if opcao == "7":
                    # Solicita a taxa percentual ao usuário
                    num1 = ler_numero("Digite a porcentagem (ex: 15 para 15%): ")
                    # Solicita o valor base sobre o qual a porcentagem será calculada
                    num2 = ler_numero("Digite o valor total base: ")
                # Se for potência (opção 5), pede base e expoente
                elif opcao == "5":
                    # Solicita o número da base
                    num1 = ler_numero("Digite o número da base: ")
                    # Solicita o número do expoente
                    num2 = ler_numero("Digite o expoente: ")
                # Para Soma, Subtração, Multiplicação e Divisão, pede o 1º e o 2º número
                else:
                    # Lê o primeiro número validado
                    num1 = ler_numero("Digite o primeiro número: ")
                    # Lê o segundo número validado
                    num2 = ler_numero("Digite o segundo número: ")

                # Executa a operação correspondente à opção escolhida
                if opcao == "1":
                    # Calcula a soma chamando a função somar()
                    resultado = somar(num1, num2)
                    # Formata o texto do cálculo para exibição e registro no histórico
                    registro = f"{num1} + {num2} = {resultado:.4g}"
                elif opcao == "2":
                    # Calcula a subtração chamando a função subtrair()
                    resultado = subtrair(num1, num2)
                    # Formata o texto do cálculo para exibição e registro no histórico
                    registro = f"{num1} - {num2} = {resultado:.4g}"
                elif opcao == "3":
                    # Calcula a multiplicação chamando a função multiplicar()
                    resultado = multiplicar(num1, num2)
                    # Formata o texto do cálculo para exibição e registro no histórico
                    registro = f"{num1} * {num2} = {resultado:.4g}"
                elif opcao == "4":
                    # Calcula a divisão chamando a função dividir() (pode lançar ZeroDivisionError)
                    resultado = dividir(num1, num2)
                    # Formata o texto do cálculo para exibição e registro no histórico
                    registro = f"{num1} / {num2} = {resultado:.4g}"
                elif opcao == "5":
                    # Calcula a potência chamando a função potencia()
                    resultado = potencia(num1, num2)
                    # Formata o texto do cálculo para exibição e registro no histórico
                    registro = f"{num1} ^ {num2} = {resultado:.4g}"
                elif opcao == "7":
                    # Calcula a porcentagem chamando a função porcentagem()
                    resultado = porcentagem(num1, num2)
                    # Formata o texto do cálculo para exibição e registro no histórico
                    registro = f"{num1}% de {num2} = {resultado:.4g}"

                # Exibe o resultado formatado no terminal para o usuário
                print(f"\\n✅ Resultado: {registro}")
                # Adiciona a string da operação ao final da lista de histórico usando .append()
                historico.append(registro)

            # Captura especificamente a tentativa de divisão por zero
            except ZeroDivisionError as erro:
                # Exibe a mensagem de erro explicativa sem travar o programa
                print(f"\\n❌ Erro matemático: {erro}")
            # Captura erro caso uma potência gere um número grande demais para a memória (OverflowError)
            except OverflowError:
                # Informa ao usuário que o resultado excedeu o limite numérico
                print("\\n❌ Erro: O resultado dessa potência é grande demais para ser calculado.")

        # Verifica se o usuário escolheu a opção 6 (Raiz quadrada, que exige apenas UM número)
        elif opcao == "6":
            # Inicia bloco try para tratar o caso de raiz quadrada de número negativo
            try:
                # Lê o número do qual se deseja extrair a raiz quadrada
                num = ler_numero("Digite o número para calcular a raiz quadrada: ")
                # Calcula a raiz quadrada (pode lançar ValueError se num < 0)
                resultado = raiz_quadrada(num)
                # Monta o texto do registro da operação
                registro = f"√{num} = {resultado:.4g}"
                # Mostra o resultado na tela
                print(f"\\n✅ Resultado: {registro}")
                # Salva a operação na lista de histórico
                historico.append(registro)
            # Captura o ValueError lançado quando o número é negativo
            except ValueError as erro:
                # Exibe a mensagem de erro detalhada para o usuário
                print(f"\\n❌ Erro matemático: {erro}")

        # Caso o usuário tenha digitado qualquer opção fora do intervalo de 0 a 8
        else:
            # Orienta o usuário a escolher uma opção existente no menu
            print("\\n⚠️ Opção inválida! Por favor, escolha um número entre 0 e 8.")


# Verifica se este arquivo está sendo executado diretamente pelo Python (e não importado)
if __name__ == "__main__":
    # Bloco try/except externo para capturar interrupção pelo teclado (Ctrl+C) de forma elegante
    try:
        # Inicia a execução da calculadora
        executar_calculadora()
    # Captura o comando Ctrl+C caso o usuário force a saída pelo teclado
    except KeyboardInterrupt:
        # Exibe mensagem amigável de saída sem mostrar rastreamento de erro (traceback)
        print("\\n\\nOperação interrompida pelo usuário. Saindo...")
`;

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'error' | 'success' | 'header';
  text: string;
}

type SimState =
  | { step: 'MENU' }
  | { step: 'WAIT_NUM1'; op: string }
  | { step: 'WAIT_NUM2'; op: string; num1: number }
  | { step: 'WAIT_SINGLE'; op: string }
  | { step: 'EXITED' };

const FLOW_STEPS = [
  {
    step: '01',
    title: 'Exibição do Menu no Loop while True',
    codeLine: 'exibir_menu() → opcao = input("Escolha uma opção (0 a 8): ").strip()',
    desc: 'O laço while True mantém o programa vivo. A função exibir_menu() imprime as opções e input() pausa o programa aguardando a escolha do usuário.',
  },
  {
    step: '02',
    title: 'Roteamento Condicional (if / elif / else)',
    codeLine: 'if opcao in ("1", "2", "3", "4", "5", "7"):',
    desc: 'O Python verifica qual operação foi solicitada. Se for "0", executa break. Se for "8", mostra o histórico com continue. Se for uma operação matemática, entra no bloco try.',
  },
  {
    step: '03',
    title: 'Leitura Segura com Validação (ler_numero)',
    codeLine: 'entrada = input(mensagem).strip().replace(",", ".") → return float(entrada)',
    desc: 'Dentro de ler_numero(), um loop com try/except garante que letras como "abc" sejam capturadas por except ValueError, pedindo o número novamente sem fechar o programa.',
  },
  {
    step: '04',
    title: 'Execução da Função e Tratamento Matemático',
    codeLine: 'resultado = dividir(num1, num2) # Lança ZeroDivisionError se num2 == 0',
    desc: 'A função específica é chamada. Se houver divisão por zero ou raiz negativa, raise dispara a exceção correspondente e o bloco except exibe a mensagem amigável.',
  },
  {
    step: '05',
    title: 'Registro na Lista de Histórico (.append)',
    codeLine: 'historico.append(registro)',
    desc: 'Se o cálculo foi bem-sucedido, o resultado formatado (ex: "20 / 4 = 5") é anexado ao final da lista historico na memória e o loop while True recomeça.',
  },
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'didactic'>('simulator');

  // Terminal Simulator State
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [simState, setSimState] = useState<SimState>({ step: 'MENU' });
  const [historyList, setHistoryList] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [activeFlowIndex, setActiveFlowIndex] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const appendMenuLines = (currentLines: TerminalLine[]): TerminalLine[] => [
    ...currentLines,
    { id: crypto.randomUUID(), type: 'header', text: '================================================' },
    { id: crypto.randomUUID(), type: 'header', text: '          CALCULADORA COMPLETA EM PYTHON        ' },
    { id: crypto.randomUUID(), type: 'header', text: '================================================' },
    { id: crypto.randomUUID(), type: 'output', text: ' [1] Soma (+)             [5] Potência (x^y)' },
    { id: crypto.randomUUID(), type: 'output', text: ' [2] Subtração (-)        [6] Raiz quadrada (√x)' },
    { id: crypto.randomUUID(), type: 'output', text: ' [3] Multiplicação (*)    [7] Porcentagem (%)' },
    { id: crypto.randomUUID(), type: 'output', text: ' [4] Divisão (/)          [8] Histórico' },
    { id: crypto.randomUUID(), type: 'output', text: ' [0] Sair' },
    { id: crypto.randomUUID(), type: 'header', text: '================================================' },
  ];

  useEffect(() => {
    setLines(appendMenuLines([]));
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const resetTerminal = () => {
    setHistoryList([]);
    setSimState({ step: 'MENU' });
    setActiveFlowIndex(0);
    setLines(appendMenuLines([]));
    setUserInput('');
  };

  const getPromptLabel = (): string => {
    if (simState.step === 'MENU') return 'Escolha uma opção (0 a 8): ';
    if (simState.step === 'WAIT_SINGLE') return 'Digite o número para calcular a raiz quadrada: ';
    if (simState.step === 'WAIT_NUM1') {
      if (simState.op === '7') return 'Digite a porcentagem (ex: 15 para 15%): ';
      if (simState.op === '5') return 'Digite o número da base: ';
      return 'Digite o primeiro número: ';
    }
    if (simState.step === 'WAIT_NUM2') {
      if (simState.op === '7') return 'Digite o valor total base: ';
      if (simState.op === '5') return 'Digite o expoente: ';
      return 'Digite o segundo número: ';
    }
    return 'Programa finalizado.';
  };

  const formatNum = (n: number): string => {
    if (!Number.isFinite(n)) return String(n);
    return Number(n.toPrecision(6)).toString();
  };

  const processInput = (raw: string) => {
    const trimmed = raw.trim();
    const promptText = getPromptLabel();
    let nextLines: TerminalLine[] = [
      ...lines,
      { id: crypto.randomUUID(), type: 'input', text: `${promptText}${raw}` },
    ];

    if (simState.step === 'EXITED') {
      return;
    }

    if (simState.step === 'MENU') {
      if (trimmed === '0') {
        nextLines.push({
          id: crypto.randomUUID(),
          type: 'output',
          text: 'Encerrando a calculadora. Até logo! 👋',
        });
        setLines(nextLines);
        setSimState({ step: 'EXITED' });
        setActiveFlowIndex(1);
        return;
      }

      if (trimmed === '8') {
        nextLines.push({ id: crypto.randomUUID(), type: 'header', text: '================================================' });
        nextLines.push({ id: crypto.randomUUID(), type: 'header', text: '           HISTÓRICO DE OPERAÇÕES               ' });
        nextLines.push({ id: crypto.randomUUID(), type: 'header', text: '================================================' });
        if (historyList.length === 0) {
          nextLines.push({
            id: crypto.randomUUID(),
            type: 'output',
            text: 'Nenhuma operação foi realizada até o momento.',
          });
        } else {
          historyList.forEach((item, idx) => {
            nextLines.push({
              id: crypto.randomUUID(),
              type: 'output',
              text: `${idx + 1}. ${item}`,
            });
          });
        }
        nextLines.push({ id: crypto.randomUUID(), type: 'header', text: '================================================' });
        setLines(appendMenuLines(nextLines));
        setActiveFlowIndex(4);
        return;
      }

      if (['1', '2', '3', '4', '5', '7'].includes(trimmed)) {
        setLines(nextLines);
        setSimState({ step: 'WAIT_NUM1', op: trimmed });
        setActiveFlowIndex(2);
        return;
      }

      if (trimmed === '6') {
        setLines(nextLines);
        setSimState({ step: 'WAIT_SINGLE', op: '6' });
        setActiveFlowIndex(2);
        return;
      }

      nextLines.push({
        id: crypto.randomUUID(),
        type: 'error',
        text: '⚠️ Opção inválida! Por favor, escolha um número entre 0 e 8.',
      });
      setLines(appendMenuLines(nextLines));
      setActiveFlowIndex(1);
      return;
    }

    // Validating number input (ler_numero simulation)
    const normalized = trimmed.replace(',', '.');
    const parsed = Number(normalized);
    if (normalized === '' || Number.isNaN(parsed)) {
      nextLines.push({
        id: crypto.randomUUID(),
        type: 'error',
        text: '❌ Erro: Entrada inválida! Digite apenas números (ex: 10 ou 3.5).',
      });
      setLines(nextLines);
      setActiveFlowIndex(2);
      return;
    }

    if (simState.step === 'WAIT_SINGLE') {
      if (parsed < 0) {
        nextLines.push({
          id: crypto.randomUUID(),
          type: 'error',
          text: '❌ Erro matemático: Não é possível calcular raiz quadrada real de número negativo.',
        });
        setLines(appendMenuLines(nextLines));
        setSimState({ step: 'MENU' });
        setActiveFlowIndex(3);
        return;
      }
      const res = Math.sqrt(parsed);
      const reg = `√${parsed} = ${formatNum(res)}`;
      nextLines.push({
        id: crypto.randomUUID(),
        type: 'success',
        text: `✅ Resultado: ${reg}`,
      });
      setHistoryList((prev) => [...prev, reg]);
      setLines(appendMenuLines(nextLines));
      setSimState({ step: 'MENU' });
      setActiveFlowIndex(4);
      return;
    }

    if (simState.step === 'WAIT_NUM1') {
      setLines(nextLines);
      setSimState({ step: 'WAIT_NUM2', op: simState.op, num1: parsed });
      setActiveFlowIndex(2);
      return;
    }

    if (simState.step === 'WAIT_NUM2') {
      const { op, num1 } = simState;
      const num2 = parsed;

      if (op === '4' && num2 === 0) {
        nextLines.push({
          id: crypto.randomUUID(),
          type: 'error',
          text: '❌ Erro matemático: Não é possível dividir um número por zero.',
        });
        setLines(appendMenuLines(nextLines));
        setSimState({ step: 'MENU' });
        setActiveFlowIndex(3);
        return;
      }

      let res = 0;
      let reg = '';
      if (op === '1') {
        res = num1 + num2;
        reg = `${num1} + ${num2} = ${formatNum(res)}`;
      } else if (op === '2') {
        res = num1 - num2;
        reg = `${num1} - ${num2} = ${formatNum(res)}`;
      } else if (op === '3') {
        res = num1 * num2;
        reg = `${num1} * ${num2} = ${formatNum(res)}`;
      } else if (op === '4') {
        res = num1 / num2;
        reg = `${num1} / ${num2} = ${formatNum(res)}`;
      } else if (op === '5') {
        res = Math.pow(num1, num2);
        if (!Number.isFinite(res)) {
          nextLines.push({
            id: crypto.randomUUID(),
            type: 'error',
            text: '❌ Erro: O resultado dessa potência é grande demais para ser calculado.',
          });
          setLines(appendMenuLines(nextLines));
          setSimState({ step: 'MENU' });
          setActiveFlowIndex(3);
          return;
        }
        reg = `${num1} ^ ${num2} = ${formatNum(res)}`;
      } else if (op === '7') {
        res = (num1 / 100) * num2;
        reg = `${num1}% de ${num2} = ${formatNum(res)}`;
      }

      nextLines.push({
        id: crypto.randomUUID(),
        type: 'success',
        text: `✅ Resultado: ${reg}`,
      });
      setHistoryList((prev) => [...prev, reg]);
      setLines(appendMenuLines(nextLines));
      setSimState({ step: 'MENU' });
      setActiveFlowIndex(4);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processInput(userInput);
    setUserInput('');
  };

  const runScenario = (steps: string[]) => {
    // Runs a quick preset demonstration in the terminal
    let tempLines = appendMenuLines([]);
    let tempHistory = [...historyList];

    if (steps[0] === 'div_zero') {
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Escolha uma opção (0 a 8): 4' });
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Digite o primeiro número: 15' });
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Digite o segundo número: 0' });
      tempLines.push({
        id: crypto.randomUUID(),
        type: 'error',
        text: '❌ Erro matemático: Não é possível dividir um número por zero.',
      });
      setActiveFlowIndex(3);
    } else if (steps[0] === 'neg_sqrt') {
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Escolha uma opção (0 a 8): 6' });
      tempLines.push({
        id: crypto.randomUUID(),
        type: 'input',
        text: 'Digite o número para calcular a raiz quadrada: -9',
      });
      tempLines.push({
        id: crypto.randomUUID(),
        type: 'error',
        text: '❌ Erro matemático: Não é possível calcular raiz quadrada real de número negativo.',
      });
      setActiveFlowIndex(3);
    } else if (steps[0] === 'invalid_str') {
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Escolha uma opção (0 a 8): 1' });
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Digite o primeiro número: abc' });
      tempLines.push({
        id: crypto.randomUUID(),
        type: 'error',
        text: '❌ Erro: Entrada inválida! Digite apenas números (ex: 10 ou 3.5).',
      });
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Digite o primeiro número: 12.5' });
      tempLines.push({ id: crypto.randomUUID(), type: 'input', text: 'Digite o segundo número: 7.5' });
      tempLines.push({ id: crypto.randomUUID(), type: 'success', text: '✅ Resultado: 12.5 + 7.5 = 20' });
      tempHistory.push('12.5 + 7.5 = 20');
      setHistoryList(tempHistory);
      setActiveFlowIndex(2);
    }
    setLines(appendMenuLines(tempLines));
    setSimState({ step: 'MENU' });
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([PYTHON_CODE], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculadora.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Bar Contract: 3 zones */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
        >
          PyCalc Didática
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'simulator' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Simulador Terminal
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'code' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Código Comentado (PEP 8)
          </button>
          <button
            onClick={() => setActiveTab('didactic')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'didactic' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Explicação Didática
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadCode}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar calculadora.py
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1360px] w-full mx-auto px-6 py-8">
        {/* Hero & Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>Python 3 Standard Library</span>
              <span aria-hidden="true">·</span>
              <span>Módulo math</span>
              <span aria-hidden="true">·</span>
              <span>Conformidade PEP 8</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
              Calculadora Completa em Python com Tratamento de Exceções
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Teste o comportamento real do script no terminal interativo abaixo, inspecione cada linha de
              código comentada ou explore a anatomia de <code className="text-sky-700 font-semibold">def</code>,{' '}
              <code className="text-sky-700 font-semibold">while True</code>,{' '}
              <code className="text-sky-700 font-semibold">try/except</code> e listas em Python.
            </p>
          </div>

          {/* Interactive View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start lg:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Simulador Interativo
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Código-Fonte (PEP 8)
            </button>
            <button
              onClick={() => setActiveTab('didactic')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'didactic'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Guia Didático
            </button>
          </div>
        </div>

        {/* TAB 1: TWO-ZONE EDUCATIONAL SANDBOX */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
            {/* Left Zone: Interactive Python Terminal Stage (7 columns) */}
            <div className="lg:col-span-7 flex flex-col bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden">
              {/* Terminal Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>python3 calculadora.py</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTerminal}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reiniciar Sessão
                  </button>
                </div>
              </div>

              {/* Quick Test Scenarios Bar */}
              <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 text-xs">
                <span className="text-slate-400 font-medium">Testar try/except:</span>
                <button
                  onClick={() => runScenario(['div_zero'])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Divisão por Zero (15 / 0)
                </button>
                <button
                  onClick={() => runScenario(['neg_sqrt'])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Raiz Negativa (√-9)
                </button>
                <button
                  onClick={() => runScenario(['invalid_str'])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Texto Inválido ("abc")
                </button>
              </div>

              {/* Terminal Output Stream */}
              <div className="p-5 h-[420px] overflow-y-auto font-mono text-xs sm:text-sm space-y-1.5 leading-relaxed">
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className={
                      line.type === 'error'
                        ? 'text-rose-400 font-medium'
                        : line.type === 'success'
                        ? 'text-emerald-400 font-semibold py-1'
                        : line.type === 'input'
                        ? 'text-sky-300'
                        : line.type === 'header'
                        ? 'text-slate-400'
                        : 'text-slate-200'
                    }
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Interactive Input Prompt */}
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center gap-3 px-4 py-3 bg-slate-900 border-t border-slate-800"
              >
                <span className="text-xs sm:text-sm font-mono text-sky-400 whitespace-nowrap shrink-0">
                  {getPromptLabel()}
                </span>
                <input
                  type="text"
                  value={userInput}
                  disabled={simState.step === 'EXITED'}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={
                    simState.step === 'MENU'
                      ? 'Digite 1 a 8 ou 0 para sair...'
                      : 'Digite um número (ou letras para testar erro)...'
                  }
                  className="flex-1 bg-slate-950 text-white font-mono text-xs sm:text-sm px-3 py-2 rounded border border-slate-700 focus:outline-none focus:border-sky-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={simState.step === 'EXITED'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-40 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  Enviar Enter
                </button>
              </form>
            </div>

            {/* Right Zone: Live State & Execution Flow Inspector (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Live Memory State (Lista historico) */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900 font-display">
                    Estado da Memória: Lista <code className="text-sky-700">historico</code>
                  </h2>
                  <span className="text-xs font-mono text-slate-500">
                    len(historico) == {historyList.length}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Cada operação concluída com sucesso executa{' '}
                  <code className="text-slate-800 font-semibold">historico.append(registro)</code>:
                </p>
                <div className="bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs overflow-x-auto">
                  {historyList.length === 0 ? (
                    <span className="text-slate-400">historico = [] # Lista vazia no momento</span>
                  ) : (
                    <div className="space-y-1">
                      <div>historico = [</div>
                      {historyList.map((item, index) => (
                        <div key={index} className="pl-4 text-emerald-300">
                          "{item}"{index < historyList.length - 1 ? ',' : ''}
                        </div>
                      ))}
                      <div>]</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Execution Step-by-Step Tracer */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900 font-display">
                    Fluxo de Execução em Tempo Real
                  </h2>
                  <span className="text-xs text-slate-500">Passo a passo</span>
                </div>

                <div className="space-y-3">
                  {FLOW_STEPS.map((item, idx) => {
                    const isActive = idx === activeFlowIndex;
                    return (
                      <div
                        key={item.step}
                        onClick={() => setActiveFlowIndex(idx)}
                        className={`p-3.5 rounded-lg border transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-sky-50/70 border-sky-600/40'
                            : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-900 font-display">
                            {item.step}. {item.title}
                          </span>
                          {isActive && (
                            <span className="text-[11px] font-mono font-semibold text-sky-700">
                              ● ETAPA ATUAL
                            </span>
                          )}
                        </div>
                        <code className="block text-[11px] font-mono text-slate-700 bg-white px-2 py-1 rounded border border-slate-200/80 mb-1.5 overflow-x-auto">
                          {item.codeLine}
                        </code>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL COMMENTED PYTHON CODE */}
        {activeTab === 'code' && (
          <div className="pt-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h2 className="text-base font-semibold text-slate-900 font-display">
                  Arquivo completo: <code className="text-sky-700">calculadora.py</code>
                </h2>
                <p className="text-xs text-slate-600">
                  100% Biblioteca Padrão (<code className="font-mono">import math</code>), comentado linha por
                  linha e formatado segundo a PEP 8.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Código Copiado!' : 'Copiar Código Python'}
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar .py
                </button>
              </div>
            </div>

            <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 p-6 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm leading-relaxed">
                <code>{PYTHON_CODE}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: DIDACTIC EXPLANATION & IMPROVEMENTS */}
        {activeTab === 'didactic' && (
          <div className="pt-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tópico 1 */}
              <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  01. O que cada bloco e função faz
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  O programa foi dividido em pequenas unidades com responsabilidade única (princípio da
                  modularização):
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Funções matemáticas puras</strong> (<code className="font-mono">somar</code>,{' '}
                      <code className="font-mono">subtrair</code>, <code className="font-mono">multiplicar</code>,{' '}
                      <code className="font-mono">dividir</code>, <code className="font-mono">potencia</code>,{' '}
                      <code className="font-mono">raiz_quadrada</code>, <code className="font-mono">porcentagem</code>):
                      recebem números, aplicam a fórmula e devolvem o resultado com <code className="font-mono">return</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong><code className="font-mono">ler_numero(mensagem)</code></strong>: protege a entrada de
                      dados. Troca vírgula por ponto (<code className="font-mono">.replace(",", ".")</code>) e garante
                      que o programa só avance quando o usuário digitar um número real válido.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong><code className="font-mono">exibir_historico(historico)</code></strong>: percorre a lista
                      com <code className="font-mono">enumerate(historico, start=1)</code> para numerar cada cálculo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong><code className="font-mono">executar_calculadora()</code></strong>: orquestra o menu,
                      gerencia a lista <code className="font-mono">historico</code> e conecta a entrada do usuário às
                      funções de cálculo.
                    </span>
                  </li>
                </ul>
              </section>

              {/* Tópico 2 */}
              <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  02. Por que usamos <code className="text-sky-700 font-mono">try / except</code>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sem tratamento de erros, qualquer imprevisto faz o Python encerrar o programa imediatamente com um{' '}
                  <em>Traceback</em>. O bloco <code className="font-mono">try/except</code> funciona como uma rede de
                  proteção:
                </p>
                <div className="bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs space-y-1">
                  <div className="text-slate-400"># Três erros tratados na calculadora:</div>
                  <div>1. ValueError (letras no lugar de números: float("abc"))</div>
                  <div>2. ZeroDivisionError (dividir por zero: 10 / 0)</div>
                  <div>3. ValueError em raiz negativa (raiz_quadrada(-25))</div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  O Python <strong>tenta</strong> executar o código dentro do <code className="font-mono">try</code>. Se
                  um erro acontecer, ele pula direto para o <code className="font-mono">except</code> correspondente,
                  mostra o aviso amigável e mantém a calculadora aberta.
                </p>
              </section>

              {/* Tópico 3 */}
              <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  03. Como funcionam as funções (<code className="text-sky-700 font-mono">def</code>)
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Uma função é um bloco de código reutilizável definido pela palavra-chave{' '}
                  <code className="font-mono">def</code>. Ela recebe <strong>parâmetros</strong> (ingredientes),
                  processa a lógica e devolve um valor com <strong><code className="font-mono">return</code></strong>:
                </p>
                <div className="bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs space-y-1">
                  <div>def porcentagem(percentual: float, valor_total: float) -&gt; float:</div>
                  <div className="pl-4 text-emerald-300">return (percentual / 100) * valor_total</div>
                  <div className="pt-2 text-slate-400"># Chamando a função:</div>
                  <div>desconto = porcentagem(15, 200) # Retorna 30.0</div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Usar <code className="font-mono">return</code> em vez de apenas <code className="font-mono">print</code>{' '}
                  dentro das funções matemáticas permite que o resultado seja reutilizado e formatado para salvar no
                  histórico.
                </p>
              </section>

              {/* Tópico 4 */}
              <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  04. Como o loop <code className="text-sky-700 font-mono">while True</code> mantém o menu ativo
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Um script comum executa da primeira à última linha e fecha. Para que o menu reapareça após cada
                  conta, usamos <code className="font-mono">while True:</code> (enquanto for verdadeiro, repita):
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <GitBranch className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong><code className="font-mono">break</code> (Freio de emergência)</strong>: quando o usuário
                      digita <code className="font-mono">"0"</code>, o comando <code className="font-mono">break</code>{' '}
                      quebra o laço e encerra o programa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <GitBranch className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong><code className="font-mono">continue</code> (Atalho para o topo)</strong>: quando o usuário
                      escolhe <code className="font-mono">"8"</code> (Histórico), ele exibe a lista e usa{' '}
                      <code className="font-mono">continue</code> para voltar imediatamente ao menu, pulando a leitura
                      de números.
                    </span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Tópico 5 & Sugestões de Evolução */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  05. O que é uma Lista e por que usamos no Histórico
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Em Python, uma <strong>lista (<code className="font-mono">list</code>)</strong> é uma coleção ordenada
                  e mutável criada com colchetes <code className="font-mono">[]</code>. Ela é ideal para o histórico
                  porque:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  <li>1. Preserva a ordem cronológica exata das operações realizadas.</li>
                  <li>
                    2. Cresce dinamicamente com <code className="font-mono">historico.append(registro)</code>.
                  </li>
                  <li>
                    3. Permite percorrer todos os itens facilmente com <code className="font-mono">for</code> e{' '}
                    <code className="font-mono">enumerate()</code>.
                  </li>
                </ul>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  06. Sugestões para Evoluir o Projeto
                </h2>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  <li>
                    <strong>Persistência em Arquivo (.txt ou .json)</strong>: salvar o histórico no disco para não
                    perder os cálculos ao fechar o terminal.
                  </li>
                  <li>
                    <strong>Reaproveitar o Último Resultado (Ans)</strong>: permitir usar o resultado anterior como
                    primeiro número da próxima conta.
                  </li>
                  <li>
                    <strong>Dicionário de Operações (Dispatch Table)</strong>: substituir múltiplos{' '}
                    <code className="font-mono">elif</code> por um dicionário que mapeia cada opção à sua função.
                  </li>
                  <li>
                    <strong>Interface Gráfica Nativa (<code className="font-mono">tkinter</code>)</strong>: criar uma
                    janela com botões clicáveis usando a própria biblioteca padrão do Python.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white py-5 px-6">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>Calculadora Didática em Python · Biblioteca Padrão (math) · PEP 8</span>
          <span>Use o Simulador de Terminal ou baixe calculadora.py para executar localmente</span>
        </div>
      </footer>
    </div>
  );
}
