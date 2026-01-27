'use client'

import { useEffect, useRef, useState } from 'react';

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
    // Load Pyodide
    const loadPyodide = async () => {
      try {
        // @ts-ignore
        const pyodideModule = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
        });

        // Set up input function
        pyodideModule.globals.set('python_input', (prompt: string) => {
          return new Promise<string>((resolve) => {
            setOutput(prev => [...prev, prompt]);
            inputResolveRef.current = resolve;
            // Focus input field
            setTimeout(() => inputRef.current?.focus(), 0);
          });
        });

        // Redirect print to our output
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

# Replace input with our custom input
def custom_input(prompt=""):
    if prompt:
        print(prompt, end="")
    import js
    result = js.python_input(prompt)
    return result

__builtins__.input = custom_input
        `);

        // Add output function to JS
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
    // Auto-scroll to bottom
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

    // Add input to output display
    setOutput(prev => [...prev, input]);

    // Resolve the promise with the input
    if (inputResolveRef.current) {
      inputResolveRef.current(input);
      inputResolveRef.current = null;
    }

    setInput('');
  };

  return (
    <div className="w-full">
      <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-2">{filename}</span>
        </div>
        <button
          onClick={runGame}
          disabled={!isReady || isRunning}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
        >
          {isRunning ? 'Running...' : 'Run Game'}
        </button>
      </div>

      <div className="bg-gray-950 rounded-b-lg border-2 border-t-0 border-gray-800">
        <div
          ref={outputRef}
          className="p-4 font-mono text-sm text-green-400 overflow-auto"
          style={{ height: '500px', maxHeight: '500px' }}
        >
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line}
            </div>
          ))}
        </div>

        {isRunning && inputResolveRef.current && (
          <form onSubmit={handleInputSubmit} className="border-t border-gray-800 p-4">
            <div className="flex gap-2">
              <span className="text-green-400 font-mono">→</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-400 font-mono outline-none"
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
