import { formSettings } from "./data.js";

const formList = document.querySelectorAll(formSettings.formSelector);

function showInputError(form, input, errorMessage, formSettings) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(formSettings.inputErrorClass);
  inputError.textContent = errorMessage;
}

export function hideInputError(form, input, formSettings) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(formSettings.inputErrorClass);
  inputError.textContent = "";
}

function checkInputValidity(form, input) {
  !input.validity.valid
    ? showInputError(form, input, input.validationMessage, formSettings)
    : hideInputError(form, input, formSettings);
}

function isFormInvalid(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

export function disableBtnSubmit(btnSubmit, formSettings) {
  btnSubmit.classList.add(formSettings.btnSubmitDisabledClass);
  btnSubmit.setAttribute("disabled", "disabled");
}

function enableBtnSubmit(btnSubmit, formSettings) {
  btnSubmit.classList.remove(formSettings.btnSubmitDisabledClass);
  btnSubmit.removeAttribute("disabled");
}

function toggleSubmitBtnDisabling(inputList, btnSubmit, formSettings) {
  if (isFormInvalid(inputList)) {
    disableBtnSubmit(btnSubmit, formSettings);
  } else {
    enableBtnSubmit(btnSubmit, formSettings);
  }
}

function checkFormValidity(form, formSettings) {
  const inputList = Array.from(
    form.querySelectorAll(formSettings.inputSelector)
  );
  const btnSubmit = form.querySelector(formSettings.btnSubmitSelector);

  toggleSubmitBtnDisabling(inputList, btnSubmit, formSettings);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleSubmitBtnDisabling(inputList, btnSubmit, formSettings);
    });
  });
}

function enableValidation(formSettings) {
  formList.forEach((form) => {
    checkFormValidity(form, formSettings);
  });
}

enableValidation(formSettings);
