import styles from './Categories.module.scss';
import { ICategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { Button, Stack } from 'react-bootstrap';
import React from 'react';
import { useQuestionsInfo } from 'hooks';

export const Categories = ({
	questionsInfo,
}: ICategoriesProps): JSX.Element => {
	const router = useRouter();

	// const { questionsInfo } = useQuestionsInfo();

	const showQuestionsButtonHandler = (category: string) => () => {
		router.push(`/questions/${category}`);
	};

	const passTestButtonHandler = (category: string) => () => {
		const categoryQuestionsAmount = questionsInfo[category];
		const defaultQuestionsForTestSize = 5;

		const sizeInQuery =
			categoryQuestionsAmount < defaultQuestionsForTestSize
				? categoryQuestionsAmount
				: defaultQuestionsForTestSize;
		router.push(`/test/${category}?questionsAmount=${sizeInQuery}`);
	};
	return (
		<div className={styles.wrapper}>
			{Object.keys(questionsInfo).map((category) => {
				return (
					<>
						<div className={styles.card}>
							<h4 className={styles.cardTitle}>{category}</h4>
							<div className={styles.cardContainer}>
								<Stack gap={3}>
									<Button variant="danger" onClick={showQuestionsButtonHandler(
										category
									)}>
										Questions: {questionsInfo[category]}
									</Button>

									<Button
										onClick={passTestButtonHandler(category)}
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
