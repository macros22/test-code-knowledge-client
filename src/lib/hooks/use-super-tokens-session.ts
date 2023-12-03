import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles';

import Session from "supertokens-auth-react/recipe/session";

export const useSuperTokensSession = () => {

    // let sessionContext = Session.useSessionContext();
    // if (sessionContext.) {
    //     // TODO:
    // } else {
    //     // TODO:
    // }


    const claimValue = Session.useClaimValue(UserRoleClaim)
    if (claimValue.loading || !claimValue.doesSessionExist) {
        return {};
    }

    const roles = claimValue.value;
  
    return {
        isAdmin: Array.isArray(roles) && roles.includes("Admin")
    }
  }