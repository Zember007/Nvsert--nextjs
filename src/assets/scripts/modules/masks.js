import IMask from 'imask';

export const phoneMaskInit = () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  if (!phoneInputs) {
    return
  }

  phoneInputs.forEach(tel => IMask(tel, {
  	mask: '+{7}(000)000-00-00'
  }));
  
}