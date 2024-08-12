import type { FC } from 'react'
import classNames from 'classnames'

import type { TTextDisplayProps } from './types'
import styles from './InputTextDisplay.module.scss'

const InputTextDisplay: FC<TTextDisplayProps> = ({ text, typedText, onClick }) => (
  <div className={styles.wrapper} role='buttons' onClick={onClick}>
    <p className={styles.wrapper__text}>
      {text.map((element, index) => (
        <span
          key={index}
          className={classNames(styles.letter, {
            [styles.letter__active]: typedText[index] === element,
            [styles.letter__error]: typedText[index] !== element && typedText.length > index,
          })}
        >
          {element}

          {typedText.length - 1 === index && <span className={classNames(styles.wrapper__line)} />}
        </span>
      ))}
    </p>
  </div>
)

export default InputTextDisplay
