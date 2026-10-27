# Importa o módulo 'math' da biblioteca padrão do Python para cálculos matemáticos
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
    # Utiliza o operador ** para calcular a potência (base elevada ao expoente)
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
            # Pede a entrada no terminal, troca vírgula por ponto e remove espaços extras
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
    print("\n" + "=" * 48)
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
    print("\n" + "=" * 48)
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
            print("\nEncerrando a calculadora. Até logo! 👋")
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
                print(f"\n✅ Resultado: {registro}")
                # Adiciona a string da operação ao final da lista de histórico usando .append()
                historico.append(registro)

            # Captura especificamente a tentativa de divisão por zero
            except ZeroDivisionError as erro:
                # Exibe a mensagem de erro explicativa sem travar o programa
                print(f"\n❌ Erro matemático: {erro}")
            # Captura erro caso uma potência gere um número grande demais para a memória (OverflowError)
            except OverflowError:
                # Informa ao usuário que o resultado excedeu o limite numérico
                print("\n❌ Erro: O resultado dessa potência é grande demais para ser calculado.")

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
                print(f"\n✅ Resultado: {registro}")
                # Salva a operação na lista de histórico
                historico.append(registro)
            # Captura o ValueError lançado quando o número é negativo
            except ValueError as erro:
                # Exibe a mensagem de erro detalhada para o usuário
                print(f"\n❌ Erro matemático: {erro}")

        # Caso o usuário tenha digitado qualquer opção fora do intervalo de 0 a 8
        else:
            # Orienta o usuário a escolher uma opção existente no menu
            print("\n⚠️ Opção inválida! Por favor, escolha um número entre 0 e 8.")


# Verifica se este arquivo está sendo executado diretamente pelo Python (e não importado)
if __name__ == "__main__":
    # Bloco try/except externo para capturar interrupção pelo teclado (Ctrl+C) de forma elegante
    try:
        # Inicia a execução da calculadora
        executar_calculadora()
    # Captura o comando Ctrl+C caso o usuário force a saída pelo teclado
    except KeyboardInterrupt:
        # Exibe mensagem amigável de saída sem mostrar rastreamento de erro (traceback)
        print("\n\nOperação interrompida pelo usuário. Saindo...")
