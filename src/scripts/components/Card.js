export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _handleLikeClick(e) {
    e.target.classList.toggle("elements__like_active");
  }

  _handleTrashClick(e) {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", this._handleCardClick.bind(this));
    this._cardElement
      .querySelector(".elements__like")
      .addEventListener("click", this._handleLikeClick);
    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", this._handleTrashClick.bind(this));
  }
}
