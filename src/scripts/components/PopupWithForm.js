import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._btnSubmit = this._form.querySelector(".popup__submit-btn");
    this._contentBox = this._popup.querySelector(".popup__content-box");
    this._errMessage = this._popup.querySelector(".error");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(inputsData) {
    this._inputList.forEach((input) => {
      input.value = inputsData[input.name];
    });
  }

  setSubmitBtnText(text) {
    this._btnSubmit.textContent = text;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
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
