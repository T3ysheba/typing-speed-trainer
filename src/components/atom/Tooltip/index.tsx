import { useEffect, useState, type FC } from 'react'
import classNames from 'classnames'

import type { TTooltipProps } from './types'
import styles from './Tooltip.module.scss'

const Tooltip: FC<TTooltipProps> = ({ children, content, className, showFromStart }) => {
  const [visible, setVisible] = useState(false)

  const mouseEventHandler = (visibleStatus: boolean) => {
    setVisible(visibleStatus)
  }

  useEffect(() => {
    if (showFromStart) {
      setVisible(true)

      const timeoutId = setTimeout(() => {
        setVisible(false)
      }, 2300)

      return () => clearTimeout(timeoutId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={classNames(className, styles.wrapper)}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}
    >
      {children}
      <p className={classNames(styles.wrapper__content, { [styles.wrapper__content__visible]: visible })}>{content}</p>
    </div>
  )
}

export default Tooltip
