import { Role } from "interfaces/user.interface";
import { questionsApi } from "libs/questions.api";
import { useUser } from "../useUser";

export const useQuestionsApi = () => {
    
    const { user } = useUser();
    const userRole = user?.role ? user.role : Role.User;

    return {
        api: questionsApi(userRole)
    }
}