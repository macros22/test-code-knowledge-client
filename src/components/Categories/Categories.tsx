import Image from 'next/image';
import styles from './Categories.module.scss';
import { CategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { categories } from 'constants/categories';
import { Card, Button, Stack, Badge, Col, Container, Row } from 'react-bootstrap';

// import { Button, Card, Tag } from 'components';

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
					<>
						<div className={styles.card}>
							<h4 className={styles.cardTitle}>{category.name}</h4>
							<Image
								className={styles.img}
								src={category.src}
								alt={category.name}
								width={280}
								height={280}
							/>
							<div className={styles.cardContainer}>
								<Stack gap={3}>
									<Button variant="danger" onClick={showQuestionsButtonHandler(
										category.name.toLowerCase()
									)}>
										Questions: {questionsListsSizes[category.name.toLowerCase()]}
									</Button>

									<Button
										onClick={passTestButtonHandler(category.name.toLowerCase())}
									>
										Pass the test
									</Button>
								</Stack>
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
};
