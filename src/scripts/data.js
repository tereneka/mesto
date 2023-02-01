export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const formConfig = {
  inputSelector: ".popup__input",
  btnSubmitSelector: ".popup__submit-btn",
  btnSubmitDisabledClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
};

export const dbConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "7c6b4eae-2b61-4300-aafd-9a098ac2af77",
    "Content-Type": "application/json",
  },
};
