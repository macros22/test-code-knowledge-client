import { Role } from "interfaces/user.interface";
import { snippetsApi } from "libs/snippets.api";
import { useUser } from "../useUser";

export const useSnippetsApi = () => {

    const { user } = useUser();
    const userRole = user?.role ? user.role : Role.User;

    return {
        api: snippetsApi(userRole)
    }
}