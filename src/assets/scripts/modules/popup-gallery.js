import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

import {
	press,
	pressTargetAddListener,
	findAncestor
} from '../init-functions';


export const initGallery = function () {
	document.addEventListener(press, (e) => {
		if (e.target.classList.contains('js-mtp-gallery-item') || findAncestor(e.target, 'js-mtp-gallery-item')) {
			e.preventDefault();
			let target = e.target.classList.contains('js-mtp-gallery-item') ? e.target : findAncestor(e.target, 'js-mtp-gallery-item');

			popupGallery(target);
		}
	});
}

export let popupGallery = function (link) {

	const currentGallery = findAncestor(link, 'js-mtp-gallery');

	if (!currentGallery) {
		return
	}

	const options = {
		history: false,
		focus: false,
		loop: false,
		closeOnVerticalDrag: false,
		closeOnScroll: false,
		showAnimationDuration: 300,
		hideAnimationDuration: 300,
	};

	const pswpModalBody = `
		<div class="pswp" id="pswp" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="pswp__bg"></div>
				<div class="pswp__scroll-wrap">
					<div class="pswp__container">
						<div class="pswp__item"></div>
						<div class="pswp__item"></div>
						<div class="pswp__item"></div>
					</div>

					<div class="pswp__ui pswp__ui--hidden">
						<div class="pswp__top-bar">
							<div class="pswp__counter"></div>
							<button class="pswp__button pswp__button--close" title="Close (Esc)">
							<i class="icon icon--close"></i>
							</button>
							<button class="pswp__button pswp__button--fs" title="Toggle fullscreen">
							<i class="icon icon--zoom"></i>
							</button>
							<button class="pswp__button pswp__button--zoom" title="Zoom in/out">
							<i class="icon icon--zoom"></i>
							</button>
							<div class="pswp__preloader">
								<div class="pswp__preloader--icn">
									<div class="pswp__preloader--cut">
										<div class="pswp__preloader--donut"></div>
									</div>
								</div>
							</div>
						</div>

						<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
							<div class="pswp__share-tooltip"></div>
						</div>

						<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
						<i class="icon icon--arrow-left"></i>
						</button>

						<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
						<i class="icon icon--arrow-right"></i>
						</button>

						<div class="pswp__caption">
							<div class="pswp__caption--center"></div>
						</div>

					</div>
				</div>
		</div>`;

	const items = [];
	const currentGalleryItems = currentGallery.querySelectorAll('.js-mtp-gallery-item');

	currentGalleryItems.forEach(galleryItem => {
		if (galleryItem.classList.contains('video')) {
			const videoUrl = galleryItem.dataset.videoSrc;
			const iframeContainer = `
					<div class="pswp__video--container">
					<iframe class="pswp__video--item"
					src = ${videoUrl}
					title = "YouTube video player"
					frameborder = "0"
					allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen> </iframe></div>
				`;
			items.push({

				html: iframeContainer
			})

		} else {
			items.push({

				html: galleryItem.innerHTML
			})
		}


	})

	document.body.insertAdjacentHTML('beforeend', pswpModalBody)
	const galleryWrapper = document.querySelector('.pswp');

	const modalGallery = new PhotoSwipe(galleryWrapper, PhotoSwipeUI_Default, items, options);


	modalGallery.init();
	modalGallery.listen('close', function () {
		document.querySelector('.pswp').remove();
	});


}
