import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputValues = {};
    this.form.querySelectorAll(".popup__input").forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValue(name, value) {
    this.form[name].value = value;
  }

  setEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this.form.reset();
    super.close();
  }
}
