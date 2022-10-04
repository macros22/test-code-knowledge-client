import { ICardProps } from "./Card.props";
import styles from "./Card.module.scss";
import cn from "clsx";
import { ForwardedRef, forwardRef } from "react";

export const Card = forwardRef(
  (
    { children, className, ...props }: ICardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.card, className, {})} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
