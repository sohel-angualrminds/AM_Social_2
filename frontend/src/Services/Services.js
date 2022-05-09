import api from './api';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzdlZDM1Njc3ZWZlYjIzMzlhOGRkYiIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwibmFtZSI6InRlc3QyIiwiaWF0IjoxNjUyMDI2NzAzLCJleHAiOjE2NTIxMTMxMDN9.RLwMtH4ZIpN31mAhczP3TVbwHVA5IN8bwC9Degisvas";

const header = {
    headers: {
        authorization: token,
        'content-type': "application/json; charset=utf-8"
    }
}

/*
*for register user
*/
export const registerNewUser = async (object) => {
    try {
        const res = await api.post('/user/signup', object);
        return res;
    }
    catch (err) {
        return err;
    }
}

/*
*for login user
*/
export const login = async (object) => {
    try {
        const res = await api.post('/user/login', object);
        return res;
    }
    catch (err) {
        return err;
    }
}

/*
*getting all posts
*/
export const getAllPosts = async (page = 1, limit = 10) => {
    try {
        // /feed/?page=1&limit=10
        const result = await api.get(`/feed/?page=${page}&limit=${limit}`, header);
        return result;
    } catch (err) {
        return err;
    }
}

/*
* posting new post
*/
export const postNewPost = async (object) => {
    try {
        const res = await api.post("/feed/addPost", object, header);
        return res;
    } catch (err) {
        return err;
    }
}

/*
 * add new comment 
 */
export const addComment = async (object) => {
    try {
        const res = await api.post(`/feed/comment/${object.id}`, header);
        return res;
    }
    catch (err) {
        return err;
    }
}

/*
 * add new like 
 */
export const addLike = async (object) => {
    try {
        const res = await api.post(`/feed/like/${object.id}`, header);
        return res;
    }
    catch (err) {
        return err;
    }
}

/*
 * edit profile
 */
export const editProfile = async (object) => {
    try {
        const res = await api.put('/profile/edit', object, header);
        return res;
    }
    catch (err) {
        return err;
    }

}

/*
*change password
*/
export const changePaswword = async (object) => {
    try {
        const res = await api.post(`/user/changepassword/${object.id}`, header);
        return res;
    } catch (err) {
        return err;
    }
}