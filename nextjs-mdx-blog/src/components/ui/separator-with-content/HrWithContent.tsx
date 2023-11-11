import { HrWithContentProps } from './HrWithContent.props';
import cn from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const SeparatorWithContent = forwardRef(
  (
    { children, className, ...props }: HrWithContentProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn('block text-center overflow-hidden whitespace-nowrap', className,)}
        ref={ref}
        {...props}
      >
    {/* right: 100%;
    margin-right: $spacer; */}
        <span className="relative inline-block  before:right-full before:mr-2 before:content-[''] before:absolute before:top-1/2 before:w-full before:h-1 before:bg-slate-400"> {children}</span>
      </div>
    );
  }
);
