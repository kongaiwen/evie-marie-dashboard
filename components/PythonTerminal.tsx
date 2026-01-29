'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './PythonTerminal.module.scss';

interface PythonTerminalProps {
  code: string;
  filename: string;
}

export default function PythonTerminal({ code, filename }: PythonTerminalProps) {
  const [output, setOutput] = useState<string[]>(['Loading Python environment...']);
  const [input, setInput] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputQueueRef = useRef<string[]>([]);
  const inputResolveRef = useRef<((value: string) => void) | null>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        // @ts-ignore
        const pyodideModule = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
        });

        pyodideModule.globals.set('python_input', (prompt: string) => {
          return new Promise<string>((resolve) => {
            setOutput(prev => [...prev, prompt]);
            inputResolveRef.current = resolve;
            setTimeout(() => inputRef.current?.focus(), 0);
          });
        });

        await pyodideModule.runPythonAsync(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.output = []

    def write(self, text):
        if text and text.strip():
            import js
            js.addOutput(text)

    def flush(self):
        pass

sys.stdout = OutputCapture()
sys.stderr = OutputCapture()

def custom_input(prompt=""):
    if prompt:
        print(prompt, end="")
    import js
    result = js.python_input(prompt)
    return result

__builtins__.input = custom_input
        `);

        (window as any).addOutput = (text: string) => {
          setOutput(prev => [...prev, text]);
        };

        setPyodide(pyodideModule);
        setOutput(['Python environment ready! Click "Run Game" to start.']);
        setIsReady(true);
      } catch (error) {
        setOutput(['Error loading Python environment. Please refresh the page.']);
        console.error(error);
      }
    };

    loadPyodide();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runGame = async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput(['Starting Tic-Tac-Toe...', '']);

    try {
      await pyodide.runPythonAsync(code);
    } catch (error: any) {
      setOutput(prev => [...prev, `Error: ${error.message}`]);
    }

    setIsRunning(false);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !inputResolveRef.current) return;

    setOutput(prev => [...prev, input]);

    if (inputResolveRef.current) {
      inputResolveRef.current(input);
      inputResolveRef.current = null;
    }

    setInput('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.red}`}></div>
            <div className={`${styles.dot} ${styles.yellow}`}></div>
            <div className={`${styles.dot} ${styles.green}`}></div>
          </div>
          <span className={styles.filename}>{filename}</span>
        </div>
        <button
          onClick={runGame}
          disabled={!isReady || isRunning}
          className={styles.runButton}
        >
          {isRunning ? 'Running...' : 'Run Game'}
        </button>
      </div>

      <div className={styles.body}>
        <div ref={outputRef} className={styles.output}>
          {output.map((line, i) => (
            <div key={i} className={styles.outputLine}>
              {line}
            </div>
          ))}
        </div>

        {isRunning && inputResolveRef.current && (
          <form onSubmit={handleInputSubmit} className={styles.inputForm}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrompt}>→</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
                placeholder="Type your move..."
                autoFocus
              />
            </div>
          </form>
        )}
      </div>

      <script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
    </div>
  );
}
