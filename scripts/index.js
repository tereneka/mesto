import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import { initialCards, formConfig } from "./data.js";

const profile = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

const popupFullscreenPhoto = new PopupWithImage(".popup_name_fullscreen-photo");
const popupProfileEdit = new PopupWithForm(
  ".popup_name_edit-profile",
  submitFormProfileEdit
);
const popupCardAdd = new PopupWithForm(
  ".popup_name_add-card",
  submitFormCardAdd
);

const formProfileEditValidator = new FormValidator(
  formConfig,
  popupProfileEdit.form
);
const formCardAddValidator = new FormValidator(formConfig, popupCardAdd.form);

const btnOpenProfileEdit = document.querySelector(".profile__edit-btn");
const btnOpenCardAdd = document.querySelector(".profile__add-btn");

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => renderCard(item),
  },
  ".elements"
);

function renderCard(item) {
  const cardElement = new Card(item, "#card-template", () =>
    popupFullscreenPhoto.open(item)
  ).createCard();
  cardList.addItem(cardElement);
}

function openProfileEdit() {
  formProfileEditValidator.resetForm();
  const userInfo = profile.getUserInfo();
  popupProfileEdit.setInputValue("userName", userInfo.name);
  popupProfileEdit.setInputValue("userAbout", userInfo.about);
  popupProfileEdit.open();
}

function submitFormProfileEdit(inputValues) {
  profile.setUserInfo(inputValues.userName, inputValues.userAbout);
}

function submitFormCardAdd(inputValues) {
  renderCard({
    name: inputValues.cardName,
    link: inputValues.cardLink,
  });
}

cardList.renderItems();

btnOpenProfileEdit.addEventListener("click", openProfileEdit);

btnOpenCardAdd.addEventListener("click", () => {
  formCardAddValidator.resetForm();
  popupCardAdd.open();
});

[popupProfileEdit, popupCardAdd, popupFullscreenPhoto].forEach((popup) =>
  popup.setEventListeners()
);

[formProfileEditValidator, formCardAddValidator].forEach((validator) => {
  validator.enableValidation();
});
