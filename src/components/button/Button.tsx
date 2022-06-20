import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";
// import ArrowIcon from "./arrow.svg";
import cn from "clsx";

export const Button = ({
  appearance,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == "primary",
        [styles.ghost]: appearance == "ghost",
        [styles.disabled]: appearance == "disabled",
      })}
      disabled={appearance == "disabled"}
      {...props}
    >
      {children}
    </button>
  );
};
