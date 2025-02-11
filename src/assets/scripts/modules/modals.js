import MicroModal from "micromodal";

const modalDefaultParams = {
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
  	onClose: modal => console.info(`${modal.id} is hidden`), // [2]
  	openTrigger: 'data-custom-open', // [3]
  	closeTrigger: 'data-custom-close', // [4]
  	openClass: 'is-open', // [5]
  	disableScroll: true, // [6]
  	disableFocus: false, // [7]
  	awaitOpenAnimation: true, // [8]
  	awaitCloseAnimation: true, // [9]
  	debugMode: true // [10]
}

MicroModal.init(modalDefaultParams);