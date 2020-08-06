export const getPartner = (userId, selectedDialog, dialogs) => {        
    const dialog = dialogs.filter(item => item.id === selectedDialog);
    const participants = dialog[0].participants;

    if(participants.author._id === userId) return participants.partner;
    else return participants.author;
};