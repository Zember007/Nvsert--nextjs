import './libs'
import {press} from './init-functions';
import {spoilerInit} from "./modules/spoilers";
import {
	initGallery,
	popupGallery
} from "./modules/popup-gallery";


document.addEventListener('DOMContentLoaded', () => {
	spoilerInit();
	initGallery();
});
