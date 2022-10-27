import React from 'react';
import { withLayout } from 'layouts';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'libs/helpers/get-param-from-query';
import { useQuestions, useQuestionsInfo, useSessionStorage } from 'libs/hooks';
import { questionsCategoryName } from 'libs/constants/names.storage';
import { Button, Spinner } from 'react-bootstrap';
import { IQuestion, IQuestionsPageProps } from 'libs/interfaces/questions.interface';
import { questionsApi } from 'libs/api/questions.api';
import { getQuestionsUrl } from 'libs/helpers/get-questions-url';
import { SWRConfig } from 'swr';
import { QUESTIONS_BASE_URL } from 'libs/constants/urls';
import { List } from '../../components/ItemsList/List';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps<
	IQuestionsPageProps
> = async (context) => {
	const categoryURLName = getQueryParametr(context, 'category') || '';

	const skip = Number(getQueryParametr(context, 'skip')) || 0;
	const limit = Number(getQueryParametr(context, 'limit')) || 1;
	// const limit = 1;

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

	const { questions, isLoadingQuestions, setSize } = useQuestions({
		skip,
		limit,
		category
	});

	// const router = useRouter();

	// React.useEffect(() => {
	// 	// router.push(``, undefined, { shallow: true });
	// }, [skip, limit])

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
			<Button onClick={() => setSize((s) => s + 1)}>Load more</Button>
		</SWRConfig>
	);
};

// export default QuestionsPage;
export default withLayout('main', QuestionsPage);



