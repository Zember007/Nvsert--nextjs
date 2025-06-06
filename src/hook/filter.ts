export const filterPhone = (value = '') => {
    return 'tel:' + value.replace(/[^0-9\+]/g, '');
}

export const filterEmail = (value = '') => {
    return 'mailto:' + value;
}


export const filterPrepositions = (text: string): string => {
    return text.replace(/(^|\s)(и|в|с|к|у|о|а|но|на|по|из|от|за|до|не|да|же|ли|бы)\s/g, "$1$2\u00A0");
};