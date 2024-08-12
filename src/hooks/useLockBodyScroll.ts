import { useEffect } from 'react'

const useLockBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    document.body.style.overflow = isOpen ? 'hidden' : 'visible'
    document.body.style.touchAction = isOpen ? 'none' : 'unset'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isOpen])
}

export default useLockBodyScroll
