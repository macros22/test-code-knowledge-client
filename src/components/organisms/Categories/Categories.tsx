import Image from 'next/image';
import styles from './Categories.module.scss';
import { CategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { categories } from 'constants/categories';
import { Button, Tag } from 'components';

export const Categories = ({
	questionsListsSizes,
}: CategoriesProps): JSX.Element => {
	const router = useRouter();

	const showQuestionsButtonHandler = (category: string) => () => {
		router.push(`/questions/${category}`);
	};

	const passTestButtonHandler = (category: string) => () => {
		const categoryQuestionsAmount = questionsListsSizes[category];
		const defaultQuestionsForTestSize = 5;

		const sizeInQuery =
			categoryQuestionsAmount < defaultQuestionsForTestSize
				? categoryQuestionsAmount
				: defaultQuestionsForTestSize;
		router.push(`/test/${category}?questionsAmount=${sizeInQuery}`);
	};

	return (
		<div className={styles.wrapper}>
			{categories.map((category) => {
				return (
					<div className={styles.card}>
						<h3 className={styles.cardTitle}>{category.name}</h3>
						<Image
							className={styles.img}
							src={category.src}
							alt={category.name}
							width={280}
							height={280}
						/>
						<div className={styles.cardContainer}>
							<div className={styles.cardQuestionsInfo}>
								<Button
									onClick={showQuestionsButtonHandler(
										category.name.toLowerCase()
									)}
									appearance="ghost"
								>
									Show questions
								</Button>
								<Tag size="lg" className={styles.cardTag} color="error">
									{questionsListsSizes[category.name.toLowerCase()]}
								</Tag>
							</div>
							<Button
								onClick={passTestButtonHandler(category.name.toLowerCase())}
								className={styles.cardButton}
								appearance="primary"
							>
								Pass the test
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
