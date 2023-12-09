import { ButtonHTMLAttributes, FC } from 'react'
import { Button } from '../button'

export interface AmountButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  amount: number
}

export const AmountButton: FC<AmountButtonProps> = ({
  amount,
  children,
  isActive = false,
  ...props
}) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      className={` hover:text-md mr-4 cursor-pointer border  ${
        isActive ? 'border-primary' : ''
      }`}
      {...props}
    >
      {children}

      <span
        className={`ml-2 inline-flex items-center justify-center rounded-full ${
          isActive ? 'opacity-60' : 'text-primary'
        }`}
      >
        {amount}
      </span>
    </Button>
  )
}
