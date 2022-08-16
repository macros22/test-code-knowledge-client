import React from 'react';
import { Test } from 'components';
import { withLayout } from 'layouts';
import { GetServerSideProps } from 'next';
import { useQuestions, useSessionStorage } from 'hooks';
import { categoryName, questionsInStorageName } from 'constants/names.storage';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { Spinner } from 'react-bootstrap';
import { Category } from 'interfaces/questions.interface';

interface TestPageProps extends Record<string, unknown> {
	category: Category;
	questionsAmount: number;
}

export const getServerSideProps: GetServerSideProps<TestPageProps> = async (
	context
) => {
	const questionsAmount =
		Number(getQueryParametr(context, 'questionsAmount')) || 1;

		const categoryStr = getQueryParametr(context, 'category') || 'javascript';

		let category: Category = Category.JAVASCRIPT;
	
		switch (categoryStr) {
			case 'nodejs':
				category = Category.NODEJS;
				break;
			case 'typescript':
				category = Category.TYPESCRIPT;
				break;
			case 'javascript':
			default:
				category = Category.JAVASCRIPT;
		}
	
		return { props: { category, questionsAmount } };
};


const TestPage = ({
	category,
	questionsAmount,
}: TestPageProps): JSX.Element => {
	// const { data: questions = [], isLoading } = useGetQuestionsQuery({
	// 	category,
	// 	limit: questionsAmount,
	// });

	const { questions, isLoadingQuestions } = useQuestions({
		skip: 0,
		limit: questionsAmount,
		category
	});

	const [_, setCategoryInStorage] = useSessionStorage(
		categoryName,
		category
	);

	React.useEffect(() => {
		setCategoryInStorage(category);
	}, [category])

	// Save questions in storage to get them in TestResult page.
	const [__, setQuestionsInStorage] = useSessionStorage(
		questionsInStorageName,
		[]
	);


	React.useEffect(() => {
		//@ts-ignore
		setQuestionsInStorage(questions);
	}, [questions.length]);

	if (isLoadingQuestions) {
		return (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />);
	}

	return (
		<>
			{questions && questions.length && (
				<Test questions={questions} />
			)}
		</>
	);
};

export default withLayout('main', TestPage);
