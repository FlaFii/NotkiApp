let asideAddBtn,
	asideSearchBtn,
	asideFilterBtn,
	asideDeleteAllBtn,
	notesAddBtn,
	// modalViewAddNoteCancelBtn,
	modalViewCancelBtns = [],
	modal,
	modalViewAddNote,
	modalViewSearch,
	modalViewfilter,
	modalViewDeleteAll,
	modalOverlay,
	modalCloseBtn,
	modalViews = [];

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};
const prepareDOMElements = () => {
	asideAddBtn = document.querySelector('[data-action="aside-btn-add"]');
	asideSearchBtn = document.querySelector('[data-action="aside-btn-search"]');
	asideFilterBtn = document.querySelector('[data-action="aside-btn-filter"]');
	asideDeleteAllBtn = document.querySelector(
		'[data-action="aside-btn-delete-all"]',
	);
	notesAddBtn = document.querySelector('[data-action="notes-btn-add"]');
	modal = document.querySelector(".modal");
	modalViewAddNote = document.querySelector(".modal__view--add-note");
	modalViewSearch = document.querySelector(".modal__view--search");
	modalViewFilter = document.querySelector(".modal__view--filter");
	modalViewDeleteAll = document.querySelector(".modal__view--delete-all");
	modalCloseBtn = modal.querySelector(".modal__window-close-btn");
	modalViewCancelBtns = document.querySelectorAll(
		'[data-action="modal-view-cancel-btn"]',
	);
	modalOverlay = document.querySelector(".modal__overlay");
	modalViews = modal.querySelectorAll(".modal__view");
};
const prepareDOMEvents = () => {
	asideAddBtn.addEventListener("click", () => openModal(modalViewAddNote));
	notesAddBtn.addEventListener("click", () => openModal(modalViewAddNote));
	asideSearchBtn.addEventListener("click", () => openModal(modalViewSearch));
	asideFilterBtn.addEventListener("click", () => openModal(modalViewFilter));
	asideDeleteAllBtn.addEventListener("click", () =>
		openModal(modalViewDeleteAll),
	);
	modalCloseBtn.addEventListener("click", closeModal);
	modalViewCancelBtns.forEach((btn) =>
		btn.addEventListener("click", closeModal),
	);
	modalOverlay.addEventListener("click", closeModal);
	window.addEventListener("keydown", handleEscapeKey);
};
const openModal = (modalView) => {
	modal.classList.add("modal--active");
	modalView.classList.add("modal__view--active");
};
const handleEscapeKey = (e) => {
	if (e.key === "Escape") {
		closeModal();
	}
};
const closeModal = () => {
	modal.classList.remove("modal--active");
	modalViews.forEach((view) => {
		view.classList.remove("modal__view--active");
	});
};
main();
