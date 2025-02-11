import {
	press
} from "../init-functions";

//Переключение типа поля у инпута для пароля

export const togglePassword = () => {
document.addEventListener(press, (e) => {
	if (e.target.classList.contains('js-toggle-password') || e.target.closest('.js-toggle-password')) {
		e.preventDefault();
		let target = e.target.classList.contains('js-toggle-password') ? e.target : e.target.closest('.js-toggle-password');

		if (target.classList.contains('hide')) {
			target.closest('label').querySelector('input').type = 'text';
			target.classList.remove('hide');
			target.classList.add('shown');
		} else {
			target.closest('label').querySelector('input').type = 'password';
			target.classList.remove('shown');
			target.classList.add('hide');
		}
	}
})
}



