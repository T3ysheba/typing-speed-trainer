import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react'
import classNames from 'classnames'

import { textGen } from 'store/global/actions'
import { GlobalSelectors } from 'store/global/selectors'
import { useAppDispatch, useAppSelector } from 'libraries/redux'
import { FilterBar, InputTextDisplay, ResultModal } from 'components'

import styles from './Home.module.scss'

const Home: FC = () => {
  const [totalTime, setTotalTime] = useState<number>(30)
  const [countDown, setCountDown] = useState<number>(30)
  const [typedKey, setTypedKey] = useState<string>('')
  const [typedText, setTypedText] = useState<string>('')
  const [textType, setTextType] = useState<string[]>([])
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [incorrectSymbols, setIncorrectSymbols] = useState<number>(0)
  const [isTrainingStarted, setTrainingStart] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const data = useAppSelector(GlobalSelectors.getText)

  const inputRef = useRef<HTMLInputElement | null>(null)

  //Filtering the text
  const filteredText = useCallback(() => {
    if (!data) return ''

    if (textType.includes('punctuations') && !textType.includes('numbers')) {
      return data?.[0].content.toLowerCase()
    }

    if (textType.includes('numbers') && !textType.includes('punctuations')) {
      return data?.[1].content.toLowerCase()
    }

    if (textType.includes('numbers') && textType.includes('punctuations')) {
      return data?.[2].content.toLowerCase()
    }

    if (textType.length === 0) {
      return data?.[3].content.toLowerCase()
    }

    return ''
  }, [data, textType])

  const text = useMemo(() => filteredText(), [filteredText])
  const arrayWithLetters = useMemo(() => text.split(''), [text])

  const startTypingHandler = useCallback((event: KeyboardEvent) => {
    if ((event.key.length === 1 || event.key === 'space') && document.activeElement !== inputRef.current) {
      setTrainingStart(true)
      inputRef.current?.focus()
    }

    setTypedKey(event.key)
  }, [])

  const onClickStartTypingHandler = useCallback(() => {
    setTrainingStart(true)
    inputRef.current?.focus()
  }, [])

  const typingHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (
        text[Number(typedText?.length)] !== typedKey &&
        typedKey.length === 1 &&
        typedKey !== 'space' &&
        !isModalOpen
      ) {
        setIncorrectSymbols(prev => prev + 1)
      }

      if (!isModalOpen) {
        setTypedText(event.target.value)
      }
    },
    [isModalOpen, text, typedKey, typedText?.length]
  )

  const clearAndReset = useCallback(() => {
    setTypedKey('')
    setTypedText('')
    setIncorrectSymbols(0)
    setTrainingStart(false)
    setCountDown(totalTime)
  }, [totalTime])

  const onTimeSetClick = useCallback(
    (time: number) => {
      clearAndReset()

      setTotalTime(time)
      setCountDown(time)
    },
    [clearAndReset]
  )

  //opens modal or close
  const modalToggler = useCallback(
    (state: boolean) => {
      if (!state) {
        clearAndReset()
        inputRef.current?.blur()
      }

      setModalOpen(state)
    },
    [clearAndReset]
  )

  //toggles filters in filterBar component
  const textToggler = useCallback(
    (state: string) => {
      if (textType.includes(state)) {
        clearAndReset()

        const newTextTypes = textType.filter(item => item !== state)

        setTextType(newTextTypes)
      } else {
        clearAndReset()

        setTextType(prev => [...prev, state])
      }
    },

    [clearAndReset, textType]
  )

  const onRestartButtonClick = () => {
    modalToggler(false)

    setTrainingStart(true)
  }

  // WPM and Accuracy calculator
  const getWpmAndAccuracy = useCallback(() => {
    const totalWords = typedText.split(' ').length || 0

    const minutes = totalTime / 60
    const wpm = minutes > 0 ? Math.round(totalWords / minutes) : 0
    const accuracy =
      typedText.length > 0 ? Math.round(((typedText.length - incorrectSymbols) * 100) / typedText.length) : 0

    return {
      wpm,
      accuracy,
    }
  }, [incorrectSymbols, totalTime, typedText])

  useEffect(() => {
    dispatch(textGen())
  }, [dispatch])

  useEffect(() => {
    document.addEventListener('keydown', startTypingHandler)

    return () => {
      document.removeEventListener('keydown', startTypingHandler)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Timer
  useEffect(() => {
    if (!countDown) {
      modalToggler(true)
      setTrainingStart(false)

      return
    }

    const timer = setInterval(() => {
      if (isTrainingStarted) {
        setCountDown(prev => prev - 1)
      }
    }, 1000)

    return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, isTrainingStarted])

  return (
    <section className={styles.wrapper}>
      <input
        ref={inputRef}
        value={typedText}
        onChange={typingHandler}
        onPaste={e => e.preventDefault()}
        onDrop={e => e.preventDefault()}
        className={styles.input}
        maxLength={text.length}
      />

      <h1 className={styles.header__title}>TYPING SPEED TRAINER</h1>

      <FilterBar textType={textType} textToggler={textToggler} onTimeSetClick={onTimeSetClick} totalTime={totalTime} />

      <p
        className={classNames(styles.wrapper__filters, styles.wrapper__filters__text, styles.wrapper__countdown, {
          [styles.wrapper__countdown__visible]: isTrainingStarted,
        })}
      >
        {countDown}
      </p>

      <div className={styles.wrapper__tooltip__container}>
        <p
          className={classNames(styles.wrapper__tooltip, {
            [styles.wrapper__tooltip__active]: !isTrainingStarted && !isModalOpen,
          })}
        >
          Type to start or click on the text
        </p>
        <InputTextDisplay onClick={onClickStartTypingHandler} text={arrayWithLetters} typedText={typedText} />
      </div>

      <ResultModal
        isOpen={isModalOpen}
        wpm={getWpmAndAccuracy().wpm}
        onClose={() => modalToggler(false)}
        incorrectSymbols={incorrectSymbols}
        accuracy={getWpmAndAccuracy().accuracy}
        onRestartButtonClick={onRestartButtonClick}
      />
    </section>
  )
}

export default Home
