import axios from 'axios';

const settingsApi = token => {

    const url = '/api/settings';

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const setSettings = async (nickname, avatar) => {
        return await template.patch(url, { nickname, avatar });
    };

    const deleteAcc = async () => {
        return await template.delete(url);
    };

    return {
        setSettings,
        deleteAcc
    }
};

export default settingsApi;