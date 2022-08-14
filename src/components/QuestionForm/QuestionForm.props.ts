import { Question } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface QuestionFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    questionItem: Question;
    mode: "add" | "edit";
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}