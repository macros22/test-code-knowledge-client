import { Role } from 'libs/interfaces/user.interface';
import { snippetsApi } from 'libs/api/snippets.api';
import { useUser } from 'libs/hooks';

export const useSnippetsApi = () => {
  const { user } = useUser();
  const userRole = user?.role ? user.role : Role.User;

  return {
    api: snippetsApi(userRole)
  };
};
