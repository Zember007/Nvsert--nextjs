import {press} from "../init-functions";


export let sidebarInit = () => {
	let catMenu = document.querySelectorAll('.js-cat-menu'),
		bodyTag = document.querySelector('body');

	if (catMenu) {
		catMenu.forEach((item) => {
			let btn = item.querySelector('.js-cat-menu-btn'),
				menu = item.querySelector('.js-cat-menu__list'),
				closeBtn = item.querySelector('.js-close-btn');
			btn.addEventListener(press, () => {
				menu.classList.add('active');
				bodyTag.classList.add('overflow');
			});
			closeBtn.addEventListener(press, () => {
				menu.classList.remove('active');
				bodyTag.classList.remove('overflow');
			});

		});
	}
};

export let sidebarDropdown = () => {
	let btn = document.querySelectorAll('.js-cat-menu__btn');
	btn.forEach(function (item) {
		item.addEventListener(press, (e) => {
			e.preventDefault();
			console.log('click');

			let parent = item.closest('.js-dropdown'),
				group = parent.querySelector('.js-cat-menu__group'),
				dropdown = parent.querySelector('.js-dropdown-content');

			if (dropdown.classList.contains('active')) {
				dropdown.classList.remove('active');
				parent.classList.remove('active');

				dropdown.style.height = dropdown.clientHeight + 'px';

				group.classList.remove('active');

				setTimeout(function () {
					dropdown.style.height = '0px';
				});

			} else {
				dropdown.classList.add('active');
				parent.classList.add('active');

				dropdown.style.height = 'auto';
				let height = dropdown.clientHeight + 'px';
				dropdown.style.height = '0px';

				group.classList.add('active');

				setTimeout(function () {
					dropdown.style.height = height;
					setTimeout(function () {
						dropdown.style.height = 'auto';
					}, 200);
				});
			}

		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	sidebarInit();
	sidebarDropdown();
});
