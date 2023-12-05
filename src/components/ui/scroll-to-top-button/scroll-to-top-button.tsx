import { useEffect, useState } from 'react'
import { Button } from '../button'
import { cn } from '@/lib/utils'
import { MoveUpIcon } from 'lucide-react'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const scrollListener = (event) => {
      setIsVisible(
        event.srcElement.body.scrollTop > 500 ||
          event.srcElement.documentElement.scrollTop > 500,
      )
    }

    window.addEventListener('scroll', scrollListener)

    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button
      size="lg"
      id="to-top-button"
      onClick={handleScrollToTop}
      title="Go To Top"
      className={cn(
        { hidden: !isVisible },
        'fixed bottom-8 right-8 z-10 border-0 p-3 text-lg font-semibold shadow-md transition-colors duration-300',
      )}
    >
      <MoveUpIcon />
    </Button>
  )
}
