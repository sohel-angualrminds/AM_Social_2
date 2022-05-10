/*following methods for performing local operations {stoaring and gettings}*/
import Cookies from 'js-cookie'

//setting data in local storage
export const setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

//getting data from local storage
export const getItemFromLocalStorage = (key = "userINFO") => {
    return (JSON.parse(localStorage.getItem(key)));
}

//setting token in cookie
export const setToken = async (token, time = 1) => {
    return (Cookies.set("token", token, { expires: time }));
}

//gets token from cookie
export const getToken = () => {
    return Cookies.get('token');
}

//deleting all the data from local
export const clearAll = () => {
    //cleaning all things
    localStorage.clear();
    Cookies.remove('token', { path: '' }) // removed!
}