import React from "react";
import cn from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";
import styles from "./Code.module.scss";
import { ICodeProps } from "./Code.props";

export const Code: React.FC<ICodeProps> = ({ codeExample }) => (
  <Highlight {...defaultProps} theme={theme} code={codeExample} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={cn(className, styles.pre)} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })} className={styles.line}>
            <div className={styles.noLine}>{i + 1}</div>
            <div className={styles.lineContent}>
              {line.map((token, key) => (
                <span  {...getTokenProps({ token, key })} className={styles.lineContent} />
              ))}
            </div>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

