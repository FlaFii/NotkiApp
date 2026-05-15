let asideAddBtn,
	notesAddBtn,
	modalViewAddNoteCancelBtn,
	modal,
	modalViewAddNote,
	modalOverlay,
	modalCloseBtn,
	modalViews = [];

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};
const prepareDOMElements = () => {
	asideAddBtn = document.querySelector(".aside__btns-add-btn");
	notesAddBtn = document.querySelector(".notes__add-btn");
	modal = document.querySelector(".modal");
	modalViewAddNote = document.querySelector(".modal__view--add-note");
	modalCloseBtn = modal.querySelector(".modal__window-close-btn");
	modalViewAddNoteCancelBtn = modalViewAddNote.querySelector(
		".controls__btn--cancel",
	);
	modalOverlay = document.querySelector(".modal__overlay");
	modalViews = modal.querySelectorAll(".modal__view");
};
const prepareDOMEvents = () => {
	asideAddBtn.addEventListener("click", () => openModal(modalViewAddNote));
	notesAddBtn.addEventListener("click", () => openModal(modalViewAddNote));
	modalCloseBtn.addEventListener("click", closeModal);
	modalViewAddNoteCancelBtn.addEventListener("click", closeModal);
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
