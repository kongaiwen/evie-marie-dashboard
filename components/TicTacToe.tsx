'use client'

import { useState, useCallback } from 'react'

type Player = 'X' | 'O' | null
type Board = Player[]

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
]

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'draw'>('playing')
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  const checkWinner = useCallback((currentBoard: Board): { winner: Player; line: number[] | null } => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combo }
      }
    }
    return { winner: null, line: null }
  }, [])

  const getAvailableMoves = useCallback((currentBoard: Board): number[] => {
    return currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1)
  }, [])

  const computerMove = useCallback((currentBoard: Board): number => {
    const available = getAvailableMoves(currentBoard)

    // Try to win
    for (const move of available) {
      const testBoard = [...currentBoard]
      testBoard[move] = 'O'
      if (checkWinner(testBoard).winner === 'O') return move
    }

    // Block player from winning
    for (const move of available) {
      const testBoard = [...currentBoard]
      testBoard[move] = 'X'
      if (checkWinner(testBoard).winner === 'X') return move
    }

    // Take center if available
    if (available.includes(4)) return 4

    // Take a corner
    const corners = [0, 2, 6, 8].filter(c => available.includes(c))
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)]

    // Take any available
    return available[Math.floor(Math.random() * available.length)]
  }, [checkWinner, getAvailableMoves])

  const handleClick = useCallback((index: number) => {
    if (board[index] || !isPlayerTurn || gameStatus !== 'playing') return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)

    const { winner, line } = checkWinner(newBoard)
    if (winner) {
      setGameStatus('won')
      setWinningLine(line)
      return
    }

    if (getAvailableMoves(newBoard).length === 0) {
      setGameStatus('draw')
      return
    }

    setIsPlayerTurn(false)

    // Computer's turn
    setTimeout(() => {
      const computerIdx = computerMove(newBoard)
      const computerBoard = [...newBoard]
      computerBoard[computerIdx] = 'O'
      setBoard(computerBoard)

      const { winner: compWinner, line: compLine } = checkWinner(computerBoard)
      if (compWinner) {
        setGameStatus('lost')
        setWinningLine(compLine)
        return
      }

      if (getAvailableMoves(computerBoard).length === 0) {
        setGameStatus('draw')
        return
      }

      setIsPlayerTurn(true)
    }, 500)
  }, [board, isPlayerTurn, gameStatus, checkWinner, getAvailableMoves, computerMove])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setGameStatus('playing')
    setWinningLine(null)
  }

  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'won': return '🎉 You Win!'
      case 'lost': return '😔 Computer Wins!'
      case 'draw': return '🤝 Draw!'
      default: return isPlayerTurn ? 'Your turn (X)' : 'Computer thinking...'
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Tic-Tac-Toe</h3>
        <p className={`text-lg font-medium ${
          gameStatus === 'won' ? 'text-emerald-400' :
          gameStatus === 'lost' ? 'text-red-400' :
          gameStatus === 'draw' ? 'text-amber-400' :
          'text-gray-300'
        }`}>
          {getStatusMessage()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index)
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !isPlayerTurn || gameStatus !== 'playing'}
              className={`
                aspect-square text-4xl font-bold rounded-xl transition-all duration-200
                ${isWinningCell
                  ? 'bg-emerald-500/30 border-2 border-emerald-400'
                  : 'bg-gray-700/50 border-2 border-gray-600 hover:border-teal-400 hover:bg-gray-700'
                }
                ${cell === 'X' ? 'text-teal-400' : 'text-rose-400'}
                ${!cell && isPlayerTurn && gameStatus === 'playing' ? 'cursor-pointer' : 'cursor-default'}
                disabled:opacity-70
              `}
            >
              {cell}
            </button>
          )
        })}
      </div>

      <div className="text-center">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all"
        >
          {gameStatus === 'playing' ? 'Reset Game' : 'Play Again'}
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-gray-400 text-sm text-center">
          JavaScript recreation of the original Python game.
          <br />
          You play as X, computer plays as O.
        </p>
      </div>
    </div>
  )
}
