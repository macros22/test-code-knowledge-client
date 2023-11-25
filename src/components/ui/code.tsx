//@ts-nocheck
import cn from 'clsx'
import { Highlight, themes } from 'prism-react-renderer'
// import styles from './Code.module.scss';
const styles = {
  pre: {
    // textAlign: 'left',
    overflow: 'auto',
    fontSize: '18px',
    fontWeight: 500,
    margin: 0,
    padding: '16px',
    borderRadius: '5px',
    lineHeight: '26px',
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

  line: {
    display: 'table-row',
  },

  noLine: {
    display: 'table-cell',
    textAlign: 'right',
    paddingRight: '16px',
    userSelect: 'none',
    opacity: '0.5',
  },
  lineContent: {
    fontFamily: "'Source Code Pro', monospace !important",
    display: 'tableCell',
  },
}

import { Language } from 'prism-react-renderer'

export interface ICodeProps {
  codeExample: string
  language: Language
}

export const Code: React.FC<ICodeProps> = ({ codeExample }) => (
  <Highlight
    /*{...defaultProps}*/ theme={themes.oceanicNext}
    code={codeExample}
    language="jsx"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={cn(className, styles.pre, 'border dark:!bg-transparent')}
        style={{ ...style, ...styles.pre }}
      >
        {tokens.map((line, i) => (
          <div
          key={i}
            {...getLineProps({ line, key: i })}
            style={{ ...getLineProps({ line, key: i }).style, ...styles.line }}
          >

            <div style={styles.noLine}>{i + 1}</div>
            <div style={styles.lineContent}>
              {line.map((token, key) => (
                <span
                key={key}
                  {...getTokenProps({ token, key })}
                  //   className={styles.lineContent}
                  style={{
                    ...getTokenProps({ token, key }).style,
                    ...styles.lineContent,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
