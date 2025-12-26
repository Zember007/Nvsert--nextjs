export const filterPhone = (value = '') => {
  return `tel:${value.replace(/[^0-9+]/g, '')}`;
};

export const filterEmail = (value = '') => {
  return `mailto:${value}`;
};

export const filterPrepositions = (text: string): string => {
  return text
    .replace(
      /(^|\s)(и|в|с|к|у|о|а|но|на|по|из|от|за|до|не|да|же|ли|бы)\s/gi,
      '$1$2\u00A0'
    )
    // любое слово + одиночная заглавная буква
    .replace(/([А-ЯЁ]+)\s([А-ЯЁ])(\s|$)/g, '$1\u00A0$2$3')
    .replace(/\s+(\d+)/g, '\n$1')
    .replace(/хим\.\s+продукции/gi, 'хим.\u00A0продукции')
    .replace(/тип\s+продукции/gi, 'тип\u00A0продукции')
    .replace(/происхождения\s+СТ-1/gi, 'происхождения\u00A0СТ-1')
    .replace(/заключение\s+(ЭЗ)/gi, 'заключение\u00A0($1)')
    .replace(/Паспорт\s+изделия/gi, 'Паспорт\nизделия')
    .replace(/таможенного\s+союза/gi, 'таможенного\nсоюза')
    .replace(/Протокол\s+испытаний/gi, 'Протокол\nиспытаний')
    .replace(/Технические\s+условия/gi, 'Технические\nусловия')
    .replace(/соответствия\s+ГОСТ/gi, 'соответствия\nГОСТ')
    .replace(/(\p{L}+)\s+(\d)(?=\s|$)/gu, '$1\u00A0$2')

};


