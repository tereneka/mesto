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
  popupProfileEdit.form.userName.value = userInfo.name;
  popupProfileEdit.form.userAbout.value = userInfo.about;
  popupProfileEdit.open();
}

function submitFormProfileEdit(e) {
  e.preventDefault();
  profile.setUserInfo(
    popupProfileEdit.form.userName.value,
    popupProfileEdit.form.userAbout.value
  );
  popupProfileEdit.close();
}

function submitFormCardAdd(e) {
  e.preventDefault();
  renderCard({
    name: popupCardAdd.form.cardName.value,
    link: popupCardAdd.form.cardLink.value,
  });
  popupCardAdd.close();
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
