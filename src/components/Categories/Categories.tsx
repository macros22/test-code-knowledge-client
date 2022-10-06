import styles from './Categories.module.scss';
import { ICategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { Button, Row, Spinner, Stack } from 'react-bootstrap';
import React from 'react';
import { useQuestionsInfo } from 'hooks';
import { useSnippetsInfo } from 'hooks/snippets/useSnippetssInfo';

export const Categories = ({
	// questionsInfo,
}: ICategoriesProps): JSX.Element => {
	const router = useRouter();

	const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();
	const { snippetsInfo, isLoadingSnippetsInfo } = useSnippetsInfo();

	const showQuestionsButtonHandler = (category: string) => () => {
		router.replace(`/questions/${questionsInfo[category].categoryURLName}`);
	};

	const showSnippetsButtonHandler = (category: string) => () => {
		router.replace(`/snippets/${snippetsInfo[category].categoryURLName}`);
	};

	const passTestButtonHandler = (category: string) => () => {
		const categoryQuestionsAmount = questionsInfo[category].amount;
		const defaultQuestionsForTestSize = 5;

		const sizeInQuery =
			categoryQuestionsAmount < defaultQuestionsForTestSize
				? categoryQuestionsAmount
				: defaultQuestionsForTestSize;
		router.replace(`/test/${questionsInfo[category].categoryURLName}?questionsAmount=${sizeInQuery}`);
	};

	if (isLoadingQuestionsInfo || isLoadingSnippetsInfo) {
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
								<span className={styles.cardBracket}>{'{{{ '}</span>
								{category}
								<span className={styles.cardBracket}>{' }}}'}</span>
							</h4>
							<hr />
							{/* <Row gap={3}> */}
							<div className={styles.cardButtons}>
								<Button
									// size="lg"
									// variant="danger"
									onClick={showQuestionsButtonHandler(
										category
									)}>
									Questions: {questionsInfo[category].amount}
								</Button>

								<Button
									// size="lg"
									variant="danger"
									onClick={showSnippetsButtonHandler(
										category
									)}>
									Snippets: {snippetsInfo[category].amount}
								</Button>

								<Button
									// size="lg"
									onClick={passTestButtonHandler(category)}
								>
									Test
								</Button>
							</div>
							{/* </Row> */}
						</div>
					</>
				);
			})}
		</div>
	);
};
