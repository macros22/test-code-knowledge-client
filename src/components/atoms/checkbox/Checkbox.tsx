import styles from "./Checkbox.module.scss";
import { ForwardedRef, forwardRef } from "react";
import { CheckboxProps } from "./Checkbox.props";

export const Checkbox = forwardRef(
  (
    { className, name, ...props }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <>
        <label className={styles.formControl}>
          <input type="checkbox" ref={ref} {...props} />
          {name && <span>{name}</span>}
        </label>
      </>
    );
  }
);
