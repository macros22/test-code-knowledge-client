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
					<Card style={{ width: '16rem' }} className="text-center">
						<Card.Header>{category.name}</Card.Header>

						<Card.Body>
							<Stack gap={3}>
								<Image
									src={category.src}
									alt={category.name}
								// width={240}
								// height={200}
								/>

								<Card style={{ padding: '0.75rem' }}>
									<Card.Title onClick={showQuestionsButtonHandler(
										category.name.toLowerCase()
									)}>
										<h4>
											{'Questions: '} <Badge bg="danger"> {questionsListsSizes[category.name.toLowerCase()]}</Badge>
										</h4>
									</Card.Title>
								</Card>

								<Button
									onClick={passTestButtonHandler(category.name.toLowerCase())}
								// className={styles.cardButton}
								// appearance="primary"
								>
									Pass the test
								</Button>
							</Stack>
						</Card.Body>
					</Card>
				);
			})}
		</div>
	);
};
