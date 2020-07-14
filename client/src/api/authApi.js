import axios from 'axios';

const authApi = () => {

    const url = '/api/auth';

    const login = async (email, password) => {
        return await axios.post(`${url}/login`, {email, password});
    };

    const register = async (email, password) => {
        return await axios.post(`${url}/register`, {email, password});
    };

    return {
        login,
        register
    }
};

export default authApi;