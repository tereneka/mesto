import { initialCards, formConfig } from "./data.js";
import Card, { cardsContainer } from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popupProfileEdit = document.querySelector(".popup_name_edit-profile");
const popupCardAdd = document.querySelector(".popup_name_add-card");
const popupFullscreenPhoto = document.querySelector(
  ".popup_name_fullscreen-photo"
);

const btnOpenProfileEdit = document.querySelector(".profile__edit-btn");
const btnOpenCardAdd = document.querySelector(".profile__add-btn");

const formProfileEdit = popupProfileEdit.querySelector(".popup__form");
const inputUserName = formProfileEdit.querySelector(
  ".popup__input_data_user-name"
);
const inputUserAbout = formProfileEdit.querySelector(
  ".popup__input_data_user-about"
);

const formCardAdd = popupCardAdd.querySelector(".popup__form");
const inputCardName = formCardAdd.querySelector(".popup__input_data_card-name");
const inputCardLink = formCardAdd.querySelector(".popup__input_data_card-link");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function openProfileEdit() {
  resetForm(formProfileEdit);
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
  openPopup(popupProfileEdit);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
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

function hideInputError(form, input, formConfig) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(formConfig.inputErrorClass);
  inputError.textContent = "";
}

function disableBtnSubmit(btnSubmit, formConfig) {
  btnSubmit.classList.add(formConfig.btnSubmitDisabledClass);
  btnSubmit.setAttribute("disabled", "disabled");
}

function resetForm(form) {
  const inputList = form.querySelectorAll(formConfig.inputSelector);
  const btnSubmit = form.querySelector(formConfig.btnSubmitSelector);

  inputList.forEach((input) => {
    hideInputError(form, input, formConfig);
  });
  disableBtnSubmit(btnSubmit, formConfig);
  form.reset();
}

function renderCard(data) {
  const cardElement = new Card(data, "#card-template").createCard();
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(renderCard);

Card.setEventListeners();

btnOpenProfileEdit.addEventListener("click", openProfileEdit);

formProfileEdit.addEventListener("submit", submitFormProfileEdit);

btnOpenCardAdd.addEventListener("click", () => {
  resetForm(formCardAdd);
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

[formProfileEdit, formCardAdd].forEach((form) => {
  new FormValidator(formConfig, form).enableValidation();
});
