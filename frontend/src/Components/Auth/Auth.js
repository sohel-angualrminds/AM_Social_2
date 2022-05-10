import { getItemFromLocalStorage, getToken } from "../../Services/local";

export const Auth =() => {
    const res1 = getItemFromLocalStorage('userINFO');
    const res2 = getToken();
    // verifyToken
    if (!res1 || !res2)
    {
        return false;
    }
    else {
        return true;
    }
}