import React from 'react';
import { withLayout } from 'layouts';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'libs/helpers/get-param-from-query';
import { useQuestions, useQuestionsInfo, useSessionStorage } from 'libs/hooks';
import { questionsCategoryName } from 'libs/constants/names.storage';
import { Button, Spinner } from 'react-bootstrap';
import {
  IQuestion,
  IQuestionsPageProps
} from 'libs/interfaces/questions.interface';
import { questionsApi } from 'libs/api/questions.api';
import { getQuestionsUrl } from 'libs/helpers/get-questions-url';
import { SWRConfig } from 'swr';
import { QUESTIONS_BASE_URL } from 'libs/constants/urls';
import { ItemsList } from '../../components/ItemsList/ItemsList/ItemsList';
import { LoadItemsButton } from 'components/ItemsList/LoadItemsButton/LoadItemsButton';
import { ITEMS_PER_PAGE } from 'libs/constants/items-per-page';

export const getServerSideProps: GetServerSideProps<
  IQuestionsPageProps
> = async context => {
  const categoryURLName = getQueryParametr(context, 'category') || '';

  const skip = Number(getQueryParametr(context, 'skip')) || 0;
  const limit = Number(getQueryParametr(context, 'limit')) || ITEMS_PER_PAGE;

  const questionsUrl = getQuestionsUrl({
    categoryURLName,
    skip,
    limit
  });

  const questions = await questionsApi().getQuestions(questionsUrl);
  const questionsInfo = await questionsApi().getQuestionsInfo(
    QUESTIONS_BASE_URL
  );
  let category = '';
  if (questionsInfo) {
    category =
      Object.keys(questionsInfo).find(
        key => questionsInfo[key].categoryURLName == categoryURLName
      ) || '';
  }

  return {
    props: {
      category,
      skip,
      limit,
      fallback: {
        [questionsUrl]: questions
      }
    }
  };
};

const QuestionsPage = ({
  category,
  skip,
  limit,
  fallback
}: IQuestionsPageProps): JSX.Element => {
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
  }, [category]);

  if (isLoadingQuestions) {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }

  return (
    <SWRConfig value={{ fallback }}>
      <ItemsList itemsName="questions" items={questions} category={category} />
      <LoadItemsButton skip={skip} limit={limit} category={category} />
    </SWRConfig>
  );
};

export default withLayout('main', QuestionsPage);
