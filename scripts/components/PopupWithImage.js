import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector(".popup__photo");
    this._caption = this._popup.querySelector(".popup__photo-caption");
  }

  open(item) {
    this._photo.src = item.link;
    this._photo.alt = item.name;
    this._caption.textContent = item.name;
    super.open();
  }
}
