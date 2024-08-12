import type { FC } from 'react'
import classNames from 'classnames'

import type { TFiltersProps } from './types'
import styles from './FilterBar.module.scss'

const Filters: FC<TFiltersProps> = ({ textType, textToggler, onTimeSetClick, totalTime }) => (
  <div className={styles.wrapper}>
    <div className={styles.wrapper__row}>
      <p
        role='button'
        className={classNames(styles.wrapper__text, {
          [styles.wrapper__text__active]: textType.includes('punctuations'),
        })}
        onClick={() => textToggler('punctuations')}
      >
        @ Punctuations
      </p>
      <p
        role='button'
        className={classNames(styles.wrapper__text, {
          [styles.wrapper__text__active]: textType.includes('numbers'),
        })}
        onClick={() => textToggler('numbers')}
      >
        # Numbers
      </p>
    </div>

    <div className={styles.wrapper__line} />

    <div className={styles.wrapper__row}>
      <p className={styles.wrapper__text}>Time:</p>
      {[120, 60, 30, 10].map(time => (
        <p
          key={time}
          role='button'
          onClick={() => onTimeSetClick(time)}
          className={classNames(styles.wrapper__text, {
            [styles.wrapper__text__active]: totalTime === time,
          })}
        >
          {time}
        </p>
      ))}
    </div>
  </div>
)

export default Filters
