import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
