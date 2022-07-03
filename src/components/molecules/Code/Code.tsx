import React from "react";
import cn from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";
// import theme from "prism-react-renderer/themes/vsLight";

import styles from "./Code.module.scss";


interface IProps {
  codeExample: string;
}

const exampleCode2 = `
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
    </div>
  );
}
`.trim();

export const Code: React.FC<IProps> = ({ codeExample }) => (
  <Highlight {...defaultProps} theme={theme} code={codeExample} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={cn(className, styles.pre)} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })} className={styles.line}>
            <div className={styles.noLine}>{i + 1}</div>
            <div className={styles.lineContent}>
              {line.map((token, key) => (
                <span  {...getTokenProps({ token, key })} className={styles.lineContent}/>
              ))}
            </div>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

// import React, { useEffect, ReactNode, useState } from "react";
// import Prism, { Token } from "prismjs";

// export interface CodeProps {
//     //Prismjs supports a lot more languages. The entire list can be found on the site,
//     //this is a list of those languages that will be useful to me.
//     language: 'js' | 'css' | 'json' | 'jsx' | 'typescript' | 'yml' | 'Rust' | 'bash',
//     children: string
// }

// //We will use the tokenize method (https://prismjs.com/docs/Prism.html#.tokenize).
// //Because other API methods directly manipulate DOM, and that’s not what we want.
// //tokenToReactNode is our function that converts the result of executing tokenize into react components.
// function tokenToReactNode(token: Token | string, i: number): ReactNode {
//     if (typeof token === "string") {
//         return <span key={i}>{token}</span>
//     } else if (typeof token.content === "string") {
//         return (<span key={i} className={`token ${token.type}`}>{token.content}</span>)
//     } else if (Array.isArray(token.content)) {
//         return <span key={i} className={`token ${token.type}`}>{token.content.map(tokenToReactNode)}</span>
//     } else {
//         return (<span key={i} className={`token ${token.type}`}>{tokenToReactNode(token.content, 0)}</span>)
//     }
// }

// const Code: React.FC<CodeProps> = ({ language, children }) => {
//     //In the state, we store the code and tokens for the code.
//     const [data, replaceToken] = useState<Array<string | Token>>([])
//     useEffect(() => {
//         //We need to add languages since, by default only markup, CSS, clike, and javascript are available.
//         //I did not find a better way, like the one below, if you know - please submit an issue.
//         import(`prismjs/components/prism-${language}`).then(() => {
//             //If language still not available skip tokenize part
//             const tokens: Array<string | Token> = Prism.languages[language]
//                 ? Prism.tokenize(children, Prism.languages[language])
//                 : [];
//             //Save the result to the state.
//             replaceToken(tokens)
//         }, [children])
//     });
//     //If the array with tokens is empty, print the code from props, otherwise render our beauty.
//     return (
//         <pre className={`language-${language}`}>
//             {data.length ? data.map(tokenToReactNode) : children}
//         </pre>
//     );
// }

// export default Code;
