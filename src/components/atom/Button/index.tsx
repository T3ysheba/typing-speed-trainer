import { forwardRef, type FC, type ForwardedRef } from 'react'
import classNames from 'classnames'

import type { TSVG } from 'types'
import { Loader } from 'components'

import type { TButtonProps } from './types'
import styles from './Button.module.scss'

const Button: FC<TButtonProps> = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      style,
      onClick,
      className,
      isLoading,
      RightIcon,
      LeftIcon,
      children,
      ariaLabel,
      leftIconSource,
      ariaLabelledby,
      rightIconSource,
      disabled = false,
      type = 'button',
      variant = 'primary',
    },
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const renderContent = isLoading ? 'Loading' : children

    const renderIcon = (Icon?: TSVG | null, position?: 'left' | 'right') => {
      if (Icon) {
        return <Icon />
      }

      if (position === 'left' && leftIconSource) {
        return <img loading='lazy' src={leftIconSource} alt='button_left_icon' width={20} height={20} />
      }

      if (position === 'right' && rightIconSource) {
        return <img loading='lazy' src={rightIconSource} alt='button_right_icon' width={20} height={20} />
      }

      return null
    }

    return (
      <button
        ref={ref}
        type={type}
        style={style}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={classNames(className, styles.wrapper, styles[variant])}
      >
        {isLoading ? <Loader size='20px' color='#fff' /> : renderIcon(LeftIcon, 'left')}
        {renderContent}
        {!isLoading ? renderIcon(RightIcon, 'right') : null}
      </button>
    )
  }
)

export default Button
