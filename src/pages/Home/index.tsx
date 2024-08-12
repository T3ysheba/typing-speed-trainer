import { useCallback, useEffect, useRef, useState, type FC } from 'react'
import classNames from 'classnames'

import { ResultModal } from 'components'
import { textGen } from 'store/global/actions'
import { GlobalSelectors } from 'store/global/selectors'
import { useAppDispatch, useAppSelector } from 'libraries/redux'

import styles from './Home.module.scss'

const Home: FC = () => {
  const [isTrainingStarted, setTrainingStart] = useState<boolean>(false)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [totalTime, setTotalTime] = useState<number>(0)
  const [countDown, setCountDown] = useState<number>(30)
  const [typedKey, setTypedKey] = useState<string>('')
  const [typedText, setTypedText] = useState<string>('')
  const [incorrectSymbols, setIncorrectSymbols] = useState<number>(0)
  const [textType, setTextType] = useState<string[]>([])

  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useAppSelector(GlobalSelectors.getText)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const text = 'focus on fundamentals practice regularly and stay updated'
  const arrayWithLetters = text.split('')

  const startTypingHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === text[0] && document.activeElement !== inputRef.current) {
      setTrainingStart(true)
      inputRef.current?.focus()
    }

    setTypedKey(event.key)
  }, [])

  const modalToggler = (state: boolean) => {
    if (!state) {
      clearAndReset()
    }

    setModalOpen(state)
  }

  const textToggler = (state: string) => {
    if (textType.includes(state)) {
      const newTextTypes = textType.filter(item => item !== state)

      setTextType(newTextTypes)
    } else {
      setTextType(prev => [...prev, state])
    }
  }

  const onClickStartTypingHandler = () => {
    setTrainingStart(true)
    inputRef.current?.focus()
  }

  const typingHandler = useCallback(
    (event: any) => {
      if (text[Number(typedText?.length)] !== typedKey && typedKey !== 'Backspace') {
        setIncorrectSymbols(prev => prev + 1)
      }

      setTypedText(event.target.value)
    },
    [typedKey, typedText?.length]
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

  const getWpmAndAccuracy = useCallback(() => {
    const totalWords = typedText.split(' ')?.length

    const wpm = Math.round(totalWords / (totalTime / 60))

    const accuracy = Math.round(((typedText?.length - incorrectSymbols) * 100) / typedText?.length)

    return {
      wpm,
      accuracy,
    }
  }, [incorrectSymbols, totalTime, typedText])

  const renderText = arrayWithLetters.map((element, index) => (
    <span
      key={index}
      className={classNames(styles.letter, {
        [styles.letter__active]: typedText[index] === element,
        [styles.letter__error]: typedText[index] !== element && typedText.length > index,
      })}
    >
      {element}

      {Number(typedText.length - 1) === index && <span className={classNames(styles.wrapper__line)} />}
    </span>
  ))

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

  useEffect(() => {
    dispatch(textGen())
  }, [dispatch])

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

      <header className={styles.header}>
        <h1 className={styles.header__title}>TYPING SPEED TRAINER</h1>
      </header>

      <div className={styles.wrapper__filters}>
        <p
          role='button'
          className={classNames(styles.wrapper__filters__text, {
            [styles.wrapper__filters__text__active]: textType.includes('punctuations'),
          })}
          onClick={() => textToggler('punctuations')}
        >
          @ Punctuations
        </p>
        <p
          role='button'
          className={classNames(styles.wrapper__filters__text, {
            [styles.wrapper__filters__text__active]: textType.includes('numbers'),
          })}
          onClick={() => textToggler('numbers')}
        >
          # Numbers
        </p>

        <p>|</p>

        <p className={styles.wrapper__filters__text}>Time:</p>
        <p
          role='button'
          onClick={() => onTimeSetClick(120)}
          className={classNames(styles.wrapper__filters__text, {
            [styles.wrapper__filters__text__active]: totalTime === 120,
          })}
        >
          120
        </p>
        <p
          role='button'
          onClick={() => onTimeSetClick(60)}
          className={classNames(styles.wrapper__filters__text, {
            [styles.wrapper__filters__text__active]: totalTime === 60,
          })}
        >
          60
        </p>
        <p
          role='button'
          onClick={() => onTimeSetClick(30)}
          className={classNames(styles.wrapper__filters__text, {
            [styles.wrapper__filters__text__active]: totalTime === 30,
          })}
        >
          30
        </p>

        <p
          role='button'
          onClick={() => onTimeSetClick(10)}
          className={classNames(styles.wrapper__filters__text, {
            [styles.wrapper__filters__text__active]: totalTime === 10,
          })}
        >
          10
        </p>
      </div>
      <p
        className={classNames(styles.wrapper__filters, styles.wrapper__filters__text, styles.wrapper__countdown, {
          [styles.wrapper__countdown__visible]: isTrainingStarted,
        })}
      >
        {countDown}
      </p>

      <div onClick={onClickStartTypingHandler} className={styles.wrapper__text_bar}>
        <p className={styles.wrapper__text_bar__text}>{renderText}</p>
      </div>

      <ResultModal
        wpm={getWpmAndAccuracy().wpm}
        incorrectSymbols={incorrectSymbols}
        accuracy={getWpmAndAccuracy().accuracy}
        isOpen={isModalOpen}
        onClose={() => modalToggler(false)}
      />
    </section>
  )
}

export default Home
