import { initialCards, formConfig } from "./data.js";
import {
  hideInputError,
  disableBtnSubmit,
  enableValidation,
} from "./validate.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const cardsContainer = document.querySelector(".elements");
const cardTemplate = cardsContainer.querySelector("#card-template").content;

const popupProfileEdit = document.querySelector(".popup_name_edit-profile");
const popupCardAdd = document.querySelector(".popup_name_add-card");
const popupFullscreenPhoto = document.querySelector(
  ".popup_name_fullscreen-photo"
);

const btnOpenProfileEdit = document.querySelector(".profile__edit-btn");
const btnOpenCardAdd = document.querySelector(".profile__add-btn");

const formList = document.querySelectorAll(formConfig.formSelector);

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

const fullscreenPhoto = popupFullscreenPhoto.querySelector(".popup__photo");
const fullscreenPhotoCaption = popupFullscreenPhoto.querySelector(
  ".popup__photo-caption"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupbyEsc);
}

function openProfileEdit() {
  resetForm(formProfileEdit);
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
  openPopup(popupProfileEdit);
}

function openFullscreenPhoto(e) {
  fullscreenPhoto.src = e.target.src;
  fullscreenPhoto.alt = e.target.alt;
  fullscreenPhotoCaption.textContent = e.target.alt;
  openPopup(popupFullscreenPhoto);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupbyEsc);
}

function closePopupbyEsc(e) {
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

function resetForm(form) {
  const inputList = form.querySelectorAll(formConfig.inputSelector);
  const btnSubmit = form.querySelector(formConfig.btnSubmitSelector);

  inputList.forEach((input) => {
    hideInputError(form, input, formConfig);
  });
  disableBtnSubmit(btnSubmit, formConfig);
  form.reset();
}

function likeCard(evt) {
  evt.target.classList.toggle("elements__like_active");
}

function removeCard(btn) {
  btn.closest(".elements__item").remove();
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector(".elements__photo");
  const cardTitle = cardElement.querySelector(".elements__title");
  const likeCardBtn = cardElement.querySelector(".elements__like");
  const trashCardBtn = cardElement.querySelector(".elements__trash");

  cardTitle.textContent = card.name;
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;

  return cardElement;
}

function renderCard(card) {
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(renderCard);

cardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("elements__like")) {
    likeCard(e);
  } else if (e.target.classList.contains("elements__trash")) {
    removeCard(e.target);
  } else if (e.target.classList.contains("elements__photo")) {
    openFullscreenPhoto(e);
  }
});

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

enableValidation(formConfig, formList);
