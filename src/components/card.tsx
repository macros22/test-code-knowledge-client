import Link from "next/link";
import { FunctionComponent } from "react";
import { ArticleMeta } from "../interfaces/article";
import styles from "../styles/card.module.css";

interface IProps {
	article: ArticleMeta;
}

const linkImg = "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

const Card: FunctionComponent<IProps> = ({ article }) => {
	return <Link href={`/article/${article.slug}`}>
		<div className={styles.card}>
			{/* <img src={article.thumbnail} /> */}
			<img src={linkImg} />

			<div className={styles.info}>
				<h1>{article.title}</h1>
				<p>{article.description}</p>
			</div>
		</div>
	</Link>
}

export default Card;