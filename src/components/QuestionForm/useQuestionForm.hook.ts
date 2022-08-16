import React from 'react';
import { ValidationError } from 'yup';
import { categoryName } from 'constants/names.storage';
import { useQuestions, useSessionStorage } from 'hooks';
import { Category, IQuestionDto, Question } from 'interfaces/questions.interface';
import { schema } from './question.schema';
import { QuestionFormProps } from './QuestionForm.props';
import { useQuestionsApi } from 'hooks/questions/useQuestionsApi';

interface UserAnswer {
    answer: string;
    isChecked: boolean;
}

export const useQuestionForm = ({ questionItem, mode }: Pick<QuestionFormProps, 'mode' | 'questionItem'>) => {
    const [question, setQuestion] = React.useState<string>(questionItem.question);
    const [questionError, setQuestionError] = React.useState<string>('');
    // const [category, _] = useSessionStorage(categoryName, 'javascript');

    const [category, setCategory] = React.useState<Category>(questionItem.category);

    const [codeExample, setCodeExample] = React.useState<string>(
        questionItem.codeExample
    );
    const [isCodeExampleChecked, setIsCodeExampleChecked] = React.useState<boolean>(true);
    const [codeExampleError, setCodeExampleError] = React.useState<string>('');

    const initialAnswers = questionItem.answers.map((answer) => ({
        answer: answer.answer,
        isChecked: answer.isCorrect,
    }));
    const [answers, setAnswers] = React.useState<UserAnswer[]>(initialAnswers);
    const [answersErrors, setAnswersErrors] = React.useState<string[]>(
        new Array(questionItem.answers.length).fill('')
    );

    const handleSelectCategory = (e) => {
        setCategory(e.target.value as Category);
    }


    const handleAddAnswerButton = () => {
        const newAnswer: UserAnswer = {
            answer: '',
            isChecked: false,
        }

        setAnswers(answers => {
            // Deep copy.
            const newAnswers: UserAnswer[] = JSON.parse(
                JSON.stringify(answers)
            );
            newAnswers.push(newAnswer);

            return newAnswers;
        })
    }

    const handleDeleteAnswerButton = (index: number) => {
        setAnswers(answers => {
            // Deep copy.
            const newAnswers: UserAnswer[] = JSON.parse(
                JSON.stringify(answers)
            );
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
    const { mutateQuestions } = useQuestions({category});
    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        const questionPayload = {
            question,
            category: category.toString().toLowerCase(),
            codeExample,
            answers: answers.map((answer) => ({
                answer: answer.answer,
                isCorrect: answer.isChecked,
            })),
        } as IQuestionDto;

        if (await isValidForm()) {
            console.log(questionPayload, questionItem.id);
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
        event.preventDefault();
        // setName(item.name);
        // setDescription(item.description);
        // setCount(item.count);
        // setDestinationCount(item.destinationCount);
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
