'use client'

import { useState, useCallback } from 'react'
import styles from './TicTacToe.module.scss'

type Player = 'X' | 'O' | null
type Board = Player[]

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
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
    for (const move of available) {
      const testBoard = [...currentBoard]
      testBoard[move] = 'O'
      if (checkWinner(testBoard).winner === 'O') return move
    }
    for (const move of available) {
      const testBoard = [...currentBoard]
      testBoard[move] = 'X'
      if (checkWinner(testBoard).winner === 'X') return move
    }
    if (available.includes(4)) return 4
    const corners = [0, 2, 6, 8].filter(c => available.includes(c))
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)]
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

  const getStatusClass = () => {
    switch (gameStatus) {
      case 'won': return styles.statusWon
      case 'lost': return styles.statusLost
      case 'draw': return styles.statusDraw
      default: return ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Tic-Tac-Toe</h3>
        <p className={`${styles.status} ${getStatusClass()}`}>
          {getStatusMessage()}
        </p>
      </div>

      <div className={styles.board}>
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index)
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !isPlayerTurn || gameStatus !== 'playing'}
              className={`
                ${styles.cell}
                ${isWinningCell ? styles.cellWinning : ''}
                ${cell === 'X' ? styles.cellX : ''}
                ${cell === 'O' ? styles.cellO : ''}
              `}
            >
              {cell}
            </button>
          )
        })}
      </div>

      <div className={styles.footer}>
        <button
          onClick={resetGame}
          className={styles.resetButton}
        >
          {gameStatus === 'playing' ? 'Reset Game' : 'Play Again'}
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.infoText}>
          JavaScript recreation of the original Python game.
          <br />
          You play as X, computer plays as O.
        </p>
      </div>
    </div>
  )
}
