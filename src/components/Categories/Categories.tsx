import React from 'react';
import Link from 'next/link';
import styles from './Categories.module.scss';
import { ICategoriesProps } from './Categories.props';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import { useQuestionsInfo } from 'libs/hooks';
import { useSnippetsInfo } from 'libs/hooks/items/snippets/useSnippetssInfo';

const Categories = ({ }: ICategoriesProps): JSX.Element => {
	const router = useRouter();

	const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();
	const { snippetsInfo, isLoadingSnippetsInfo } = useSnippetsInfo();

	const passTestButtonHandler = (category: string) => () => {
		const categoryQuestionsAmount = questionsInfo[category].amount;
		const defaultQuestionsForTestSize = 5;

		const sizeInQuery =
			categoryQuestionsAmount < defaultQuestionsForTestSize
				? categoryQuestionsAmount
				: defaultQuestionsForTestSize;
		router.replace(`/test/${questionsInfo[category].categoryURLName}?questionsAmount=${sizeInQuery}`);
	};

	// if (isLoadingQuestionsInfo) {
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
							<h3 className={styles.cardTitle}>
								<span className={styles.cardBracket}>{'{ '}</span>
								{category}
								<span className={styles.cardBracket}>{' }'}</span>
							</h3>

							<hr />

							<div className={styles.cardButtons}>
								<Link
									href={`/questions/${questionsInfo[category].categoryURLName}`}>
									<a className={styles.cardLink}>
										Questions: {questionsInfo[category].amount}
									</a>
								</Link>
								{/* //?skip=0&limit=5 */}
								<Link
									href={`/snippets/${snippetsInfo[category].categoryURLName}`}>
									<a className={styles.cardLink}>
										Snippets: {snippetsInfo[category].amount}
									</a>
								</Link>

								{/* <Button

									variant='secondary'
									onClick={passTestButtonHandler(category)}
								>
									Test
								</Button> */}
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
};

export default Categories;