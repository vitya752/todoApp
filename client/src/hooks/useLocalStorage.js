export const useLocaleStorage = () => {
    const saveUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    };

    const deleteUser = () => {
        localStorage.removeItem('user');
    };

    return {
        saveUser,
        getUser,
        deleteUser
    }

};