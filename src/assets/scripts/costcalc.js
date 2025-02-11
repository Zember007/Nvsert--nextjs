import './libs'
import {press} from "./init-functions";

document.addEventListener(press, (e) => {
	if (e.target.closest('.js-count-btn')) {
		/*let event = new Event('change', {bubbles: true});*/
		let target = e.target.closest('.js-count-btn');
		let input = target.closest('.js-product__count').querySelector('.js-count-input'),
			value = parseInt(input.value),
			min = parseInt(input.getAttribute('min')),
			max = parseInt(input.getAttribute('max'));
		let step = parseInt(input.getAttribute('step'));
		if (step === 0) {
			step = 1;
		}
		if (target.classList.contains('js-plus')) {
			if (value < max) {
				input.value = value + step;
			}
			/*fnDelay(function () {
				input.dispatchEvent(event);
			}, 500);*/
		}
		if (target.classList.contains('js-minus')) {
			if (value > min) {
				input.value = value - step;
			}
			/*fnDelay(function () {
				input.dispatchEvent(event);
			}, 500);*/
		}
	}

});

/*let fnDelay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();*/
