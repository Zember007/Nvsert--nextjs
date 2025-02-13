export const filterPhone = (value = '') => {
    return 'tel:' + value.replace(/[^0-9\+]/g, '');
}

export const filterEmail = (value = '') => {
    return 'mailto:' + value;
}