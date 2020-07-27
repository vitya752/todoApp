import axios from 'axios';

const usersApi = (token) => {

    const url = '/api/find';

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const findUsers = async (reqEmail) => {
        return await template.post(`${url}`, {reqEmail});
    };

    return {
        findUsers
    }
};

export default usersApi;