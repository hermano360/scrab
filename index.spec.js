import {
  getSingleWordTotal,
  getBoardWordTotal,
  determineValidBonuses,
  findNextLetters,
  isVerticalWord,
  isCreatingAuxiliaryWord,
  areLettersInEmptySpots,
  findFirstLetter,
  getAllNewWords,
  getTotalTurnPoints,
} from './index.js'

describe('getSingleWordTotal', () => {
  it('can handle empty word', () => {
    expect(getSingleWordTotal('')).toEqual(0)
  })
  it('can handle null word', () => {
    expect(getSingleWordTotal()).toEqual(0)
  })
  it('can handle valid word', () => {
    expect(getSingleWordTotal('valid')).toEqual(9)
  })
})

describe('getBoardWordTotal', () => {
  it('can handle valid word', () => {
    const currentBonuses = determineValidBonuses([])
    const letters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]
    expect(getBoardWordTotal(letters, currentBonuses)).toEqual(12)
  })
  it('game play', () => {
    const currentBonuses = determineValidBonuses([])
    const letters = [
      {
        letter: 'b',
        x: 7,
        y: 3,
      },
      {
        letter: 'o',
        x: 7,
        y: 4,
      },
      {
        letter: 'a',
        x: 7,
        y: 5,
      },
      {
        letter: 's',
        x: 7,
        y: 6,
      },
      {
        letter: 't',
        x: 7,
        y: 7,
      },
    ]
    expect(getBoardWordTotal(letters, currentBonuses)).toEqual(10)
  })
})

describe('determineValidBonuses', () => {
  it('can return back bonus thats covered up', () => {
    const letters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]
    expect(determineValidBonuses(letters)[7][3].value).toEqual('')
  })
})

describe('isVerticalWord', () => {
  it('works with vertical word', () => {
    const letters = [
      {
        letter: 'p',
        x: 4,
        y: 4,
      },
      {
        letter: 'o',
        x: 5,
        y: 4,
      },
      {
        letter: 'd',
        x: 6,
        y: 4,
      },
      {
        letter: 'u',
        x: 8,
        y: 4,
      },
      {
        letter: 'm',
        x: 9,
        y: 4,
      },
    ]

    expect(isVerticalWord(letters)).toBeTruthy()
  })
  it('works with horizontal word', () => {
    const letters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    expect(isVerticalWord(letters)).toBeFalsy()
  })
  it('works with single letter word', () => {
    const letters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
    ]

    expect(isVerticalWord(letters)).toBeFalsy()
  })
})

describe('findFirstLetter', () => {
  it('works for horizontal words', () => {
    const newLetters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]
    const currentBoard = []

    const lettersInPlay = [...newLetters, ...currentBoard]

    expect(
      findFirstLetter(lettersInPlay, isVerticalWord(newLetters), newLetters[4]),
    ).toEqual({
      letter: 'l',
      x: 7,
      y: 3,
    })
  })
  it('works for vertical words', () => {
    const newLetters = [
      {
        letter: 'p',
        x: 4,
        y: 4,
      },
      {
        letter: 'o',
        x: 5,
        y: 4,
      },
      {
        letter: 'd',
        x: 6,
        y: 4,
      },
      {
        letter: 'u',
        x: 8,
        y: 4,
      },
      {
        letter: 'm',
        x: 9,
        y: 4,
      },
    ]
    const currentBoard = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    const lettersInPlay = [...newLetters, ...currentBoard]

    expect(
      findFirstLetter(lettersInPlay, isVerticalWord(newLetters), newLetters[3]),
    ).toEqual({
      letter: 'p',
      x: 4,
      y: 4,
    })
  })
  it('works for unexpected case', () => {
    const board = [
      { letter: 'l', x: 7, y: 3 },
      { letter: 'i', x: 7, y: 4 },
      { letter: 'c', x: 7, y: 5 },
      { letter: 'k', x: 7, y: 6 },
      { letter: 's', x: 7, y: 7 },
    ]

    const newLetters = [
      { letter: 'd', x: 6, y: 4 },
      { letter: 'p', x: 4, y: 4 },
      { letter: 'u', x: 8, y: 4 },
      { letter: 'o', x: 5, y: 4 },
      { letter: 'm', x: 9, y: 4 },
    ]

    const lettersInPlay = [...newLetters, ...board]

    expect(
      findFirstLetter(lettersInPlay, isVerticalWord(newLetters), newLetters[3]),
    ).toEqual({
      letter: 'p',
      x: 4,
      y: 4,
    })
  })
  it('works for unexpected case - 2', () => {
    const newLetters = [
      {
        letter: 'o',
        x: 2,
        y: 1,
      },
      {
        letter: 's',
        x: 2,
        y: 3,
      },
    ]

    const board = [
      { letter: 'm', x: 0, y: 0 },
      { letter: 'e', x: 0, y: 1 },
      { letter: 't', x: 0, y: 2 },

      { letter: 'o', x: 1, y: 0 },
      { letter: 'o', x: 1, y: 2 },

      { letter: 'v', x: 2, y: 0 },
      { letter: 'w', x: 2, y: 2 },
      { letter: 'e', x: 3, y: 0 },
      { letter: 'e', x: 3, y: 2 },
      { letter: 'r', x: 4, y: 2 },
    ]

    const lettersInPlay = [...newLetters, ...board]

    expect(
      findFirstLetter(lettersInPlay, isVerticalWord(newLetters), newLetters[1]),
    ).toEqual({ letter: 'v', x: 2, y: 0 })
  })
})

describe('findNextLetters', () => {
  it('works for horizontal words', () => {
    const newLetters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]
    const currentBoard = []

    const lettersInPlay = [...newLetters, ...currentBoard]
    const wordIsVertical = isVerticalWord(newLetters)
    const firstLetter = findFirstLetter(
      lettersInPlay,
      wordIsVertical,
      newLetters[2],
    )
    expect(findNextLetters(lettersInPlay, wordIsVertical, firstLetter)).toEqual(
      [
        { letter: 'l', x: 7, y: 3 },
        { letter: 'i', x: 7, y: 4 },
        { letter: 'c', x: 7, y: 5 },
        { letter: 'k', x: 7, y: 6 },
        { letter: 's', x: 7, y: 7 },
      ],
    )
  })
  it('works for vertical words', () => {
    const newLetters = [
      {
        letter: 'p',
        x: 4,
        y: 4,
      },
      {
        letter: 'o',
        x: 5,
        y: 4,
      },
      {
        letter: 'd',
        x: 6,
        y: 4,
      },
      {
        letter: 'u',
        x: 8,
        y: 4,
      },
      {
        letter: 'm',
        x: 9,
        y: 4,
      },
    ]
    const currentBoard = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    const lettersInPlay = [...newLetters, ...currentBoard]
    const wordIsVertical = isVerticalWord(newLetters)
    const firstLetter = findFirstLetter(
      lettersInPlay,
      wordIsVertical,
      newLetters[2],
    )
    expect(findNextLetters(lettersInPlay, wordIsVertical, firstLetter)).toEqual(
      [
        { letter: 'p', x: 4, y: 4 },
        { letter: 'o', x: 5, y: 4 },
        { letter: 'd', x: 6, y: 4 },
        { letter: 'i', x: 7, y: 4 },
        { letter: 'u', x: 8, y: 4 },
        { letter: 'm', x: 9, y: 4 },
      ],
    )
  })
})

describe('isCreatingAuxiliaryWord', () => {
  it('handles if at the limit of existing word', () => {
    const newLetter = {
      letter: 'f',
      x: 7,
      y: 2,
    }
    const currentBoard = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    expect(isCreatingAuxiliaryWord(newLetter, currentBoard)).toBeTruthy()
  })

  it('handles if connecting existing letters', () => {
    const newLetter = {
      letter: 'o',
      x: 9,
      y: 8,
    }
    const currentBoard = [
      {
        letter: 'h',
        x: 7,
        y: 7,
      },
      {
        letter: 'a',
        x: 8,
        y: 7,
      },
      {
        letter: 'c',
        x: 9,
        y: 7,
      },
      {
        letter: 'k',
        x: 10,
        y: 7,
      },
      {
        letter: 'o',
        x: 7,
        y: 8,
      },
      {
        letter: 't',
        x: 7,
        y: 9,
      },
      {
        letter: 'o',
        x: 8,
        y: 9,
      },
      {
        letter: 'w',
        x: 9,
        y: 9,
      },
      {
        letter: 'e',
        x: 10,
        y: 9,
      },
      {
        letter: 'l',
        x: 11,
        y: 9,
      },
    ]

    expect(isCreatingAuxiliaryWord(newLetter, currentBoard)).toBeTruthy()
  })

  it('handles if not limit of existing word', () => {
    const newLetter = {
      letter: 'f',
      x: 4,
      y: 2,
    }
    const currentBoard = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    expect(isCreatingAuxiliaryWord(newLetter, currentBoard)).toBeFalsy()
  })
})

describe('areLettersInEmptySpots', () => {
  it('handles valid case', () => {
    const newLetters = [
      {
        letter: 'p',
        x: 4,
        y: 4,
      },
      {
        letter: 'o',
        x: 5,
        y: 4,
      },
      {
        letter: 'd',
        x: 6,
        y: 4,
      },
      {
        letter: 'u',
        x: 8,
        y: 4,
      },
      {
        letter: 'm',
        x: 9,
        y: 4,
      },
    ]
    const currentBoard = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    expect(areLettersInEmptySpots(newLetters, currentBoard)).toBeTruthy()
  })
  it('handles invalid case', () => {
    const newLetters = [
      {
        letter: 'p',
        x: 7,
        y: 3,
      },
    ]
    const currentBoard = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    expect(areLettersInEmptySpots(newLetters, currentBoard)).toBeFalsy()
  })
})

describe('getAllNewWords', () => {
  it('Works with case 6 - simple crossword', () => {
    const currentLetters = [
      {
        letter: 'l',
        x: 7,
        y: 3,
      },
      {
        letter: 'i',
        x: 7,
        y: 4,
      },
      {
        letter: 'c',
        x: 7,
        y: 5,
      },
      {
        letter: 'k',
        x: 7,
        y: 6,
      },
      {
        letter: 's',
        x: 7,
        y: 7,
      },
    ]

    const newLetters = [
      {
        letter: 'd',
        x: 6,
        y: 4,
      },
      {
        letter: 'p',
        x: 4,
        y: 4,
      },
      {
        letter: 'u',
        x: 8,
        y: 4,
      },
      {
        letter: 'o',
        x: 5,
        y: 4,
      },

      {
        letter: 'm',
        x: 9,
        y: 4,
      },
    ]
    expect(getAllNewWords(newLetters, currentLetters)).toEqual([
      [
        {
          letter: 'p',
          x: 4,
          y: 4,
        },
        {
          letter: 'o',
          x: 5,
          y: 4,
        },
        {
          letter: 'd',
          x: 6,
          y: 4,
        },
        {
          letter: 'i',
          x: 7,
          y: 4,
        },
        {
          letter: 'u',
          x: 8,
          y: 4,
        },
        {
          letter: 'm',
          x: 9,
          y: 4,
        },
      ],
    ])
  })
  it('words with case 1', () => {
    const newLetters = [
      {
        letter: 'o',
        x: 2,
        y: 1,
      },
      {
        letter: 's',
        x: 2,
        y: 3,
      },
    ]

    const board = [
      { letter: 'm', x: 0, y: 0 },
      { letter: 'e', x: 0, y: 1 },
      { letter: 't', x: 0, y: 2 },
      { letter: 'o', x: 1, y: 0 },
      { letter: 'o', x: 1, y: 2 },
      { letter: 'v', x: 2, y: 0 },
      { letter: 'w', x: 2, y: 2 },
      { letter: 'e', x: 3, y: 0 },
      { letter: 'e', x: 3, y: 2 },
      { letter: 'r', x: 4, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        {
          letter: 'v',
          x: 2,
          y: 0,
        },
        {
          letter: 'o',
          x: 2,
          y: 1,
        },
        {
          letter: 'w',
          x: 2,
          y: 2,
        },
        {
          letter: 's',
          x: 2,
          y: 3,
        },
      ],
    ])
  })
  it('words with case 2', () => {
    const newLetters = [
      {
        letter: 'r',
        x: 0,
        y: 0,
      },
      {
        letter: 'e',
        x: 1,
        y: 0,
      },
    ]

    const board = [
      { letter: 'm', x: 2, y: 0 },
      { letter: 'e', x: 2, y: 1 },
      { letter: 't', x: 2, y: 2 },
      { letter: 'o', x: 3, y: 0 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'v', x: 4, y: 0 },
      { letter: 'w', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 0 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'r', x: 6, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'r', x: 0, y: 0 },
        { letter: 'e', x: 1, y: 0 },
        { letter: 'm', x: 2, y: 0 },
        { letter: 'o', x: 3, y: 0 },
        { letter: 'v', x: 4, y: 0 },
        { letter: 'e', x: 5, y: 0 },
      ],
    ])
  })
  it('words with case 3', () => {
    const newLetters = [
      {
        letter: 'r',
        x: 0,
        y: 0,
      },
      {
        letter: 'e',
        x: 1,
        y: 0,
      },
      {
        letter: 's',
        x: 6,
        y: 0,
      },
    ]

    const board = [
      { letter: 'm', x: 2, y: 0 },
      { letter: 'e', x: 2, y: 1 },
      { letter: 't', x: 2, y: 2 },
      { letter: 'o', x: 3, y: 0 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'v', x: 4, y: 0 },
      { letter: 'w', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 0 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'r', x: 6, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'r', x: 0, y: 0 },
        { letter: 'e', x: 1, y: 0 },
        { letter: 'm', x: 2, y: 0 },
        { letter: 'o', x: 3, y: 0 },
        { letter: 'v', x: 4, y: 0 },
        { letter: 'e', x: 5, y: 0 },
        { letter: 's', x: 6, y: 0 },
      ],
    ])
  })
  it('words with case 4', () => {
    const newLetters = [
      {
        letter: 'v',
        x: 3,
        y: 1,
      },
      {
        letter: 'r',
        x: 5,
        y: 1,
      },
    ]

    const board = [
      { letter: 'm', x: 2, y: 0 },
      { letter: 'e', x: 2, y: 1 },
      { letter: 't', x: 2, y: 2 },

      { letter: 'o', x: 3, y: 0 },
      { letter: 'e', x: 3, y: 2 },

      { letter: 'v', x: 4, y: 0 },
      { letter: 'e', x: 4, y: 1 },
      { letter: 'r', x: 4, y: 2 },
      { letter: 'y', x: 4, y: 3 },

      { letter: 'e', x: 5, y: 0 },
      { letter: 'r', x: 5, y: 1 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'e', x: 2, y: 1 },
        { letter: 'v', x: 3, y: 1 },
        { letter: 'e', x: 4, y: 1 },
        { letter: 'r', x: 5, y: 1 },
      ],
      [
        { letter: 'o', x: 3, y: 0 },
        { letter: 'v', x: 3, y: 1 },
        { letter: 'e', x: 3, y: 2 },
      ],
      [
        { letter: 'e', x: 5, y: 0 },
        { letter: 'r', x: 5, y: 1 },
      ],
    ])
  })
  it('words with case 5', () => {
    const newLetters = [
      { letter: 's', x: 6, y: 0 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 'r', x: 6, y: 2 },
      { letter: 'v', x: 6, y: 3 },
      { letter: 'e', x: 6, y: 4 },
    ]

    const board = [
      { letter: 'm', x: 2, y: 0 },
      { letter: 'e', x: 2, y: 1 },
      { letter: 't', x: 2, y: 2 },

      { letter: 'o', x: 3, y: 0 },
      { letter: 'o', x: 3, y: 2 },

      { letter: 'v', x: 4, y: 0 },
      { letter: 'w', x: 4, y: 2 },

      { letter: 'e', x: 5, y: 0 },
      { letter: 'e', x: 5, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 's', x: 6, y: 0 },
        { letter: 'e', x: 6, y: 1 },
        { letter: 'r', x: 6, y: 2 },
        { letter: 'v', x: 6, y: 3 },
        { letter: 'e', x: 6, y: 4 },
      ],
      [
        { letter: 'm', x: 2, y: 0 },
        { letter: 'o', x: 3, y: 0 },
        { letter: 'v', x: 4, y: 0 },
        { letter: 'e', x: 5, y: 0 },
        { letter: 's', x: 6, y: 0 },
      ],
      [
        { letter: 't', x: 2, y: 2 },
        { letter: 'o', x: 3, y: 2 },
        { letter: 'w', x: 4, y: 2 },
        { letter: 'e', x: 5, y: 2 },
        { letter: 'r', x: 6, y: 2 },
      ],
    ])
  })
  it('words with case 7', () => {
    const newLetters = [
      { letter: 'v', x: 5, y: 1 },
      { letter: 'r', x: 5, y: 3 },
    ]

    const board = [
      { letter: 'm', x: 2, y: 0 },
      { letter: 'e', x: 2, y: 1 },
      { letter: 't', x: 2, y: 2 },

      { letter: 'o', x: 3, y: 0 },
      { letter: 'o', x: 3, y: 2 },

      { letter: 'v', x: 4, y: 0 },
      { letter: 'w', x: 4, y: 2 },
      { letter: 'e', x: 4, y: 3 },

      { letter: 'e', x: 5, y: 0 },
      { letter: 'e', x: 5, y: 2 },

      { letter: 'r', x: 6, y: 0 },
      { letter: 'r', x: 6, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'e', x: 5, y: 0 },
        { letter: 'v', x: 5, y: 1 },
        { letter: 'e', x: 5, y: 2 },
        { letter: 'r', x: 5, y: 3 },
      ],
      [
        { letter: 'e', x: 4, y: 3 },
        { letter: 'r', x: 5, y: 3 },
      ],
    ])
  })
  it('words with case -  lisa 1', () => {
    const newLetters = [
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
    ]

    const board = []

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'c', x: 3, y: 1 },
        { letter: 'o', x: 3, y: 2 },
        { letter: 'o', x: 3, y: 3 },
        { letter: 'k', x: 3, y: 4 },
        { letter: 'i', x: 3, y: 5 },
        { letter: 'e', x: 3, y: 6 },
      ],
    ])
  })
  it('words with case -  lisa 2', () => {
    const newLetters = [
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
    ]

    const board = [
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'c', x: 3, y: 1 },
        { letter: 'a', x: 4, y: 1 },
        { letter: 'k', x: 5, y: 1 },
        { letter: 'e', x: 6, y: 1 },
      ],
    ])
  })
  it('words with case -  lisa 2', () => {
    const newLetters = [
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
    ]

    const board = [
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 't', x: 4, y: 0 },
        { letter: 'a', x: 4, y: 1 },
        { letter: 'n', x: 4, y: 2 },
      ],
      [
        { letter: 'o', x: 3, y: 2 },
        { letter: 'n', x: 4, y: 2 },
      ],
    ])
  })
  it('words with case -  lisa 3', () => {
    const newLetters = [
      { letter: 'e', x: 5, y: 2 },
      { letter: 'p', x: 5, y: 3 },
      { letter: 't', x: 5, y: 4 },
    ]

    const board = [
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'k', x: 5, y: 1 },
        { letter: 'e', x: 5, y: 2 },
        { letter: 'p', x: 5, y: 3 },
        { letter: 't', x: 5, y: 4 },
      ],
      [
        { letter: 'o', x: 3, y: 2 },
        { letter: 'n', x: 4, y: 2 },
        { letter: 'e', x: 5, y: 2 },
      ],
    ])
  })
  it('words with case -  lisa 4', () => {
    const newLetters = [
      { letter: 'o', x: 4, y: 3 },
      { letter: 's', x: 6, y: 3 },
      //  { letter: '', x: , y:  },
    ]

    const board = [
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'p', x: 5, y: 3 },
      { letter: 't', x: 5, y: 4 },
      { letter: 'p', x: 1, y: 2 },
      { letter: 'h', x: 2, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'o', x: 3, y: 3 },
        { letter: 'o', x: 4, y: 3 },
        { letter: 'p', x: 5, y: 3 },
        { letter: 's', x: 6, y: 3 },
      ],
      [
        { letter: 't', x: 4, y: 0 },
        { letter: 'a', x: 4, y: 1 },
        { letter: 'n', x: 4, y: 2 },
        { letter: 'o', x: 4, y: 3 },
      ],
    ])
    // expect(getAllNewWords(newLetters, board)).toEqual()
  })
  it('words with case -  lisa 5', () => {
    const newLetters = [
      { letter: 'm', x: 6, y: 0 },
      { letter: 's', x: 6, y: 2 },
      //  { letter: '', x: , y:  },
    ]

    const board = [
      { letter: 'o', x: 4, y: 3 },
      { letter: 's', x: 6, y: 3 },
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'p', x: 5, y: 3 },
      { letter: 't', x: 5, y: 4 },
      { letter: 'p', x: 1, y: 2 },
      { letter: 'h', x: 2, y: 2 },
    ]
    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'm', x: 6, y: 0 },
        { letter: 'e', x: 6, y: 1 },
        { letter: 's', x: 6, y: 2 },
        { letter: 's', x: 6, y: 3 },
      ],
      [
        { letter: 'p', x: 1, y: 2 },
        { letter: 'h', x: 2, y: 2 },
        { letter: 'o', x: 3, y: 2 },
        { letter: 'n', x: 4, y: 2 },
        { letter: 'e', x: 5, y: 2 },
        { letter: 's', x: 6, y: 2 },
      ],
    ])

    // expect(getAllNewWords(newLetters, board)).toEqual()
  })
  it('words with case -  lisa 6', () => {
    const newLetters = [
      { letter: 'i', x: 4, y: 4 },
      { letter: 'u', x: 2, y: 4 },
      //  { letter: '', x: , y:  },
    ]

    const board = [
      { letter: 'u', x: 1, y: 3 },
      { letter: 's', x: 1, y: 4 },
      { letter: 's', x: 1, y: 5 },
      { letter: 'y', x: 1, y: 6 },
      { letter: 'm', x: 6, y: 0 },
      { letter: 's', x: 6, y: 2 },
      { letter: 'o', x: 4, y: 3 },
      { letter: 's', x: 6, y: 3 },
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'p', x: 5, y: 3 },
      { letter: 't', x: 5, y: 4 },
      { letter: 'p', x: 1, y: 2 },
      { letter: 'h', x: 2, y: 2 },
    ]
    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 's', x: 1, y: 4 },
        { letter: 'u', x: 2, y: 4 },
        { letter: 'k', x: 3, y: 4 },
        { letter: 'i', x: 4, y: 4 },
        { letter: 't', x: 5, y: 4 },
      ],
      [
        { letter: 't', x: 4, y: 0 },
        { letter: 'a', x: 4, y: 1 },
        { letter: 'n', x: 4, y: 2 },
        { letter: 'o', x: 4, y: 3 },
        { letter: 'i', x: 4, y: 4 },
      ],
    ])

    // expect(getAllNewWords(newLetters, board)).toEqual()
  })
  it('words with case -  lisa 7', () => {
    const newLetters = [
      { letter: 't', x: 2, y: 0 },
      { letter: 'o', x: 3, y: 0 },
      { letter: 'e', x: 5, y: 0 },
      //  { letter: '', x: , y:  },
    ]

    const board = [
      { letter: 'i', x: 4, y: 4 },
      { letter: 'u', x: 2, y: 4 },
      { letter: 'u', x: 1, y: 3 },
      { letter: 's', x: 1, y: 4 },
      { letter: 's', x: 1, y: 5 },
      { letter: 'y', x: 1, y: 6 },
      { letter: 'm', x: 6, y: 0 },
      { letter: 's', x: 6, y: 2 },
      { letter: 'o', x: 4, y: 3 },
      { letter: 's', x: 6, y: 3 },
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'p', x: 5, y: 3 },
      { letter: 't', x: 5, y: 4 },
      { letter: 'p', x: 1, y: 2 },
      { letter: 'h', x: 2, y: 2 },
    ]
    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 't', x: 2, y: 0 },
        { letter: 'o', x: 3, y: 0 },
        { letter: 't', x: 4, y: 0 },
        { letter: 'e', x: 5, y: 0 },
        { letter: 'm', x: 6, y: 0 },
      ],
      [
        { letter: 'o', x: 3, y: 0 },
        { letter: 'c', x: 3, y: 1 },
        { letter: 'o', x: 3, y: 2 },
        { letter: 'o', x: 3, y: 3 },
        { letter: 'k', x: 3, y: 4 },
        { letter: 'i', x: 3, y: 5 },
        { letter: 'e', x: 3, y: 6 },
      ],
      [
        { letter: 'e', x: 5, y: 0 },
        { letter: 'k', x: 5, y: 1 },
        { letter: 'e', x: 5, y: 2 },
        { letter: 'p', x: 5, y: 3 },
        { letter: 't', x: 5, y: 4 },
      ],
    ])

    // expect(getAllNewWords(newLetters, board)).toEqual()
  })
  it('words with case -  lisa 8', () => {
    const newLetters = [
      { letter: 'p', x: 2, y: 3 },
      //  { letter: '', x: , y:  },
    ]

    const board = [
      { letter: 't', x: 2, y: 0 },
      { letter: 'o', x: 3, y: 0 },
      { letter: 'e', x: 5, y: 0 },
      { letter: 'i', x: 4, y: 4 },
      { letter: 'u', x: 2, y: 4 },
      { letter: 'u', x: 1, y: 3 },
      { letter: 's', x: 1, y: 4 },
      { letter: 's', x: 1, y: 5 },
      { letter: 'y', x: 1, y: 6 },
      { letter: 'm', x: 6, y: 0 },
      { letter: 's', x: 6, y: 2 },
      { letter: 'o', x: 4, y: 3 },
      { letter: 's', x: 6, y: 3 },
      { letter: 'c', x: 3, y: 1 },
      { letter: 'o', x: 3, y: 2 },
      { letter: 'o', x: 3, y: 3 },
      { letter: 'k', x: 3, y: 4 },
      { letter: 'i', x: 3, y: 5 },
      { letter: 'e', x: 3, y: 6 },
      { letter: 'a', x: 4, y: 1 },
      { letter: 'k', x: 5, y: 1 },
      { letter: 'e', x: 6, y: 1 },
      { letter: 't', x: 4, y: 0 },
      { letter: 'n', x: 4, y: 2 },
      { letter: 'e', x: 5, y: 2 },
      { letter: 'p', x: 5, y: 3 },
      { letter: 't', x: 5, y: 4 },
      { letter: 'p', x: 1, y: 2 },
      { letter: 'h', x: 2, y: 2 },
    ]

    expect(getAllNewWords(newLetters, board)).toEqual([
      [
        { letter: 'h', x: 2, y: 2 },
        { letter: 'p', x: 2, y: 3 },
        { letter: 'u', x: 2, y: 4 },
      ],
      [
        { letter: 'u', x: 1, y: 3 },
        { letter: 'p', x: 2, y: 3 },
        { letter: 'o', x: 3, y: 3 },
        { letter: 'o', x: 4, y: 3 },
        { letter: 'p', x: 5, y: 3 },
        { letter: 's', x: 6, y: 3 },
      ],
    ])
  })
})

describe('real game', () => {
  it('can handle valid word', () => {
    const currentBoard = [
      { letter: 'b', x: 7, y: 3 },
      { letter: 'o', x: 7, y: 4 },
      { letter: 'a', x: 7, y: 5 },
      { letter: 's', x: 7, y: 6 },
      { letter: 't', x: 7, y: 7 },
      { letter: 'j', x: 4, y: 6 },
      { letter: 'o', x: 5, y: 6 },
      { letter: 'g', x: 6, y: 6 },
      { letter: 'l', x: 8, y: 3 },
      { letter: 'o', x: 9, y: 3 },
      { letter: 'w', x: 10, y: 3 },
      { letter: 'n', x: 11, y: 3 },
      { letter: 'z', x: 5, y: 5 },
      { letter: '_n', x: 5, y: 7 },
      { letter: 'e', x: 5, y: 8 },
      { letter: 'o', x: 6, y: 7 },
      { letter: 'r', x: 6, y: 8 },
      { letter: 'e', x: 6, y: 9 },
      { letter: 'f', x: 11, y: 1 },
      { letter: 'i', x: 11, y: 2 },
      { letter: 's', x: 11, y: 4 },
      { letter: 'v', x: 12, y: 2 },
      { letter: 'y', x: 13, y: 2 },
      { letter: 'o', x: 13, y: 3 },
      { letter: 'g', x: 13, y: 4 },
      { letter: 'a', x: 13, y: 5 },
      { letter: 'a', x: 12, y: 4 },
      { letter: 'e', x: 14, y: 4 },
      { letter: 'd', x: 5, y: 9 },
      { letter: 'f', x: 7, y: 9 },
      { letter: 'n', x: 14, y: 5 },
      { letter: 'y', x: 14, y: 7 },
      { letter: 'v', x: 14, y: 6 },
      { letter: 'u', x: 7, y: 10 },
      { letter: 'm', x: 7, y: 11 },
      { letter: 'e', x: 7, y: 12 },
      { letter: 't', x: 4, y: 12 },
      { letter: 'i', x: 5, y: 12 },
      { letter: 'd', x: 6, y: 12 },
      { letter: 'i', x: 8, y: 11 },
      { letter: 'l', x: 9, y: 11 },
      { letter: 'e', x: 10, y: 11 },
      { letter: 't', x: 9, y: 2 },
      { letter: 'p', x: 9, y: 4 },
      { letter: 'e', x: 9, y: 5 },
      { letter: 'h', x: 10, y: 10 },
      { letter: 'e', x: 10, y: 12 },
      { letter: 'd', x: 10, y: 13 },
      { letter: 'p', x: 8, y: 5 },
      { letter: 'b', x: 12, y: 7 },
      { letter: 'a', x: 13, y: 7 },
      { letter: 'e', x: 12, y: 8 },
      { letter: 'g', x: 12, y: 9 },
      { letter: 'q', x: 8, y: 8 },
      { letter: 'u', x: 9, y: 8 },
      { letter: 'e', x: 10, y: 8 },
      { letter: '_u', x: 11, y: 8 },
      { letter: 'u', x: 12, y: 10 },
      { letter: 'm', x: 12, y: 11 },
      { letter: 'k', x: 4, y: 10 },
      { letter: 'i', x: 4, y: 11 },
      { letter: 'e', x: 4, y: 13 },
      { letter: 'c', x: 0, y: 13 },
      { letter: 'a', x: 1, y: 13 },
      { letter: 'n', x: 2, y: 13 },
      { letter: 'o', x: 3, y: 13 },
      { letter: 'i', x: 13, y: 9 },
      { letter: 'n', x: 14, y: 9 },
      { letter: 's', x: 7, y: 13 },
      { letter: 'a', x: 8, y: 13 },
      { letter: 'i', x: 9, y: 13 },
    ]
    const letters = [
      { letter: 'i', x: 0, y: 11 },
      { letter: 'i', x: 0, y: 12 },
      { letter: 'i', x: 0, y: 14 },
    ]

    const totalPoints = getTotalTurnPoints(letters, currentBoard)

    expect(totalPoints).toEqual(17)
  })
})
