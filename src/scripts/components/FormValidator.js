export default class FormValidator {
  constructor(formConfig, form) {
    this._inputSelector = formConfig.inputSelector;
    this._btnSubmitSelector = formConfig.btnSubmitSelector;
    this._btnSubmitDisabledClass = formConfig.btnSubmitDisabledClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._btnSubmit = this._form.querySelector(this._btnSubmitSelector);
  }

  _showInputError(input, errorMessage) {
    const inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
  }

  _hideInputError(input) {
    const inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    inputError.textContent = "";
  }

  _checkInputValidity(input) {
    !input.validity.valid
      ? this._showInputError(input, input.validationMessage)
      : this._hideInputError(input);
  }

  _isFormInvalid() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _disableBtnSubmit() {
    this._btnSubmit.classList.add(this._btnSubmitDisabledClass);
    this._btnSubmit.disabled = true;
  }

  _enableBtnSubmit() {
    this._btnSubmit.classList.remove(this._btnSubmitDisabledClass);
    this._btnSubmit.disabled = false;
  }

  _toggleSubmitBtnDisabling() {
    if (this._isFormInvalid()) {
      this._disableBtnSubmit();
    } else {
      this._enableBtnSubmit();
    }
  }

  _setEventListeners() {
    this._toggleSubmitBtnDisabling();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleSubmitBtnDisabling();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._disableBtnSubmit();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
