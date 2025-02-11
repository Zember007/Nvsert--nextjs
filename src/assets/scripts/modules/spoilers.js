import {press, findAncestor} from "../init-functions";


export let spoilerInit = () => {
	let spoilerSection = document.querySelectorAll('.js-spoiler');
	if (!spoilerSection) {
		return
	}

	document.addEventListener(press, (e) => {
		if (e.target.classList.contains('js-spoiler-button') || findAncestor(e.target, 'js-spoiler-button')) {
			e.preventDefault();
			let target = e.target.classList.contains('js-spoiler-button') ? e.target : findAncestor(e.target, 'js-spoiler-button');

			const spoiler = target.closest('.js-spoiler-item');
			const spoilerContent = spoiler.querySelector('.js-spoiler-content');
			let parentContent = spoilerContent.closest('.js-spoiler-item').closest('.js-spoiler-content');


			if (!spoiler.classList.contains('active')) {

				spoiler.classList.add('active');
				spoilerContent.style.height = 'auto';

				let height = spoilerContent.clientHeight + 'px';
				spoilerContent.style.height = '0px';

				spoilerContent.addEventListener('transitionend', function () {
					spoilerContent.style.height = 'auto';
				}, {
					once: true
				});

				setTimeout(function () {
					spoilerContent.style.height = height;
				}, 0);


			} else {

				spoilerContent.style.height = spoilerContent.clientHeight + 'px';

				spoilerContent.addEventListener('transitionend', function () {
					spoiler.classList.remove('active');
				}, {
					once: true
				});

				setTimeout(function () {
					spoilerContent.style.height = '0px';
				}, 0);

			}
		}
	});
}


