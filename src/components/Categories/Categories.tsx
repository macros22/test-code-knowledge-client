import styles from './Categories.module.scss';
import { ICategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { Button, Row, Stack } from 'react-bootstrap';
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

							<h3 className={styles.cardTitle}>
								<span className={styles.cardBracket}>{'{ '}</span>
								{category}
								<span className={styles.cardBracket}>{' }'}</span>
							</h3>
							<hr />
							<Stack gap={3}>

								<Button
									size="lg"
									variant="danger"
									onClick={showQuestionsButtonHandler(
										category
									)}>
									Questions: {questionsInfo[category]}
								</Button>

								<Button
									size="lg"
									onClick={passTestButtonHandler(category)}
								>
									Test
								</Button>

							</Stack>
						</div>
					</>
				);
			})}
		</div>
	);
};
