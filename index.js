import * as R from 'ramda'
import { pointDistributions, editedBonusMap } from './constants'

export const determineValidBonuses = usedLetters => {
  return usedLetters.reduce((board = [], letter = {}) => {
    board[letter.x][letter.y].value = ''
    return board
  }, editedBonusMap)
}

export const getBonusForLetter = (currentBonuses, letter = {}) => {
  return currentBonuses[letter.x][letter.y].value
}

export const getBoardWordTotal = (letters = [], currentBonuses = []) => {
  const final = letters.reduce(
    (word = {}, currentLetter = {}) => {
      const bonus = getBonusForLetter(currentBonuses, currentLetter)
      const rawPoint = pointDistributions[currentLetter.letter] || 0

      if (bonus.includes('l')) {
        return {
          current: word.current + Number(bonus[0]) * rawPoint,
          multiplier: word.multiplier,
        }
      } else if (bonus.includes('w')) {
        return {
          current: word.current + rawPoint,
          multiplier: word.multiplier * Number(bonus[0]),
        }
      } else {
        return {
          current: word.current + rawPoint,
          multiplier: word.multiplier,
        }
      }
    },
    {
      current: 0,
      multiplier: 1,
    },
  )
  return final.current * final.multiplier
}

export const isVerticalWord = (newLetters = []) => {
  const [firstLetter = {}, secondLetter = {}] = newLetters
  return firstLetter.y === secondLetter.y
}

export const findFirstLetter = (board, isVertical, currentLetter) => {
  if (R.isNil(currentLetter)) return null

  const same = isVertical ? 'y' : 'x'
  const diff = isVertical ? 'x' : 'y'

  const operation = currentL => boardLetter =>
    currentL[same] === boardLetter[same] &&
    currentL[diff] - 1 === boardLetter[diff]

  const previousLetter = board.find(operation(currentLetter))

  return findFirstLetter(board, isVertical, previousLetter) || currentLetter
}

export const findNextLetters = (board, isVertical, currentLetter) => {
  if (R.isNil(currentLetter)) return []

  const same = isVertical ? 'y' : 'x'
  const diff = isVertical ? 'x' : 'y'

  const operation = currentL => boardLetter =>
    currentL[same] === boardLetter[same] &&
    boardLetter[diff] - 1 === currentL[diff]

  const nextLetter = board.find(operation(currentLetter))

  return [currentLetter, ...findNextLetters(board, isVertical, nextLetter)]
}

export const getAllNewWords = (newLetters, board) => {
  const playableBoard = [...newLetters, ...board]
  const wordIsVertical = isVerticalWord(newLetters)
  const firstLetterMainWord = findFirstLetter(
    playableBoard,
    wordIsVertical,
    newLetters[0],
  )

  const mainWord = findNextLetters(
    playableBoard,
    wordIsVertical,
    firstLetterMainWord,
  )

  const auxWords = newLetters.map(newLetter => {
    return findNextLetters(
      playableBoard,
      !wordIsVertical,
      findFirstLetter(playableBoard, !wordIsVertical, newLetter),
    )
  })

  return [mainWord, ...auxWords].filter(word => word.length > 1)
}

export const getTotalTurnPoints = (newLetters, board) => {
  const currentBonuses = determineValidBonuses(board)

  getAllNewWords(newLetters, board).forEach(word => {
    console.log(word)
    console.log(getBoardWordTotal(word, currentBonuses))
  })

  return getAllNewWords(newLetters, board).reduce(
    (total, word) => total + getBoardWordTotal(word, currentBonuses),
    0,
  )
}
