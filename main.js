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
	// formularz do add category
	addCategoryform,
	addCategoryTitleInput,
	addCategorySubmitBtn,
	addCategoryColorBtns = [],
	selectedCategoryColor = "",
	categoriesArray = [],
	categoryBox;
// nowe
// addNoteTitleInput,
// addNoteContentInput,
// notesArray = [],

const main = () => {
	prepareDOMElements();
	// nowe
	// loadCategoriesFromLocalStorage();
	// loadNotesFromLocalStorage();
	renderCategories();

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
	addCategoryTitleInput = modalViewAddCategory.querySelector("#category-name");
	addCategorySubmitBtn = modalViewAddCategory.querySelector(
		'button[type="submit"]',
	);
	addCategoryColorBtns =
		modalViewAddCategory.querySelectorAll(".category-color");
	addCategoryform = modalViewAddCategory.querySelector(".form--add-category");
	categoryBox = document.querySelectorAll(".category__box");
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
	addCategoryform.addEventListener("submit", addCategoryHandle);
	addCategoryColorBtns.forEach((btn) =>
		btn.addEventListener("click", addCategoryColorsHandle),
	);
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
const addCategoryColorsHandle = (e) => {
	addCategoryColorBtns.forEach((btn) =>
		btn.classList.remove("category-color--active"),
	);
	e.currentTarget.classList.add("category-color--active");
	selectedCategoryColor = e.currentTarget.dataset.color;
};
const renderCategories = () => {
	// tutaj musze naprawic to ze wyswietla sie przycisk dodaj kategorie tylko raz oraz to 
	// ze nie dziala listener na przycisk dodaj kategore , moze skoro ten przysik ma byc zawsze na gorze to pp zrobic go w html?SS
	categoryBox.forEach((box) => {
		box.innerHTML = "";
	});
	categoriesArray.forEach((category) => {
		const catBtn = document.createElement("button");
		catBtn.type = "button";
		catBtn.classList.add("category__box-option");
		catBtn.textContent = category.name;
		categoryBox.forEach((box) => {
			box.append(catBtn);
		});
	});
	const addCatBtn = document.createElement("button");
	addCatBtn.type = "button";
	addCatBtn.dataset.action = "add-category";
	addCatBtn.classList.add(
		"category__box-option",
		"category__box-option--add-cat",
		"primary-btn",
	);

	addCatBtn.innerHTML = `
    <img src="./icons/plus.svg" alt="">
    Dodaj kategorię`;

	categoryBox.forEach((box) => {
		box.append(addCatBtn);
	});
};
const addCategoryHandle = (e) => {
	e.preventDefault();
	if (addCategoryTitleInput.value === "" || selectedCategoryColor === "") {
		console.log("uzupłnij dane =");
	} else {
		const category = {
			id: Date.now(),
			name: addCategoryTitleInput.value,
			color: selectedCategoryColor,
		};
		categoriesArray.push(category);
		console.log(categoriesArray);
		renderCategories();
	}
};
main();
