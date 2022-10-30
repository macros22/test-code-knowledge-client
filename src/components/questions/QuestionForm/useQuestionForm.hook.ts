import React from 'react';
import { ValidationError } from 'yup';
import { useQuestions, useQuestionsApi } from 'libs/hooks';
import { IQuestionDto, IQuestion, IUserAnswer } from 'libs/interfaces/questions.interface';
import { schema } from './question.schema';
import { IQuestionFormProps } from './QuestionForm.props';
import { deepCopy } from 'libs/helpers/deep-copy';
import { IInfoLink } from 'libs/interfaces/common.interface';

export const useQuestionForm = ({ questionItem, mode }: Pick<IQuestionFormProps, 'mode' | 'questionItem'>) => {

    // Category.
    const [category, setCategory] = React.useState<string>(questionItem.category);

    const handleSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value as string);
    }

    // Question.
    const [question, setQuestion] = React.useState<string>(questionItem.question);
    const [questionError, setQuestionError] = React.useState<string>('');

    // Code example.
    const [codeExample, setCodeExample] = React.useState<string>(
        questionItem.codeExample
    );
    const [isCodeExampleChecked, setIsCodeExampleChecked] = React.useState<boolean>(true);
    const [codeExampleError, setCodeExampleError] = React.useState<string>('');

    // Answers.
    const initialAnswers = questionItem.answers.map((answer) => ({
        answer: answer.answer,
        isChecked: answer.isCorrect,
    }));

    const [answers, setAnswers] = React.useState<IUserAnswer[]>(initialAnswers);
    const [answersErrors, setAnswersErrors] = React.useState<string[]>(
        new Array(questionItem.answers.length).fill('')
    );

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

    // Tags.
    const [tags, setTags] = React.useState<string[]>(questionItem.tags);
    const [tagsErrors, setTagsErrors] = React.useState<string[]>(
        new Array(questionItem.tags.length).fill('')
    );

    const handleDeleteTagButton = (index: number) => {
        setTags(tags => {
            return tags.filter((_, i) => i !== index);
        })
    }

    const handleAddTagButton = () => {
        setTags(tags => [...tags, '']);
    }

    // InfoLinks.
    const [infoLinks, setInfoLinks] = React.useState<IInfoLink[]>(questionItem.infoLinks);
    const [infoLinksErrors, setInfoLinksErrors] = React.useState<string[]>(
        new Array(questionItem.infoLinks.length).fill('')
    );

    // Reset errors before form validation.
    const resetErrors = () => {
        setQuestionError('');
        setCodeExampleError('');
        setAnswersErrors(new Array(answers.length).fill(''));
        setTagsErrors(new Array(tags.length).fill(''));
        setInfoLinksErrors(new Array(infoLinks.length).fill(''));
    };

    const isValidForm = async () => {
        resetErrors();
        let isValid = true;

        try {
            await schema.validate({
                question,
                codeExample,
                answers,
                tags,
                infoLinks
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
                } else if (error.path?.startsWith('tags')) {
                    // ! TO DO: Refactore this block.
                    const errorIndex = Number(error.path.match(/\d/g)?.join(''));

                    if (errorIndex >= 0) {
                        setTagsErrors((array) => {
                            const updatedArray = [...array];
                            updatedArray[errorIndex] = (error as ValidationError).errors[0];
                            console.log(updatedArray);
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
            tags,
            infoLinks,
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

    const handleResetButton = () => {
        setQuestion(questionItem.question);
        setCodeExample(questionItem.codeExample);
        setCategory(questionItem.category);
        setTags(questionItem.tags);
        setInfoLinks(questionItem.infoLinks);
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
        tags,
        setTags,
        handleAddTagButton,
        handleDeleteTagButton,
        infoLinks,
    }
};
