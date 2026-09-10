let asideAddBtn,
	asideSearchBtn,
	asideFilterBtn,
	asideDeleteAllBtn,
	notesAddBtn,
	notesDeleteBtn = [],
	// notesEditBtn = [],
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
	categoryBoxes = [],
	returnModalView = null,
	// nowe
	notesArray = [],
	addNoteForm,
	addNoteTitleInput,
	addNoteContentInput,
	selectedCategoryId,
	notesBox,
	editNoteTitleInput,
	editNoteContentInput,
	editNoteForm,
	deleteNoteForm;

const main = () => {
	prepareDOMElements();
	loadCategoriesFromLocalStorage();
	loadNotesFromLocalStorage();
	renderCategories();
	renderNotes();
	prepareDOMEvents();
};
const prepareDOMElements = () => {
	asideAddBtn = document.querySelector('[data-action="aside-btn-add"]');
	asideSearchBtn = document.querySelector('[data-action="aside-btn-search"]');
	asideFilterBtn = document.querySelector('[data-action="aside-btn-filter"]');
	asideDeleteAllBtn = document.querySelector(
		'[data-action="aside-btn-delete-all"]',
	);
	// notesAddBtn = document.querySelector('[data-action="notes-btn-add"]');
	notesDeleteBtn = document.querySelectorAll(
		'[data-action="notes-btn-delete"]',
	);
	// notesEditBtn = document.querySelectorAll('[data-action="notes-btn-edit"]');
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
	categoryBoxes = document.querySelectorAll(".category__box");
	// nowe
	addNoteForm = modalViewAddNote.querySelector(".form");
	addNoteTitleInput = addNoteForm.querySelector("#title");
	addNoteContentInput = addNoteForm.querySelector("#content");
	notesBox = document.querySelector("main.notes");
	editNoteTitleInput = modalViewEditNote.querySelector("#title");
	editNoteContentInput = modalViewEditNote.querySelector("#content");
	editNoteForm = modalViewEditNote.querySelector(".form");
	deleteNoteForm = modalViewDeleteNote.querySelector(".form");
};
const prepareDOMEvents = () => {
	asideAddBtn.addEventListener("click", () => openModal(modalViewAddNote));
	notesBox.addEventListener("click", notesAddBtnHandle);
	notesDeleteBtn.forEach((btn) =>
		btn.addEventListener("click", () => openModal(modalViewDeleteNote)),
	);
	// notesEditBtn.forEach((btn) =>
	// 	btn.addEventListener("click", () => openModal(modalViewEditNote)),
	// );
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
	addCategoryform.addEventListener("submit", addCategoryHandle);
	addCategoryColorBtns.forEach((btn) =>
		btn.addEventListener("click", addCategoryColorsHandle),
	);
	categoryBoxes.forEach((box) =>
		box.addEventListener("click", handleCategoryBoxClick),
	);
	// nowe
	addNoteForm.addEventListener("submit", addNoteHandle);
	editNoteForm.addEventListener("submit", editNoteHandle);
	deleteNoteForm.addEventListener("submit", deleteNoteHandle);
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
	categoryBoxes.forEach((box) => {
		box.innerHTML = "";
		categoriesArray.forEach((category) => {
			const catBtn = document.createElement("button");
			catBtn.type = "button";
			catBtn.classList.add("category__box-option", category.color);
			catBtn.textContent = category.name;
			catBtn.dataset.categoryId = category.id;

			box.append(catBtn);
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
		box.append(addCatBtn);
	});
};
const clearAddCategoryForm = () => {
	addCategoryform.reset();
	addCategoryColorBtns.forEach((btn) => {
		btn.classList.remove("category-color--active");
		selectedCategoryColor = "";
	});
};
const addCategoryHandle = (e) => {
	e.preventDefault();
	if (addCategoryTitleInput.value === "" || selectedCategoryColor === "") {
		console.log("uzupłnij dane =");
		// tutaj trzeb bedzie dodać jeszcze jakis paragraf ktory bedzie wyswietlal błąd
	} else {
		const category = {
			id: Date.now(),
			name: addCategoryTitleInput.value,
			color: selectedCategoryColor,
		};
		categoriesArray.push(category);
		saveCategoriesToLocalStorage();
		renderCategories();
		clearAddCategoryForm();
		openModal(returnModalView);
	}
};
const handleCategoryBoxClick = (e) => {
	if (e.target.closest('[data-action="add-category"]')) {
		returnModalView = e.currentTarget.closest(".modal__view");
		openModal(modalViewAddCategory);
		return;
	}
	const categoryBtn = e.target.closest("[data-category-id]");
	if (categoryBtn) {
		selectedCategoryId = categoryBtn.dataset.categoryId;
		// console.log(selectedCategoryId);
	}
};
const saveCategoriesToLocalStorage = () => {
	localStorage.setItem("categories", JSON.stringify(categoriesArray));
};
const loadCategoriesFromLocalStorage = () => {
	const data = localStorage.getItem("categories");
	if (!data) return;
	categoriesArray = JSON.parse(data);
};

const addNoteHandle = (e) => {
	e.preventDefault();
	if (
		addNoteTitleInput.value === "" ||
		addNoteContentInput.value === "" ||
		!selectedCategoryId
	) {
		console.log("uzupelnij wszystkie dane");
		return;
	}
	const note = {
		id: Date.now(),
		title: addNoteTitleInput.value,
		content: addNoteContentInput.value,
		categoryId: Number(selectedCategoryId),
		createdAt: new Date().toISOString(),
	};
	notesArray.push(note);
	saveNotesToLocalStorage();
	renderNotes();
	addNoteTitleInput.value = "";
	addNoteContentInput.value = "";
	closeModal();
};

const renderNotes = () => {
	notesBox.innerHTML = "";
	if (notesArray.length === 0) {
		const notesBtnAdd = document.createElement("button");
		notesBtnAdd.classList.add("notes__add-btn", "notes__add-btn--active");
		notesBtnAdd.dataset.action = "notes-btn-add";
		notesBtnAdd.title = "Dodaj notatkę";
		notesBtnAdd.innerHTML =
			'<img src="./icons/plus.svg" alt="" class="notes__add-btn-icon">Dodaj notatkę';
		notesBox.append(notesBtnAdd);
	}
	notesArray.forEach((note) => {
		const category = categoriesArray.find(
			(category) => category.id === note.categoryId,
		);
		const date = new Date(note.createdAt);
		const notesItem = document.createElement("div");
		notesItem.classList.add("notes__item", category.color);
		notesItem.addEventListener("click", (e) => {
			if (e.target.closest('[data-action="notes-btn-edit"]')) {
				notesEditBtnHandle(note);
			} else if (e.target.closest('[data-action="notes-btn-delete"]')) {
				notesDeleteBtnHandle(note);
			}
		});
		notesItem.dataset.noteId = note.id;
		notesBox.append(notesItem);
		const notesItemTitle = document.createElement("h2");
		notesItemTitle.classList.add("notes__item-title");
		notesItemTitle.innerText = note.title;
		notesItem.append(notesItemTitle);
		const notesItemText = document.createElement("p");
		notesItemText.classList.add("notes__item-text");
		let previewContent = note.content;
		if (previewContent.length > 445) {
			previewContent = previewContent.slice(0, 445) + "...";
			notesItemText.innerText = previewContent;
		} else {
			notesItemText.innerText = previewContent;
		}
		notesItem.append(notesItemText);
		const notesItemBottom = document.createElement("div");
		notesItemBottom.classList.add("notes__item-bottom");
		notesItem.append(notesItemBottom);
		const notesItemDate = document.createElement("p");
		notesItemDate.classList.add("notes__item-date");
		notesItemDate.innerText = date.toLocaleDateString();
		notesItemBottom.append(notesItemDate);
		const notesItemControls = document.createElement("div");
		notesItemControls.classList.add("notes__item-controls");
		notesItemBottom.append(notesItemControls);
		const notesBtnDelete = document.createElement("button");
		notesBtnDelete.classList.add(
			"notes__item-btn",
			"notes__item-btn--delete",
			"secondary-btn",
			"secondary-btn--delete",
		);
		notesBtnDelete.dataset.action = "notes-btn-delete";
		notesBtnDelete.title = "Usuń notatkę";
		notesBtnDelete.innerHTML = '<img src="./icons/trash.svg" alt="">';
		notesItemControls.append(notesBtnDelete);
		const notesBtnEdit = document.createElement("button");
		notesBtnEdit.classList.add(
			"notes__item-btn",
			"notes__item-btn--edit",
			"secondary-btn",
		);
		notesBtnEdit.dataset.action = "notes-btn-edit";
		notesBtnEdit.title = "Edytuj notatkę";
		notesBtnEdit.innerHTML = '<img src="./icons/edit.svg" alt="">';
		notesItemControls.append(notesBtnEdit);
	});
};
const saveNotesToLocalStorage = () => {
	localStorage.setItem("notes", JSON.stringify(notesArray));
};
const loadNotesFromLocalStorage = () => {
	const data = localStorage.getItem("notes");
	if (!data) return;
	notesArray = JSON.parse(data);
};
const notesAddBtnHandle = (e) => {
	if (e.target.closest('[data-action="notes-btn-add"]')) {
		openModal(modalViewAddNote);
		return;
	}
};
const notesEditBtnHandle = (note) => {
	editNoteTitleInput.value = note.title;
	editNoteContentInput.value = note.content;
	editNoteForm.dataset.noteId = note.id;
	openModal(modalViewEditNote);
	return;
};
const editNoteHandle = (e) => {
	e.preventDefault();
	if (
		editNoteTitleInput.value === "" ||
		editNoteContentInput.value === "" ||
		!selectedCategoryId
	) {
		console.log("uzupelnij wszystkie dane");
		return;
	}
	const noteId = Number(editNoteForm.dataset.noteId);
	const note = notesArray.find((note) => note.id === noteId);
	note.title = editNoteTitleInput.value;
	note.content = editNoteContentInput.value;
	note.categoryId = Number(selectedCategoryId);
	saveNotesToLocalStorage();
	renderNotes();
	addNoteTitleInput.value = "";
	addNoteContentInput.value = "";
	closeModal();
};
const notesDeleteBtnHandle = (note) => {
	deleteNoteForm.dataset.noteId = note.id;
	openModal(modalViewDeleteNote);
};
const deleteNoteHandle = () => {
	const noteId = Number(deleteNoteForm.dataset.noteId);
	const noteIndex = notesArray.findIndex((note) => note.id === noteId);
	if (noteIndex !== -1) {
		notesArray.splice(noteIndex, 1);
	}
	saveNotesToLocalStorage();
	renderNotes();
	closeModal();
};
main();

// - modal tworzenia notatki jest za duzy na malych ekranach latopach
// - dodac animacje do wybierania koloru w tworzeniu kategorii
// - skonczyłem na stworzeniu obiektu note i prowizorycznej walidacji
