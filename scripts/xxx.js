import { initialCards, formConfig } from "./data.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { openPopup, closePopup } from "./utils/utils.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const cardsContainer = document.querySelector(".elements");

const popupProfileEdit = document.querySelector(".popup_name_edit-profile");
const popupCardAdd = document.querySelector(".popup_name_add-card");
const popupFullscreenPhoto = document.querySelector(
  ".popup_name_fullscreen-photo"
);

const btnOpenProfileEdit = document.querySelector(".profile__edit-btn");
const btnOpenCardAdd = document.querySelector(".profile__add-btn");

const formProfileEdit = popupProfileEdit.querySelector(".popup__form");
const formProfileEditValidator = new FormValidator(formConfig, formProfileEdit);
const inputUserName = formProfileEdit.querySelector(
  ".popup__input_data_user-name"
);
const inputUserAbout = formProfileEdit.querySelector(
  ".popup__input_data_user-about"
);

const formCardAdd = popupCardAdd.querySelector(".popup__form");
const formCardAddValidator = new FormValidator(formConfig, formCardAdd);
const inputCardName = formCardAdd.querySelector(".popup__input_data_card-name");
const inputCardLink = formCardAdd.querySelector(".popup__input_data_card-link");

function openProfileEdit() {
  formProfileEditValidator.resetForm();
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
  openPopup(popupProfileEdit);
}

function submitFormProfileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputUserAbout.value;
  closePopup(popupProfileEdit);
}

function submitFormCardAdd(evt) {
  evt.preventDefault();
  renderCard({
    name: inputCardName.value,
    link: inputCardLink.value,
  });
  closePopup(popupCardAdd);
}

function renderCard(data) {
  const cardElement = new Card(data, "#card-template").createCard();
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(renderCard);

btnOpenProfileEdit.addEventListener("click", openProfileEdit);

formProfileEdit.addEventListener("submit", submitFormProfileEdit);

btnOpenCardAdd.addEventListener("click", () => {
  formCardAddValidator.resetForm();
  openPopup(popupCardAdd);
});

formCardAdd.addEventListener("submit", submitFormCardAdd);

[popupProfileEdit, popupCardAdd, popupFullscreenPhoto].forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("popup__close-btn")
    ) {
      closePopup(popup);
    }
  });
});

[formProfileEditValidator, formCardAddValidator].forEach((validator) => {
  validator.enableValidation();
});
