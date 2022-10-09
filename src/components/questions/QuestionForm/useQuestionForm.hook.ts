import React from 'react';
import { ValidationError } from 'yup';
import { questionsCategoryName } from 'libs/constants/names.storage';
import { useQuestions,  } from 'libs/hooks';
import { IQuestionDto, IQuestion } from 'libs/interfaces/questions.interface';
import { schema } from './question.schema';
import { IQuestionFormProps } from './QuestionForm.props';
import { useQuestionsApi } from 'libs/hooks/questions/useQuestionsApi';
import { deepCopy } from 'libs/helpers/deep-copy';

interface IUserAnswer {
    answer: string;
    isChecked: boolean;
}

export const useQuestionForm = ({ questionItem, mode }: Pick<IQuestionFormProps, 'mode' | 'questionItem'>) => {
    const [question, setQuestion] = React.useState<string>(questionItem.question);
    const [questionError, setQuestionError] = React.useState<string>('');
    // const [category, _] = useSessionStorage(questionsCategoryName, 'javascript');

    const [category, setCategory] = React.useState<string>(questionItem.category);

    const [codeExample, setCodeExample] = React.useState<string>(
        questionItem.codeExample
    );
    const [isCodeExampleChecked, setIsCodeExampleChecked] = React.useState<boolean>(true);
    const [codeExampleError, setCodeExampleError] = React.useState<string>('');

    const initialAnswers = questionItem.answers.map((answer) => ({
        answer: answer.answer,
        isChecked: answer.isCorrect,
    }));

    const [answers, setAnswers] = React.useState<IUserAnswer[]>(initialAnswers);
    const [answersErrors, setAnswersErrors] = React.useState<string[]>(
        new Array(questionItem.answers.length).fill('')
    );

    const handleSelectCategory = (e) => {
        setCategory(e.target.value as string);
    }

    const handleAddAnswerButton = () => {
        const newAnswer: IUserAnswer = {
            answer: '',
            isChecked: false,
        }

        setAnswers(answers => {
            const newAnswers: IUserAnswer[] = deepCopy(answers);
            newAnswers.push(newAnswer);
            return newAnswers;
        })
    }

    const handleDeleteAnswerButton = (index: number) => {
        setAnswers(answers => {
            const newAnswers: IUserAnswer[] = deepCopy(answers);
            return newAnswers.filter((_, i) => i !== index);
        })
    }

    const resetErrors = () => {
        setQuestionError('');
        setCodeExampleError('');
        setAnswersErrors(new Array(questionItem.answers.length).fill(''));
    };

    const isValidForm = async () => {
        resetErrors();
        let isValid = true;

        try {
            await schema.validate({
                question,
                codeExample,
                answers,
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                isValid = false;
                console.log(error.path);
                if (error.path == 'question') {
                    setQuestionError(error.errors[0]);
                } else if (error.path == 'codeExample') {
                    setCodeExampleError(error.errors[0]);
                } else if (error.path?.endsWith('.answer')) {
                    // ! TO DO: Refactore this block.
                    const errorIndex = Number(error.path.match(/\d/g)?.join(''));

                    if (errorIndex >= 0) {
                        setAnswersErrors((array) => {
                            const updatedArray = [...array];
                            updatedArray[errorIndex] = (error as ValidationError).errors[0];
                            return updatedArray;
                        });
                    }
                }
            }
        }

        return isValid;
    };

    const { api } = useQuestionsApi();
    const { mutateQuestions } = useQuestions({ category });
    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        const questionPayload = {
            question,
            category,
            codeExample,
            answers: answers.map((answer) => ({
                answer: answer.answer,
                isCorrect: answer.isChecked,
            })),
            tags: []
        } as IQuestionDto;

        if (await isValidForm()) {
            switch (mode) {
                case 'add':
                    try {
                        await api.postQuestion(questionPayload)
                        mutateQuestions();
                        // setIsModalOpen(false);
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case 'edit':
                    try {
                        await api.patchQuestion(questionPayload, questionItem.id)
                        mutateQuestions();
                        // setIsModalOpen(false);
                    } catch (error) {
                        console.log(error);
                    }
                    break;
            }
        }
    };

    const handleResetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setQuestion(questionItem.question);
        setCodeExample(questionItem.codeExample);
        setCategory(questionItem.category);
        setAnswers(initialAnswers);
    };

    return {
        question,
        setQuestion,
        questionError,
        setQuestionError,
        category,
        setCategory,
        codeExample,
        setCodeExample,
        isCodeExampleChecked,
        setIsCodeExampleChecked,
        codeExampleError,
        setCodeExampleError,
        answers,
        setAnswers,
        answersErrors,
        setAnswersErrors,
        handleSelectCategory,
        handleAddAnswerButton,
        handleDeleteAnswerButton,
        resetErrors,
        handleSubmitForm,
        handleResetButton,
    }
};
