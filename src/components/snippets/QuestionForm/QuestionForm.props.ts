import { IQuestion } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IQuestionFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    questionItem: IQuestion;
    mode: "add" | "edit";
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}