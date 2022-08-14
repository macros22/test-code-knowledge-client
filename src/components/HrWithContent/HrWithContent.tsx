import { HrWithContentProps } from "./HrWithContent.props";
import styles from "./HrWithContent.module.scss";
import cn from "clsx";
import { ForwardedRef, forwardRef } from "react";

export const HrWithContent = forwardRef(
  (
    { children, className, ...props }: HrWithContentProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.hrWithSpan, className, {})} ref={ref} {...props}>
        <span> {children}</span>
      </div>

    );
  }
);
