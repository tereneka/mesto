export default class Card {
  constructor(
    data,
    ownerId,
    templateSelector,
    handleCardClick,
    handleTrashClick,
    addLike,
    deleteLike
  ) {
    this._data = data;
    this._ownerId = ownerId;
    this._likesCount = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._cardElement = this._getTemplate();
    this._trashElement = this._cardElement.querySelector(".elements__trash");
    this._likeBtnElement = this._cardElement.querySelector(".elements__like");
    this._likesCountElement = this._cardElement.querySelector(
      ".elements__like-count"
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    if (this._data.owner._id !== this._ownerId) {
      this._trashElement.remove();
    }
    this._cardElement.querySelector(".elements__title").textContent =
      this._data.name;
    this._cardPhoto = this._cardElement.querySelector(".elements__photo");
    this._cardPhoto.src = this._data.link;
    this._cardPhoto.alt = this._data.name;
    this._likesCountElement.textContent = this._likesCount;
    if (this._data.likes.some((i) => i._id === this._ownerId)) {
      this.activateLikeBtn();
    }
    this._setEventListeners();

    return this._cardElement;
  }

  activateLikeBtn() {
    this._likeBtnElement.classList.add("elements__like_active");
  }

  disactivateLikeBtn() {
    this._likeBtnElement.classList.remove("elements__like_active");
  }

  setLikesCount(count) {
    this._likesCount = count;
    this._likesCountElement.textContent = count;
  }

  _handleLikeClick(e) {
    if (e.target.classList.contains("elements__like_active")) {
      this._deleteLike();
    } else {
      this._addLike();
    }
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", this._handleCardClick.bind(this));
    this._cardElement
      .querySelector(".elements__like")
      .addEventListener("click", this._handleLikeClick.bind(this));
    if (this._data.owner._id == this._ownerId) {
      this._trashElement.addEventListener("click", this._handleTrashClick);
    }
  }

  getCardId() {
    return this._data._id;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
