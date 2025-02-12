export const filterPhone = (value = '') => {
    return 'tel:' + value.replace(/[^0-9\+]/g, '');
}