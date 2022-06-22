import { DetailedHTMLProps, HTMLAttributes } from 'react';
// import { IMedicationItem } from '../../interfaces/medication.interface';

export interface AddQuestionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    // item: IMedicationItem;
    // mode: "add" | "edit";
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}