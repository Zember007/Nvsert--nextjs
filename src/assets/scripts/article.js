import './libs'
import {body, press} from './init-functions';
import {
	initGallery,
	popupGallery
} from './modules/popup-gallery';
import {spoilerInit} from './modules/spoilers';
import {sliderInit} from './modules/slider';
import './modules/sidebar';


document.addEventListener('DOMContentLoaded', () => {
	spoilerInit();
	initGallery();
	sliderInit();


	if (document.querySelectorAll('.js-map').length > 0) {
		ymaps.ready(function () {
			let myMap = new ymaps.Map('map', {
				center: [57.025091, 28.887214],
				zoom: 13,
				controls: ['zoomControl'],
			});
			myMap.geoObjects.add(new ymaps.Placemark([57.025091, 28.887214], {
				balloonContent: 'Псковская область, пос. Пушкинские Горы,\n' +
					'ул. Тригорская, д. 1'
			}));
			myMap.behaviors.disable('scrollZoom');
		});

	}

});

