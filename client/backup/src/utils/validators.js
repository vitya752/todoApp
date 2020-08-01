export const requiredField = value => !value && 'Required';

export const maxLength = (max) => (value) => {
    if(value && value.length > max) return `Max length is ${max}`;
};

export const maxLengthPass = (max) => (value) => {
    if(value && value.length > max) return `Max length of password is ${max}`;
};

export const isMail = value => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reg.test(value)) return 'Email is encorrect';
}