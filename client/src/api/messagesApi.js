import axios from 'axios';

const messagesApi = (token) => {

    const url = '/api/messages';

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getMessages = async dialogId => {
        return await template.get(`${url}/${dialogId}`);
    };

    const sendMessage = async (dialogId, text) => {
        return await template.post(`${url}`, {dialogId, text});
    };

    return {
        getMessages,
        sendMessage
    }
};

export default messagesApi;