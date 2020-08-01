import axios from 'axios';

const dialogsApi = (token) => {

    const url = '/api/dialogs';

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getDialogs = async () => {
        return await template.get(`${url}`);
    };

    const createDialog = async partnerId => {
        return await template.post(`${url}`, {partnerId});
    };

    return {
        getDialogs,
        createDialog
    }
};

export default dialogsApi;