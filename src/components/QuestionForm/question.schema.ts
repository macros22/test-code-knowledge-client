import * as yup from 'yup';

export const schema = yup.object().shape({
    question: yup.string().required('Write question.'),
    codeExample: yup.string().required('Write code example.'),
    category: yup.string(),
    answers: yup.array().of(
        yup.object().shape({
            answer: yup.string().required('Write answer.'),
            isChecked: yup.boolean(),
        })
    ),
});