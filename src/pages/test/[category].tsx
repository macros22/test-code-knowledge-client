import React from 'react';
// import { Test } from 'components';
import { withLayout } from 'layouts';
import { GetServerSideProps } from 'next';
import { useQuestionsInfo, useSessionStorage } from 'libs/hooks';
import { questionsCategoryName, questionsInStorageName } from 'libs/constants/names.storage';
import { getQueryParametr } from 'libs/helpers/get-param-from-query';
import { Spinner } from 'react-bootstrap';
import { IQuestion } from 'libs/interfaces/questions.interface';
import { useQuestionsApi } from 'libs/hooks/questions/useQuestionsApi';
import { getRandomQuestionsUrl } from 'libs/helpers/get-questions-url';
import { questionsApi } from 'libs/api/questions.api';
import { QUESTIONS_BASE_URL } from 'libs/constants/urls';

import dynamic from "next/dynamic";
const Test = dynamic(() => import('../../components/test/Test/Test/Test'));
interface ITestPageProps extends Record<string, unknown> {
	category: string;
	questionsAmount: number;
}

export const getServerSideProps: GetServerSideProps<ITestPageProps> = async (
	context
) => {
	const questionsAmount =
		Number(getQueryParametr(context, 'questionsAmount')) || 1;

	const categoryURLName = getQueryParametr(context, 'category') || '';


	const questionsInfo = await questionsApi().getQuestionsInfo(QUESTIONS_BASE_URL);
	let category = '';
	if (questionsInfo) {
		category = Object.keys(questionsInfo).find(key => questionsInfo[key].categoryURLName == categoryURLName) || '';
	}

	return { props: { category, questionsAmount } };
};


const TestPage = ({
	category,
	questionsAmount,
}: ITestPageProps): JSX.Element => {

	const { api } = useQuestionsApi();
	const [questions, setQuestions] = React.useState<IQuestion[] | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const [_, setCategoryInStorage] = useSessionStorage(
		questionsCategoryName,
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

	const { questionsInfo } = useQuestionsInfo();

	React.useEffect(() => {
		if (questionsInfo && category) {
			const questionsUrl = getRandomQuestionsUrl({
				categoryURLName: questionsInfo[category].categoryURLName,
				limit: questionsAmount > 1 ? questionsAmount : 5,
			});

			// setIsLoading(true);
			api.getQuestions(questionsUrl).then(data => {
				setQuestions(data);
				if (data) {
					//@ts-ignore
					setQuestionsInStorage(data);
				}
			});
		}
	}, []);

	if (isLoading) {
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
			{
				questions && questions.length && <Test questions={questions} />
			}
		</>
	);
};

export default withLayout('main', TestPage);
