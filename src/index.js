import "./pages/index.css";
import Card from "./scripts/components/Card";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import { initialCards, formConfig } from "./scripts/data.js";
import { btnOpenProfileEdit, btnOpenCardAdd } from "./scripts/constants.js";

const profile = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

const popupFullscreenPhoto = new PopupWithImage(".popup_name_fullscreen-photo");
const popupProfileEdit = new PopupWithForm(
  ".popup_name_edit-profile",
  handleProfileFormSubmit
);
const popupCardAdd = new PopupWithForm(
  ".popup_name_add-card",
  handleCardFormSubmit
);

const formProfileEditValidator = new FormValidator(
  formConfig,
  document.editProfile
);
const formCardAddValidator = new FormValidator(formConfig, document.addCard);

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => renderCard(cardData),
  },
  ".elements"
);

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", () =>
    popupFullscreenPhoto.open(cardData)
  ).createCard();

  return cardElement;
}

function renderCard(cardData) {
  cardsSection.addItem(createCard(cardData));
}

function openProfileEdit() {
  formProfileEditValidator.resetValidation();
  const userInfo = profile.getUserInfo();
  popupProfileEdit.setInputValues({
    userName: userInfo.name,
    userAbout: userInfo.about,
  });
  popupProfileEdit.open();
}

function handleProfileFormSubmit(inputValues) {
  profile.setUserInfo(inputValues.userName, inputValues.userAbout);
  popupProfileEdit.close();
}

function handleCardFormSubmit(inputValues) {
  renderCard({
    name: inputValues.cardName,
    link: inputValues.cardLink,
  });
  popupCardAdd.close();
}

cardsSection.renderItems();

btnOpenProfileEdit.addEventListener("click", openProfileEdit);

btnOpenCardAdd.addEventListener("click", () => {
  formCardAddValidator.resetValidation();
  popupCardAdd.open();
});

[popupProfileEdit, popupCardAdd, popupFullscreenPhoto].forEach((popup) =>
  popup.setEventListeners()
);

[formProfileEditValidator, formCardAddValidator].forEach((validator) => {
  validator.enableValidation();
});
