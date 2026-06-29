let asideAddBtn,
	asideSearchBtn,
	asideFilterBtn,
	asideDeleteAllBtn,
	notesAddBtn,
	addCategoryBtns = [],
	notesDeleteBtn = [],
	notesEditBtn = [],
	modalViewCancelBtns = [],
	modal,
	modalViewAddNote,
	modalViewSearch,
	modalViewfilter,
	modalViewDeleteAll,
	modalViewAddCategory,
	modalViewDeleteNote,
	modalViewEditNote,
	modalOverlay,
	modalCloseBtn,
	modalViews = [],
	// nowe
	addNoteTitleInput,
	addNoteContentInput,
	addCategoryTitleInput,
	addCategoryColors = [],
	notesArray = [],
	categoriesArray = [];

const main = () => {
	prepareDOMElements();
	// nowe
	loadCategoriesFromLocalStorage();
	loadNotesFromLocalStorage();
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
	notesDeleteBtn = document.querySelectorAll(
		'[data-action="notes-btn-delete"]',
	);
	notesEditBtn = document.querySelectorAll('[data-action="notes-btn-edit"]');
	addCategoryBtns = document.querySelectorAll('[data-action="add-category"]');
	modal = document.querySelector(".modal");
	modalViewAddNote = document.querySelector(".modal__view--add-note");
	modalViewEditNote = document.querySelector(".modal__view--edit-note");
	modalViewSearch = document.querySelector(".modal__view--search");
	modalViewFilter = document.querySelector(".modal__view--filter");
	modalViewDeleteAll = document.querySelector(".modal__view--delete-all");
	modalViewDeleteNote = document.querySelector(".modal__view--delete-note");
	modalViewAddCategory = document.querySelector(".modal__view--add-category");
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
	notesDeleteBtn.forEach((btn) =>
		btn.addEventListener("click", () => openModal(modalViewDeleteNote)),
	);
	notesEditBtn.forEach((btn) =>
		btn.addEventListener("click", () => openModal(modalViewEditNote)),
	);
	asideSearchBtn.addEventListener("click", () => openModal(modalViewSearch));
	asideFilterBtn.addEventListener("click", () => openModal(modalViewFilter));
	asideDeleteAllBtn.addEventListener("click", () =>
		openModal(modalViewDeleteAll),
	);
	addCategoryBtns.forEach((btn) => {
		btn.addEventListener("click", () => openModal(modalViewAddCategory));
	});
	modalCloseBtn.addEventListener("click", closeModal);
	modalViewCancelBtns.forEach((btn) =>
		btn.addEventListener("click", closeModal),
	);
	modalOverlay.addEventListener("click", closeModal);
	window.addEventListener("keydown", handleEscapeKey);
};
const openModal = (modalView) => {
	closeModal();
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
