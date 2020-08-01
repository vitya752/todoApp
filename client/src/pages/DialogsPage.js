import React from 'react';

import { useSocket } from 'hooks/useSocket';
import Dialogs from 'components/Dialogs/DialogsContainer';

const DialogsPage = () => {

    const socket = useSocket();

    return <Dialogs socket={socket} />
};

export default DialogsPage;