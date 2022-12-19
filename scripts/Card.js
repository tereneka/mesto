export const cardsContainer = document.querySelector(".elements");
const popupFullscreenPhoto = document.querySelector(
  ".popup_name_fullscreen-photo"
);
const fullscreenPhoto = popupFullscreenPhoto.querySelector(".popup__photo");
const fullscreenPhotoCaption = popupFullscreenPhoto.querySelector(
  ".popup__photo-caption"
);

export default class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".elements__title").textContent =
      this._title;
    const cardPhoto = this._cardElement.querySelector(".elements__photo");
    cardPhoto.src = this._link;
    cardPhoto.alt = this._title;

    return this._cardElement;
  }

  static _closePopup() {
    popupFullscreenPhoto.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupByEsc);
  }

  static _closePopupByEsc(e) {
    if (e.key === "Escape") {
      this._closePopup();
    }
  }

  static _openPopup() {
    popupFullscreenPhoto.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupByEsc);
  }

  static _openFullscreenPhoto(e) {
    fullscreenPhoto.src = e.target.src;
    fullscreenPhoto.alt = e.target.alt;
    fullscreenPhotoCaption.textContent = e.target.alt;
    this._openPopup();
  }

  static _likeCard(e) {
    e.target.classList.toggle("elements__like_active");
  }

  static _removeCard(e) {
    e.target.closest(".elements__item").remove();
  }

  static setEventListeners() {
    cardsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("elements__like")) {
        this._likeCard(e);
      } else if (e.target.classList.contains("elements__trash")) {
        this._removeCard(e);
      } else if (e.target.classList.contains("elements__photo")) {
        this._openFullscreenPhoto(e);
      }
    });
  }
}
