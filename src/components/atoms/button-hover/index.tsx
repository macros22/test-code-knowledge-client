import styles from "./button-hover.module.scss"

function ButtonHover() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.button}>Center to out</div>
                <div className={styles.button}>Left to Right to Left</div>
                <div className={styles.button}>Left to Right to Right</div>
                <div className={styles.button}>Top to Bottom to Top</div>
                <div className={styles.button}>Skew Fill Left to Right</div>
                {/* <div className={styles.button}>Flex Grow</div> */}
                <div className={styles.button}>Rounded Corners</div>
                <div className={styles.button}>Scale</div>
                <div className={styles.button}>Border (Inner Shadow)</div>
                <div className={styles.button}>Border (Outer Shadow)</div>
            </div>
        </div>
    )
}

export default ButtonHover;