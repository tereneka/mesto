import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmBtn = this._popup.querySelector(".popup__submit-btn");
    this._contentBox = this._popup.querySelector(".popup__content-box");
    this._errMessage = this._popup.querySelector(".error");
  }

  setHandlerConfirmBtnClick(callback) {
    this._handleConfirmBtnClick = callback;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._popup
      .querySelector(".popup__submit-btn")
      .addEventListener("click", this._handleConfirmBtnClick);

    super.setEventListeners();
  }

  close() {
    this._hideErrMessage();
    super.close();
  }

  showErrMessage(err) {
    this._contentBox.classList.add("popup__content-box_invisible");
    this._errMessage.textContent = err;
    this._errMessage.classList.add("error_visible");
  }

  _hideErrMessage() {
    this._contentBox.classList.remove("popup__content-box_invisible");
    this._errMessage.textContent = "";
    this._errMessage.classList.remove("error_visible");
  }
}
