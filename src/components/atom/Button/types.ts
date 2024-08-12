import type { CSSProperties, ReactNode } from 'react'

import type { TSVG } from 'types'

export type TButtonProps = {
  LeftIcon?: TSVG
  RightIcon?: TSVG
  disabled?: boolean
  className?: string
  ariaLabel?: string
  isLoading?: boolean
  children?: ReactNode
  onClick?: () => void
  style?: CSSProperties
  leftIconSource?: string
  ariaLabelledby?: string
  rightIconSource?: string
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
}
