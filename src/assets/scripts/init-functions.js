export let ua = navigator.userAgent;
export let press = (ua.match(/iPad/i)) ? "touchstart" : "click";
export const findAncestor = function(el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el;
}

