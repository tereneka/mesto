import { openPopup } from "./utils/utils.js";

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
    this._cardPhoto = this._cardElement.querySelector(".elements__photo");
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._title;

    this._setEventListeners();

    return this._cardElement;
  }

  _openFullscreenPhoto(e) {
    fullscreenPhoto.src = e.target.src;
    fullscreenPhoto.alt = e.target.alt;
    fullscreenPhotoCaption.textContent = e.target.alt;
    openPopup(popupFullscreenPhoto);
  }

  _likeCard(e) {
    e.target.classList.toggle("elements__like_active");
  }

  _removeCard(e) {
    e.target.closest(".elements__item").remove();
  }

  // Не поняла почему установка слушателей на контейнер карточек является не корректным, в теории про делегирование было сказано, что это более эффективный способ и в 6-й ПР у меня приняли вариант с делигированием.
  _setEventListeners() {
    this._cardPhoto.addEventListener("click", this._openFullscreenPhoto);
    this._cardElement
      .querySelector(".elements__like")
      .addEventListener("click", this._likeCard);
    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", this._removeCard);
  }
}
