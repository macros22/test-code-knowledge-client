import React from 'react';
import { withLayout } from 'layouts';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { useQuestions, useQuestionsInfo, useSessionStorage } from 'hooks';
import { questionsCategoryName } from 'constants/names.storage';
import { Spinner } from 'react-bootstrap';
import { IQuestion } from 'interfaces/questions.interface';
import { questionsApi } from 'libs/questions.api';
import { getQuestionsUrl } from 'helpers/get-questions-url';
import { SWRConfig } from 'swr';
import { List } from 'components/List/List';
import { QUESTIONS_BASE_URL } from 'constants/urls';

interface IQuestionsPageProps extends Record<string, unknown> {
	category: string;
	skip: number;
	limit: number;
	fallback: Record<string, IQuestion[] | null>;
}

export const getServerSideProps: GetServerSideProps<
	IQuestionsPageProps
> = async (context) => {
	const categoryURLName = getQueryParametr(context, 'category') || '';

	const skip = Number(getQueryParametr(context, 'skip'));
	const limit = Number(getQueryParametr(context, 'limit'));

	const questionsUrl = getQuestionsUrl({
		categoryURLName,
		skip,
		limit,
	});

	const questions = await questionsApi().getQuestions(questionsUrl);
	const questionsInfo = await questionsApi().getQuestionsInfo(QUESTIONS_BASE_URL);
	let category = '';
	if (questionsInfo) {
		category = Object.keys(questionsInfo).find(key => questionsInfo[key].categoryURLName == categoryURLName) || '';
	}

	return {
		props: {
			category,
			skip,
			limit,
			fallback: {
				[questionsUrl]: questions
			}
		},

	}

};

const QuestionsPage = ({ category, skip, limit, fallback }: IQuestionsPageProps): JSX.Element => {

	const { questions, isLoadingQuestions } = useQuestions({
		skip,
		limit,
		category
	});

	const [_, setCategoryInStorage] = useSessionStorage(
		questionsCategoryName,
		category
	);

	React.useEffect(() => {
		if (category) {
			setCategoryInStorage(category);
		}
	}, [category])

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
		<SWRConfig value={{ fallback }}>
			<List itemsName='questions' items={questions} category={category} />
		</SWRConfig>
	);
};

export default withLayout('main', QuestionsPage);



