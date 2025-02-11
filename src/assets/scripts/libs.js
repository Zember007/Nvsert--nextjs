import {press} from './init-functions';
import {togglePassword} from './modules/togglePassword';
import {selectsInit} from './modules/choisesSelects';
import {
	phoneMaskInit
} from './modules/masks';
import "regenerator-runtime/runtime.js";
import "./modules/modals";

let servicesDropdown = () => {

	//let servicesBtn = document.querySelector('.js-services-menu__btn');
	let headerIsTransparent = document.querySelector('body').classList.contains('transparent-header');
	document.addEventListener(press, (e) => {
		if (e.target.closest('.js-services-menu__btn')) {
			let target = e.target.closest('.js-services-menu__btn');
			let servicesMenu = document.querySelector('.js-services-menu');
			let bodyTag = document.querySelector('body');
			servicesMenu.classList.toggle('active');
			target.classList.toggle('active');
			if (servicesMenu.classList.contains('active') || document.querySelector('.js-header-menu').classList.contains('active')) {
				bodyTag.classList.add('overflow');
				if (headerIsTransparent === false) {
					bodyTag.classList.add('transparent-header');
				}

			} else {
				bodyTag.classList.remove('overflow');
				if (headerIsTransparent === false) {
					bodyTag.classList.remove('transparent-header');
				}
			}


		}
	})
}

let headerMenu = () => {
	let headerIsTransparent = document.querySelector('body').classList.contains('transparent-header');
	document.addEventListener(press, (e) => {
		if (e.target.closest('.js-burger-btn')) {
			let target = e.target.closest('.js-burger-btn');
			let menu = document.querySelector('.js-header-menu');
			let bodyTag = document.querySelector('body');
			menu.classList.toggle('active');
			target.classList.toggle('active');
			if (menu.classList.contains('active')) {
				bodyTag.classList.add('overflow');
				if (headerIsTransparent === false) {
					bodyTag.classList.add('transparent-header');
				}
			} else {
				bodyTag.classList.remove('overflow');
				if (headerIsTransparent === false) {
					bodyTag.classList.remove('transparent-header');
				}
			}

		}
	})
}

document.addEventListener("DOMContentLoaded", () => {
	selectsInit();
	togglePassword();
	phoneMaskInit();
	servicesDropdown();
	headerMenu();
});
