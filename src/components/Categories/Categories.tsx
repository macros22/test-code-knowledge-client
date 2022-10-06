import styles from './Categories.module.scss';
import { ICategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { Button, Row, Spinner, Stack } from 'react-bootstrap';
import React from 'react';
import { useQuestionsInfo } from 'hooks';

export const Categories = ({
	// questionsInfo,
}: ICategoriesProps): JSX.Element => {
	const router = useRouter();

	const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();

	const showQuestionsButtonHandler = (category: string) => () => {
		router.replace(`/questions/${questionsInfo[category].categoryURLName}`);
	};

	const passTestButtonHandler = (category: string) => () => {
		const categoryQuestionsAmount = questionsInfo[category].amount;
		const defaultQuestionsForTestSize = 5;

		const sizeInQuery =
			categoryQuestionsAmount < defaultQuestionsForTestSize
				? categoryQuestionsAmount
				: defaultQuestionsForTestSize;
		router.push(`/test/${questionsInfo[category].categoryURLName}?questionsAmount=${sizeInQuery}`);
	};

	if (isLoadingQuestionsInfo) {
		return (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />);
	}

	return (
		<div className={styles.wrapper}>
			{Object.keys(questionsInfo).map((category) => {
				return (
					<>
						<div className={styles.card}>

							<h4 className={styles.cardTitle}>
								<span className={styles.cardBracket}>{'{ '}</span>
								{category}
								<span className={styles.cardBracket}>{' }'}</span>
							</h4>
							<hr />
							<Stack gap={3}>
								<Button
									size="lg"
									variant="danger"
									onClick={showQuestionsButtonHandler(
										category
									)}>
									Questions: {questionsInfo[category].amount}
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
