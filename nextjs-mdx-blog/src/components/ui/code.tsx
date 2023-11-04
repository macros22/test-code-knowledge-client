import React from 'react';
import cn from 'clsx';
import {Highlight, themes} from 'prism-react-renderer';
// import styles from './Code.module.scss';
const styles = {
    pre: {
        // textAlign: 'left',
        overflow: 'auto',
        fontSize: '18px',
        fontWeight: 500,
        margin: 0,
        padding: '12px',
        borderRadius: '5px',
        lineHeight: '16px',
        // overflowX: 'auto !important',


        // min-width: 40vw;
        // overflow: none;
        
        // letter-spacing: 1px;
      
        // max-width: 500px;
        // display: block;
        // width: inherit;
        
        // & .token-line {
        //   line-height: 1.5em;
        //   height: 1.5em;
        // }
      },
      
    //   .line {
    //     display: table-row;
    //   },
      
    // noLine: {
    //     display: table-cell;
    //     text-align: right;
    //     padding-right: $spacer;
    //     user-select: none;
    //     opacity: 0.5;
    //   },
      lineContent:{
        // fontFamily: 'Source Code Pro', monospace !important;
        display: 'tableCell'
      }
};





import { Language } from 'prism-react-renderer';

export interface ICodeProps {
  codeExample: string;
  language: Language;
}


export const Code: React.FC<ICodeProps> = ({ codeExample }) => (
  <Highlight /*{...defaultProps}*/ theme={themes.oceanicNext} code={codeExample} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={cn(className, styles.pre)} style={{...style, ...styles.pre}}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })} className={styles.line}>
            <div className={styles.noLine}>{i + 1}</div>
            <div className={styles.lineContent}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                //   className={styles.lineContent}
                style={{...getTokenProps({ token, key }).style, ...styles.lineContent}}
                />
              ))}
            </div>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);
