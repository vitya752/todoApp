export const formatDate = ({ dateFromBase, type }) => {
    
    const date = new Date();
    const dt = new Date(dateFromBase);

    const dayMonthDate = ((date.getDate()) + '').padStart(2, "0");
    const dayMonthDt = ((dt.getDate()) + '').padStart(2, "0");

    const monthDate = ((date.getMonth() + 1) + '').padStart(2, "0");
    const monthDt = ((dt.getMonth() + 1) + '').padStart(2, "0");

    const yearDate = date.getFullYear();
    const yearDt = dt.getFullYear();

    const hours = (dt.getHours() + '').padStart(2, "0");
    const minutes = (dt.getMinutes() + '').padStart(2, '0');

    const returnDate = () => {
        switch(type) {
            case 'dialogs': 
                return `${dayMonthDt}.${monthDt}.${yearDt}`;
            case 'messages':
                return `${dayMonthDt}.${monthDt}.${yearDt} - ${hours}:${minutes}`;
            default:
                return `${dayMonthDt}.${monthDt}.${yearDt} - ${hours}:${minutes}`;
                
        }
    };

    if(dayMonthDate !== dayMonthDt) { //если дни месяца не совпадают
        if((dayMonthDate - dayMonthDt) === 1) { // если уже наступил следующий день
            if(monthDate === monthDt && yearDate === yearDt) { //если месяца и года совпадают
                if(type === 'dialogs') { //если диалог
                    return 'Вчера'; //то верни "Вчера"
                } else return `Вчера - ${hours}:${minutes}`; //иначе верни "вчера" и время
            } else return returnDate(); //или если месяц или год не совпадают, то верни просто дату
        } else return returnDate();  //или если наступил уже больше, чем один день
    } else { //но если совпадает день
        if(monthDate !== monthDt || yearDate !== yearDt) { //если или месяц, или год не совпадают
            return returnDate();  //возвращаем дату
        } else { //если совпадает абсолютно все
            return `${hours}:${minutes}`;
        }
    }

};