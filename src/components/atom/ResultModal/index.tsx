import { type FC, Fragment } from 'react'
import { createPortal } from 'react-dom'

import { Button } from 'components'
import { ReloadIcon } from 'assets'
import { useLockBodyScroll } from 'hooks'

import type { TResultModalProps } from './types'
import styles from './ResultModal.module.scss'

const ResultModal: FC<TResultModalProps> = ({
  wpm,
  incorrectSymbols,
  accuracy,
  isOpen,
  onClose,
  onRestartButtonClick,
}) => {
  useLockBodyScroll(isOpen)

  return createPortal(
    <Fragment>
      {isOpen && (
        <div className={styles.wrapper}>
          <div className={styles.wrapper__container}>
            <h4 className={styles.wrapper__title}>Results</h4>

            <div className={styles.wrapper__results__container}>
              <div className={styles.wrapper__row}>
                <p className={styles.wrapper__text}>WPM:</p>

                <p className={styles.wrapper__results}>{wpm}</p>
              </div>

              <div className={styles.wrapper__line} />

              <div className={styles.wrapper__row}>
                <p className={styles.wrapper__text}>Accuracy:</p>

                <p className={styles.wrapper__results}>{accuracy}%</p>
              </div>

              <div className={styles.wrapper__line} />

              <div className={styles.wrapper__row}>
                <p className={styles.wrapper__text}>Total incorrect symbols:</p>

                <p className={styles.wrapper__results}>{incorrectSymbols}</p>
              </div>
            </div>

            <div className={styles.wrapper__button__container}>
              <Button onClick={onClose} variant='secondary' className={styles.wrapper__button}>
                Close
              </Button>

              <Button onClick={onRestartButtonClick} className={styles.wrapper__button} RightIcon={ReloadIcon}>
                Restart
              </Button>
            </div>
          </div>
        </div>
      )}
    </Fragment>,
    document.body
  )
}

export default ResultModal
