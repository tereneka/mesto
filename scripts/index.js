import { initialCards } from "./data.js";

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

const btnCloseProfileEdit = popupProfileEdit.querySelector(".popup__close-btn");
const btnCloseCardAdd = popupCardAdd.querySelector(".popup__close-btn");
const btnCloseFullscreenPhoto =
  popupFullscreenPhoto.querySelector(".popup__close-btn");

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
}

function openProfileEdit() {
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
  openPopup(popupProfileEdit);
}

function openFullscreenPhoto(card) {
  fullscreenPhoto.src = card.link;
  fullscreenPhoto.alt = card.name;
  fullscreenPhotoCaption.textContent = card.name;
  openPopup(popupFullscreenPhoto);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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

function likeCard(evt) {
  evt.target.classList.toggle("elements__like_active");
}

function deleteCard(btn) {
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

  likeCardBtn.addEventListener("click", likeCard);

  trashCardBtn.addEventListener("click", () => deleteCard(trashCardBtn));

  cardPhoto.addEventListener("click", () => openFullscreenPhoto(card));

  return cardElement;
}

function renderCard(card) {
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((card) => renderCard(card));

btnOpenProfileEdit.addEventListener("click", openProfileEdit);
btnCloseProfileEdit.addEventListener("click", () =>
  closePopup(popupProfileEdit)
);
formProfileEdit.addEventListener("submit", submitFormProfileEdit);

btnOpenCardAdd.addEventListener("click", () => openPopup(popupCardAdd));
btnCloseCardAdd.addEventListener("click", () => closePopup(popupCardAdd));
formCardAdd.addEventListener("submit", submitFormCardAdd);

btnCloseFullscreenPhoto.addEventListener("click", () =>
  closePopup(popupFullscreenPhoto)
);
