let editButton = document.querySelector(".edit-button");
let popupCloseBtn = document.querySelector(".popup__close-btn");
let popup = document.querySelector(".popup");
let editForm = document.querySelector(".popup__form");
let nameInput = editForm.querySelector("#userName");
let aboutInput = editForm.querySelector("#userAbout");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function openPopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup();
}

editButton.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
editForm.addEventListener("submit", formSubmitHandler);
