export const _transformDialogs = ({dialogs, userId}) => {
    
    return dialogs.map(dialog => {
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
            my: dialog.lastMessage.author === userId,
            read: dialog.lastMessage.read,
            participants: {
                author: dialog.author,
                partner: dialog.partner
            }
        }

    })
};

export const _transformMessages = ({messages, participants}) => {
    return messages.map(message => {

        let ownerMessage;

        if(participants.author._id === message.author) {
            ownerMessage = participants.author;
        } else ownerMessage = participants.partner;

        return {
            senderId: ownerMessage._id,
            avatar: ownerMessage.avatar,
            author: ownerMessage.nickname || ownerMessage.email,
            text: message.text
        }
    });
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