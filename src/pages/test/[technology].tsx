import React from 'react';
import { Test } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { withLayout } from 'layouts/MainLayout';
import { GetServerSideProps} from 'next';
import { useSessionStorage } from 'hooks';
import { questionsInStorageName } from 'constants/names.storage';

interface TestPageProps extends Record<string, unknown> {
	technology: string;
	questionsAmount: number;
}

const TestPage = ({
	technology,
	questionsAmount,
}: TestPageProps): JSX.Element => {
	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		technology,
		limit: questionsAmount,
	});

	// Save questions in storage to get them in TestResult page.
	const [_, setQuestionsInStorage] = useSessionStorage(
		questionsInStorageName,
		[]
	);

	React.useEffect(()=> {
		setQuestionsInStorage(questions)
	}, [questions.length])


	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			{questions && questions.length && technology &&(
				<Test questions={questions} technology={technology} />
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps<TestPageProps> = async (
	context
) => {
	const questionsAmount: number = Number(context.query.questionsAmount) || 1;

	let technology: string | string[] = context.query.technology || 'javascript';

	if (Array.isArray(technology)) {
		technology = technology[0];
	}

	return { props: { questionsAmount, technology } };
};

export default withLayout(TestPage);
