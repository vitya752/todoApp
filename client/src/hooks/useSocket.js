import socketIOClient from "socket.io-client";

const useSocket = () => {
    return socketIOClient(window.location.origin.replace("3000", process.env.PORT));
};

export {
    useSocket
};