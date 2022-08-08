// import { wordsApi } from 'libs/words.api';
// import { useUser } from 'hooks';
// import { Role} from 'types/types';

import { Role } from "interfaces/user.interface";
import { questionsApi } from "libs/questions.api";
import { useUser } from "./useUser";

export const useQuestionsApi = () => {
    
    const { user } = useUser();
    const userRole = user?.role ? user.role : Role.USER;

    return {
        api: questionsApi(userRole)
    }
}