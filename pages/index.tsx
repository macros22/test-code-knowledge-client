import Counter from '../component/counter';
import styles from '../styles/Home.module.css'



const Home = () => {
    return (
        <div className={styles.container}>
            <Counter />
        </div>
    )
}

export default Home;