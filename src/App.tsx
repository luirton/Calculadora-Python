/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Delete,
  RotateCcw,
  Trash2,
  History,
  AlertCircle,
  Check,
  Copy,
  CornerDownLeft,
} from 'lucide-react';

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

type Operator = '+' | '-' | '*' | '/' | '^' | '%' | null;

const STORAGE_KEY = 'webcalc_history_v1';

export default function App() {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastAnswer, setLastAnswer] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  const formatNumber = (num: number): string => {
    if (!Number.isFinite(num)) return 'Erro';
    const rounded = Number(Math.round(Number(num + 'e10')) + 'e-10');
    return String(rounded);
  };

  const getOperatorSymbol = (op: Operator): string => {
    switch (op) {
      case '+':
        return '+';
      case '-':
        return '−';
      case '*':
        return '×';
      case '/':
        return '÷';
      case '^':
        return '^';
      case '%':
        return '% de';
      default:
        return '';
    }
  };

  const clearAll = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setErrorMessage(null);
  }, []);

  const inputDigit = useCallback(
    (digit: string) => {
      if (errorMessage) {
        setErrorMessage(null);
        setDisplay(digit);
        setWaitingForOperand(false);
        return;
      }

      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        if (display.replace('-', '').replace('.', '').length >= 12) return;
        setDisplay(display === '0' ? digit : display + digit);
      }
    },
    [display, waitingForOperand, errorMessage]
  );

  const inputDecimal = useCallback(() => {
    if (errorMessage) {
      setErrorMessage(null);
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand, errorMessage]);

  const deleteLastChar = useCallback(() => {
    if (errorMessage) {
      clearAll();
      return;
    }
    if (waitingForOperand) return;

    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display, waitingForOperand, errorMessage, clearAll]);

  const toggleSign = useCallback(() => {
    if (errorMessage) return;
    const value = parseFloat(display);
    if (value === 0) return;
    setDisplay(String(value * -1));
  }, [display, errorMessage]);

  const addHistoryRecord = (expression: string, result: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setHistory((prev) => [
      {
        id: crypto.randomUUID(),
        expression,
        result,
        timestamp,
      },
      ...prev.slice(0, 49),
    ]);
  };

  const calculateSquareRoot = useCallback(() => {
    setErrorMessage(null);
    const currentValue = parseFloat(display);

    if (currentValue < 0) {
      setErrorMessage('Não é possível calcular raiz quadrada real de número negativo.');
      return;
    }

    const result = Math.sqrt(currentValue);
    const formatted = formatNumber(result);
    addHistoryRecord(`√(${currentValue})`, formatted);
    setDisplay(formatted);
    setLastAnswer(result);
    setWaitingForOperand(true);
  }, [display]);

  const executeCalculation = (first: number, second: number, op: Operator): { value?: number; error?: string } => {
    switch (op) {
      case '+':
        return { value: first + second };
      case '-':
        return { value: first - second };
      case '*':
        return { value: first * second };
      case '/':
        if (second === 0) {
          return { error: 'Não é possível dividir um número por zero.' };
        }
        return { value: first / second };
      case '^': {
        const res = Math.pow(first, second);
        if (!Number.isFinite(res)) {
          return { error: 'O resultado dessa potência é grande demais.' };
        }
        return { value: res };
      }
      case '%':
        return { value: (first / 100) * second };
      default:
        return { value: second };
    }
  };

  const handleOperator = useCallback(
    (nextOperator: Operator) => {
      setErrorMessage(null);
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operator && !waitingForOperand) {
        const calc = executeCalculation(previousValue, inputValue, operator);
        if (calc.error) {
          setErrorMessage(calc.error);
          setPreviousValue(null);
          setOperator(null);
          setWaitingForOperand(true);
          return;
        }
        const result = calc.value!;
        const formatted = formatNumber(result);
        addHistoryRecord(`${previousValue} ${getOperatorSymbol(operator)} ${inputValue}`, formatted);
        setDisplay(formatted);
        setPreviousValue(result);
        setLastAnswer(result);
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
    },
    [display, operator, previousValue, waitingForOperand]
  );

  const handleEquals = useCallback(() => {
    if (operator === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    const calc = executeCalculation(previousValue, inputValue, operator);

    if (calc.error) {
      setErrorMessage(calc.error);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }

    const result = calc.value!;
    const formatted = formatNumber(result);
    addHistoryRecord(`${previousValue} ${getOperatorSymbol(operator)} ${inputValue}`, formatted);

    setDisplay(formatted);
    setPreviousValue(null);
    setOperator(null);
    setLastAnswer(result);
    setWaitingForOperand(true);
  }, [display, operator, previousValue]);

  const useLastAnswer = () => {
    if (lastAnswer === null) return;
    setErrorMessage(null);
    setDisplay(formatNumber(lastAnswer));
    setWaitingForOperand(false);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        inputDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        inputDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperator('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('/');
      } else if (e.key === '^') {
        e.preventDefault();
        handleOperator('^');
      } else if (e.key === '%') {
        e.preventDefault();
        handleOperator('%');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLastChar();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, handleOperator, handleEquals, deleteLastChar, clearAll]);

  const handleCopyResult = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const loadFromHistory = (value: string) => {
    setErrorMessage(null);
    setDisplay(value);
    setWaitingForOperand(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Bar Contract: 3 zones */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200">
        <a
          href="#calculadora"
          className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
        >
          Calculadora Web
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#calculadora"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Teclado Numérico
          </a>
          <a
            href="#historico"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Histórico ({history.length})
          </a>
          <a
            href="#atalhos"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Atalhos do Teclado
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Zerar Visor (Esc)
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1080px] w-full mx-auto px-6 py-8">
        <div
          id="calculadora"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Clean Web Calculator (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            {/* Calculator Display Screen */}
            <div className="bg-slate-950 text-white rounded-xl p-5 flex flex-col justify-between min-h-[132px] border border-slate-800">
              {/* Top Expression Line */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 h-5">
                <span>
                  {previousValue !== null && operator
                    ? `${previousValue} ${getOperatorSymbol(operator)}`
                    : 'Pronto para calcular'}
                </span>
                {lastAnswer !== null && (
                  <span>Ans = {formatNumber(lastAnswer)}</span>
                )}
              </div>

              {/* Error Banner or Main Numeric Readout */}
              {errorMessage ? (
                <div className="flex items-center gap-2.5 text-rose-400 py-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium leading-snug">
                    {errorMessage}
                  </span>
                </div>
              ) : (
                <div className="text-right font-mono text-4xl sm:text-5xl font-semibold tracking-tight truncate py-1">
                  {display.replace('.', ',')}
                </div>
              )}
            </div>

            {/* Secondary Math Row: Square Root, Power, Percentage, Ans */}
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={calculateSquareRoot}
                title="Raiz quadrada do número atual"
                className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                √x
              </button>
              <button
                onClick={() => handleOperator('^')}
                title="Potência (base elevada ao expoente)"
                className={`h-12 rounded-xl font-mono text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  operator === '^'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                xʸ
              </button>
              <button
                onClick={() => handleOperator('%')}
                title="Calcular X% de um valor Y"
                className={`h-12 rounded-xl font-mono text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  operator === '%'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                % de
              </button>
              <button
                onClick={useLastAnswer}
                disabled={lastAnswer === null}
                title="Inserir último resultado"
                className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-mono text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Ans
              </button>
            </div>

            {/* Primary Keypad Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Row 1 */}
              <button
                onClick={clearAll}
                className="h-14 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-base transition-colors cursor-pointer"
              >
                AC
              </button>
              <button
                onClick={toggleSign}
                className="h-14 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-semibold text-base transition-colors cursor-pointer"
              >
                ±
              </button>
              <button
                onClick={deleteLastChar}
                title="Apagar último dígito (Backspace)"
                className="h-14 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleOperator('/')}
                className={`h-14 rounded-xl font-mono text-xl font-semibold transition-colors cursor-pointer ${
                  operator === '/'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                }`}
              >
                ÷
              </button>

              {/* Row 2 */}
              {['7', '8', '9'].map((num) => (
                <button
                  key={num}
                  onClick={() => inputDigit(num)}
                  className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-900 font-mono text-xl font-semibold transition-colors cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOperator('*')}
                className={`h-14 rounded-xl font-mono text-xl font-semibold transition-colors cursor-pointer ${
                  operator === '*'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                }`}
              >
                ×
              </button>

              {/* Row 3 */}
              {['4', '5', '6'].map((num) => (
                <button
                  key={num}
                  onClick={() => inputDigit(num)}
                  className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-900 font-mono text-xl font-semibold transition-colors cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOperator('-')}
                className={`h-14 rounded-xl font-mono text-xl font-semibold transition-colors cursor-pointer ${
                  operator === '-'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                }`}
              >
                −
              </button>

              {/* Row 4 */}
              {['1', '2', '3'].map((num) => (
                <button
                  key={num}
                  onClick={() => inputDigit(num)}
                  className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-900 font-mono text-xl font-semibold transition-colors cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOperator('+')}
                className={`h-14 rounded-xl font-mono text-xl font-semibold transition-colors cursor-pointer ${
                  operator === '+'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                }`}
              >
                +
              </button>

              {/* Row 5 */}
              <button
                onClick={() => inputDigit('0')}
                className="col-span-2 h-14 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-900 font-mono text-xl font-semibold transition-colors cursor-pointer"
              >
                0
              </button>
              <button
                onClick={inputDecimal}
                className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-900 font-mono text-xl font-semibold transition-colors cursor-pointer"
              >
                ,
              </button>
              <button
                onClick={handleEquals}
                className="h-14 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xl font-semibold transition-colors cursor-pointer"
              >
                =
              </button>
            </div>
          </div>

          {/* Right Column: Operations History & Quick Help (5 cols) */}
          <div id="historico" className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-[480px]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-600" />
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Histórico de Operações
                  </h2>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Limpar
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 text-slate-400 space-y-2">
                  <p className="text-sm font-medium text-slate-600">
                    Nenhuma conta registrada ainda
                  </p>
                  <p className="text-xs text-slate-500">
                    Todas as somas, raízes, potências e porcentagens aparecerão aqui automaticamente.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 pr-1 mt-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-3 group"
                    >
                      <button
                        onClick={() => loadFromHistory(item.result)}
                        title="Clique para enviar este resultado ao visor"
                        className="text-left flex-1 cursor-pointer"
                      >
                        <div className="text-xs font-mono text-slate-500">
                          {item.expression} =
                        </div>
                        <div className="text-lg font-mono font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {item.result.replace('.', ',')}
                        </div>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.timestamp}
                        </span>
                        <button
                          onClick={() => handleCopyResult(item.id, item.result)}
                          title="Copiar resultado"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Keyboard Shortcuts & Tips Card */}
            <div
              id="atalhos"
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Como usar pelo teclado
                </h3>
                <CornerDownLeft className="w-4 h-4 text-slate-400" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <code className="font-mono font-semibold text-slate-900">0-9</code> e{' '}
                  <code className="font-mono font-semibold text-slate-900">,</code> : Digitar números
                </div>
                <div>
                  <code className="font-mono font-semibold text-slate-900">+ - * /</code> : Operações básicas
                </div>
                <div>
                  <code className="font-mono font-semibold text-slate-900">^</code> e{' '}
                  <code className="font-mono font-semibold text-slate-900">%</code> : Potência e Porcentagem
                </div>
                <div>
                  <code className="font-mono font-semibold text-slate-900">Enter</code> /{' '}
                  <code className="font-mono font-semibold text-slate-900">Esc</code> : Calcular / Limpar
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
