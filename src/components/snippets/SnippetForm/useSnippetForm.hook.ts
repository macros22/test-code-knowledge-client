import React from 'react';
import { ValidationError } from 'yup';
import { ISnippetDto, ISnippet } from 'libs/interfaces/snippets.interface';
import { snippetSchema } from './snippet.schema';
import { ISnippetFormProps } from './SnippetForm.props';
import { useSnippetsApi } from 'libs/hooks/snippets/useSnippetsApi';
import { useSnippets } from 'libs/hooks/snippets/useSnippets';

export const useSnippetForm = ({ snippetItem, mode }: Pick<ISnippetFormProps, 'mode' | 'snippetItem'>) => {
    const [snippet, setSnippet] = React.useState<string>(snippetItem.snippet);
    const [snippetError, setSnippetError] = React.useState<string>('');

    const [category, setCategory] = React.useState<string>(snippetItem.category);

    const [description, setDescription] = React.useState<string>(
        snippetItem.description
    );
    // const [isDescriptionChecked, setIsDescriptionChecked] = React.useState<boolean>(true);
    const [descriptionError, setDescriptionError] = React.useState<string>('');

    const handleSelectCategory = (e) => {
        setCategory(e.target.value as string);
    }


    // const handleAddAnswerButton = () => {
    //     const newAnswer: IUserAnswer = {
    //         answer: '',
    //         isChecked: false,
    //     }

    //     setAnswers(answers => {
    //         // Deep copy.
    //         // TODO! replace JSON...
    //         const newAnswers: IUserAnswer[] = JSON.parse(
    //             JSON.stringify(answers)
    //         );
    //         newAnswers.push(newAnswer);

    //         return newAnswers;
    //     })
    // }

    // const handleDeleteAnswerButton = (index: number) => {
    //     setAnswers(answers => {
    //         // Deep copy.
    //         // TODO! replace JSON...
    //         const newAnswers: IUserAnswer[] = JSON.parse(
    //             JSON.stringify(answers)
    //         );
    //         return newAnswers.filter((_, i) => i !== index);
    //     })
    // }

    const resetErrors = () => {
        setSnippetError('');
        setDescriptionError('');
        // setAnswersErrors(new Array(snippetItem.answers.length).fill(''));
    };

    const isValidForm = async () => {
        resetErrors();
        let isValid = true;

        try {
            await snippetSchema.validate({
                snippet,
                description,
                category,
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                isValid = false;
                console.log(error.path);
                if (error.path == 'snippet') {
                    setSnippetError(error.errors[0]);
                } else if (error.path == 'description') {
                    setDescriptionError(error.errors[0]);
                }
                //  else if (error.path?.endsWith('.answer')) {
                //     // ! TO DO: Refactore this block.
                //     const errorIndex = Number(error.path.match(/\d/g)?.join(''));

                //     if (errorIndex >= 0) {
                //         setAnswersErrors((array) => {
                //             const updatedArray = [...array];
                //             updatedArray[errorIndex] = (error as ValidationError).errors[0];
                //             return updatedArray;
                //         });
                //     }
                // }
            }
        }

        return isValid;
    };

    const { api } = useSnippetsApi();
    const { mutateSnippets } = useSnippets({ category });
    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        const snippetPayload = {
            snippet,
            category,
            description,
            tags: [],
            infoLinks: [],
            // answers: answers.map((answer) => ({
            //     answer: answer.answer,
            //     isCorrect: answer.isChecked,
            // })),
        } as ISnippetDto;

        // if (await isValidForm()) {
        if (true) {
            switch (mode) {
                case 'add':
                    try {
                        console.log(snippetPayload);
                        await api.postSnippet(snippetPayload)
                        mutateSnippets();
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case 'edit':
                    try {
                        await api.patchSnippet(snippetPayload, snippetItem.id)
                        mutateSnippets();
                    } catch (error) {
                        console.log(error);
                    }
                    break;
            }
        }
    };

    const handleResetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSnippet(snippetItem.snippet);
        setDescription(snippetItem.description);
        setCategory(snippetItem.category);
    };

    return {
        snippet,
        setSnippet,
        snippetError,
        setSnippetError,
        category,
        setCategory,
        description,
        setDescription,
        // isDescriptionChecked,
        // setIsDescriptionChecked,
        descriptionError,
        setDescriptionError,
        // answers,
        // setAnswers,
        // answersErrors,
        // setAnswersErrors,
        handleSelectCategory,
        // handleAddAnswerButton,
        // handleDeleteAnswerButton,
        resetErrors,
        handleSubmitForm,
        handleResetButton,
    }
};
