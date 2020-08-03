import { formatDate } from './formatDate';

export const _transformDialogs = ({dialogs, userId}) => {
    
    const mapDialogs = dialogs.map(dialog => {
        return _transformDialog(dialog, userId);
    });

    return mapDialogs.sort((a, b) => {
        return new Date(b.fullDate) - new Date(a.fullDate)
    });
};

export const _transformDialog = (dialog, userId) => {
    let partner;

    if(dialog.partner._id === userId) {
        partner = dialog.author;
    } else {
        partner = dialog.partner;
    }

    return {
        id: dialog._id,
        avatar: partner.avatar,
        email: partner.email,
        text: dialog.lastMessage.text,
        fullDate: dialog.lastMessage.createdAt,
        date: formatDate({dateFromBase: dialog.lastMessage.createdAt, type: 'dialogs'}),
        my: dialog.lastMessage.author === userId,
        unreadMessages: dialog.unreadMessages,
        participants: {
            author: dialog.author,
            partner: dialog.partner
        }
    }
};

export const _transformMessages = ({messages, participants}) => {
    return messages.map(message => {

        return _transformMessage(message, participants);

    });
};

export const _transformMessage = (message, participants) => {
    let ownerMessage;

    if(participants.author._id === message.author) {
        ownerMessage = participants.author;
    } else ownerMessage = participants.partner;

    return {
        senderId: ownerMessage._id,
        avatar: ownerMessage.avatar,
        author: ownerMessage.nickname || ownerMessage.email,
        text: message.text,
        fullDate: message.createdAt,
        date: formatDate({dateFromBase: message.createdAt, type: 'messages'})
    }
};

export const _transformFoundUsers = ({foundUsers}) => {
    return foundUsers.map(item => {
        return {
            partnerId: item._id,
            avatar: item.avatar,
            email: item.email
        }
    });
};