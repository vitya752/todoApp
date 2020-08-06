import axios from 'axios';

const authApi = () => {

    const url = '/api/auth';

    const login = async (email, password) => {
        return await axios.post(`${url}/login`, {email, password});
    };

    const register = async (email, password) => {
        return await axios.post(`${url}/register`, {email, password});
    };

    const check = async (token) => {
        return await axios.post(`${url}/check`, {token});
    };

    return {
        login,
        register,
        check
    }
};

export default authApi;