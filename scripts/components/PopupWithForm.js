import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this.form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {}

  setEventListeners() {
    this.form.addEventListener("submit", this._submiter.bind(this));
    super.setEventListeners();
  }

  close() {
    this.form.reset();
    super.close();
  }
}
