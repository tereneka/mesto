export default class FormValidator {
  constructor(formConfig, form) {
    this._formSelector = formConfig.formSelector;
    this._inputSelector = formConfig.inputSelector;
    this._btnSubmitSelector = formConfig.btnSubmitSelector;
    this._btnSubmitDisabledClass = formConfig.btnSubmitDisabledClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._form = form;
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

  _isFormInvalid(inputList) {
    return inputList.some((input) => !input.validity.valid);
  }

  _disableBtnSubmit(btnSubmit) {
    btnSubmit.classList.add(this._btnSubmitDisabledClass);
    btnSubmit.setAttribute("disabled", "disabled");
  }

  _enableBtnSubmit(btnSubmit) {
    btnSubmit.classList.remove(this._btnSubmitDisabledClass);
    btnSubmit.removeAttribute("disabled");
  }

  _toggleSubmitBtnDisabling(inputList, btnSubmit) {
    if (this._isFormInvalid(inputList)) {
      this._disableBtnSubmit(btnSubmit);
    } else {
      this._enableBtnSubmit(btnSubmit);
    }
  }

  _checkFormValidity() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const btnSubmit = this._form.querySelector(this._btnSubmitSelector);

    this._toggleSubmitBtnDisabling(inputList, btnSubmit);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleSubmitBtnDisabling(inputList, btnSubmit);
      });
    });
  }

  enableValidation() {
    this._checkFormValidity();
  }
}
