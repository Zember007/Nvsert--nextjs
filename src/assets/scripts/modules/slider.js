import {Swiper, Navigation, Pagination, Thumbs} from "swiper";

Swiper.use([Navigation, Pagination, Thumbs]);

export let sliderInit = () => {
	document.querySelectorAll('.js-mtp-slider').forEach(slider => {
		const buttonNextSlide = slider.querySelector('.js-mtp-slider-button-next'),
			buttonPrevSlide = slider.querySelector('.js-mtp-slider-button-prev'),
			paginationSlide = slider.querySelector('.js-mtp-slider-pagination'),
			navSlider = slider.querySelector('.js-mtp-nav-slider'),
			mainSlider = slider.querySelector('.js-mtp-main-slider'),
			slidesPerView = parseInt(slider.getAttribute('data-slides')),
			mainSliderInit = new Swiper(mainSlider, {
				containerModifierClass: 'mtp__slider-container-',
				wrapperClass: 'mtp__slider-wrapper',
				slideClass: 'mtp__slider-slide',
				slideActiveClass: 'mtp__slider-slide--active',
				slideVisibleClass: 'mtp__slider-slide--visible',
				slideNextClass: 'mtp__slider-slide--next',
				slidePrevClass: 'mtp__slider-slide--prev',
				slideBlankClass: 'mtp__slider-slide--blank',
				watchOverflow: true,
				autoHeight: true,
				slidesPerView: 1,
				spaceBetween: 16,
				allowSlideNext: true,
				allowSlidePrev: true,
				navigation: {
					nextEl: buttonNextSlide,
					prevEl: buttonPrevSlide,
				},
				pagination: {
					el: paginationSlide,
					type: 'bullets',
					dynamicBullets: true,
				},
				breakpoints: {
					1025: {
						slidesPerView: slidesPerView,
						spaceBetween: 32,
					},
					521: {
						slidesPerView: slidesPerView,
						spaceBetween: 16,
					},
				}
			});

	});
}


