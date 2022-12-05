import { formConfig } from "./data.js";

function showInputError(form, input, errorMessage, formConfig) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(formConfig.inputErrorClass);
  inputError.textContent = errorMessage;
}

export function hideInputError(form, input, formConfig) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(formConfig.inputErrorClass);
  inputError.textContent = "";
}

function checkInputValidity(form, input) {
  !input.validity.valid
    ? showInputError(form, input, input.validationMessage, formConfig)
    : hideInputError(form, input, formConfig);
}

function isFormInvalid(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

export function disableBtnSubmit(btnSubmit, formConfig) {
  btnSubmit.classList.add(formConfig.btnSubmitDisabledClass);
  btnSubmit.setAttribute("disabled", "disabled");
}

function enableBtnSubmit(btnSubmit, formConfig) {
  btnSubmit.classList.remove(formConfig.btnSubmitDisabledClass);
  btnSubmit.removeAttribute("disabled");
}

function toggleSubmitBtnDisabling(inputList, btnSubmit, formConfig) {
  if (isFormInvalid(inputList)) {
    disableBtnSubmit(btnSubmit, formConfig);
  } else {
    enableBtnSubmit(btnSubmit, formConfig);
  }
}

function checkFormValidity(form, formConfig) {
  const inputList = Array.from(form.querySelectorAll(formConfig.inputSelector));
  const btnSubmit = form.querySelector(formConfig.btnSubmitSelector);

  toggleSubmitBtnDisabling(inputList, btnSubmit, formConfig);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleSubmitBtnDisabling(inputList, btnSubmit, formConfig);
    });
  });
}

export function enableValidation(formConfig) {
  const formList = document.querySelectorAll(formConfig.formSelector);
  formList.forEach((form) => {
    checkFormValidity(form, formConfig);
  });
}
