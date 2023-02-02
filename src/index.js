import "./pages/index.css";
import Card from "./scripts/components/Card";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import { formConfig, dbConfig } from "./scripts/data.js";
import {
  btnOpenProfileEdit,
  btnOpenCardAdd,
  btnOpenAvatarEdit,
  content,
  spinner,
} from "./scripts/constants.js";
import Api from "./scripts/components/Api";
import PopupWithConfirm from "./scripts/components/PopupWithConfirm";

const api = new Api(dbConfig);

const profile = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const cardsSection = new Section(
  (cardData) => renderCard(cardData),
  ".elements"
);

const popupFullscreenPhoto = new PopupWithImage(".popup_name_fullscreen-photo");
const popupAvatareEdit = new PopupWithForm(
  ".popup_name_edit-avatar",
  handleAvatarFormSubmit
);
const popupProfileEdit = new PopupWithForm(
  ".popup_name_edit-profile",
  handleProfileFormSubmit
);
const popupCardAdd = new PopupWithForm(
  ".popup_name_add-card",
  handleCardFormSubmit
);
const popupCardDelete = new PopupWithConfirm(".popup_name_delete-card");

const formAvatarEditValidator = new FormValidator(
  formConfig,
  document.editAvatar
);
const formProfileEditValidator = new FormValidator(
  formConfig,
  document.editProfile
);
const formCardAddValidator = new FormValidator(formConfig, document.addCard);

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    profile.getUserInfo().id,
    "#card-template",
    () => popupFullscreenPhoto.open(cardData),
    () => {
      popupCardDelete.setHandlerConfirmBtnClick(() =>
        handleBtnConfirmDeleteClick(cardElement.getCardId(), () =>
          cardElement.deleteCard()
        )
      );
      popupCardDelete.open();
    },
    () => {
      api
        .addCardLike(cardElement.getCardId())
        .then((data) => {
          cardElement.activateLikeBtn();
          cardElement.setLikesCount(data.likes.length);
        })
        .catch((err) => console.log(err));
    },
    () => {
      api
        .deleteCardLike(cardElement.getCardId())
        .then((data) => {
          cardElement.disactivateLikeBtn();
          cardElement.setLikesCount(data.likes.length);
        })
        .catch((err) => console.log(err));
    }
  );

  return cardElement.createCard();
}

function renderCard(cardData) {
  cardsSection.addItem(createCard(cardData));
}

function openAvatarEdit() {
  formAvatarEditValidator.resetValidation();
  const avatarLink = profile.getUserInfo().avatar;
  popupAvatareEdit.setInputValues({ avatar: avatarLink });
  popupAvatareEdit.open();
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

function handleAvatarFormSubmit(inputValues) {
  popupAvatareEdit.setSubmitBtnText("Сохранение...");
  api
    .setAvatar({ avatar: inputValues.avatar })
    .then((data) => {
      profile.setAvatarLink(data.avatar);
      popupAvatareEdit.close();
    })
    .catch((err) => popupAvatareEdit.showErrMessage(err))
    .finally(() => {
      popupAvatareEdit.setSubmitBtnText("Сохранить");
    });
}

function handleProfileFormSubmit(inputValues) {
  popupProfileEdit.setSubmitBtnText("Сохранение...");
  api
    .setUserInfo({ name: inputValues.userName, about: inputValues.userAbout })
    .then((data) => {
      profile.setUserInfo(data.name, data.about);
      popupProfileEdit.close();
    })
    .catch((err) => popupProfileEdit.showErrMessage(err))
    .finally(() => {
      popupProfileEdit.setSubmitBtnText("Сохранить");
    });
}

function handleCardFormSubmit(inputValues) {
  popupCardAdd.setSubmitBtnText("Сохранение...");
  api
    .postCard({ name: inputValues.cardName, link: inputValues.cardLink })
    .then((data) => {
      renderCard(data);
      popupCardAdd.close();
    })
    .catch((err) => popupCardAdd.showErrMessage(err))
    .finally(() => {
      popupCardAdd.setSubmitBtnText("Сохранить");
    });
}

function handleBtnConfirmDeleteClick(id, callback) {
  api
    .deleteCard(id)
    .then((data) => {
      callback();
      popupCardDelete.close();
    })
    .catch((err) => {
      popupCardDelete.showErrMessage(err);
    });
}

function renderErrMessage(err, errSelector) {
  const errElement = document.querySelector(errSelector);
  errElement.textContent = err;
  errElement.classList.add("error_visible");
}

function renderLoading() {
  spinner.classList.add("spinner_visible");
  content.classList.add("content_invisible");
}

renderLoading(); // рендерим спинер до загрузки контента

// рендерим результат загрузки контена
Promise.all([api.getUserInfo(), api.getCards()])
  .then((data) => {
    const [profileData, cardsData] = data;

    profile.setUserInfo(profileData.name, profileData.about, profileData._id);
    profile.setAvatarLink(profileData.avatar);

    cardsSection.renderItems(cardsData.reverse());
    content.classList.remove("content_invisible");
  })
  .catch((err) => {
    console.log(err);
    renderErrMessage(err, ".error_for_content");
  })
  .finally(() => {
    spinner.classList.remove("spinner_visible");
  });

btnOpenAvatarEdit.addEventListener("click", openAvatarEdit);

btnOpenProfileEdit.addEventListener("click", openProfileEdit);

btnOpenCardAdd.addEventListener("click", () => {
  formCardAddValidator.resetValidation();
  popupCardAdd.open();
});

[
  popupAvatareEdit,
  popupProfileEdit,
  popupCardAdd,
  popupFullscreenPhoto,
].forEach((popup) => popup.setEventListeners());

[
  formAvatarEditValidator,
  formProfileEditValidator,
  formCardAddValidator,
].forEach((validator) => {
  validator.enableValidation();
});
