import { toast } from "react-toastify";

export const requestError = (action, e, dispatch) => {
    dispatch(action);
    toast(e.response.data.message);
};