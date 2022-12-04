// function showInputError(form, input, errorMessage) {
//   const inputError = form.querySelector(`.${input.id}-error`);
//   input.classList.add("popup__input_type_error");
//   inputError.textContent = errorMessage;
// }

// function hideInputError(form, input) {
//   const inputError = form.querySelector(`.${input.id}-error`);
//   input.classList.remove("popup__input_type_error");
//   inputError.textContent = "";
// }

// function checkInputValidity(form, input) {
//   !input.validity.valid
//     ? showInputError(form, input, input.validationMessage)
//     : hideInputError(form, input);
// }

// function isFormInvalid(inputList) {
//   return inputList.some((input) => !input.validity.valid);
// }

// function toggleSubmitBtnDisabling(inputList, btnSubmit) {
//   if (isFormInvalid(inputList)) {
//     btnSubmit.classList.add("popup__submit-btn_disabled");
//     btnSubmit.setAttribute("disabled", "disabled");
//   } else {
//     btnSubmit.classList.remove("popup__submit-btn_disabled");
//     btnSubmit.removeAttribute("disabled");
//   }
// }

// function checkFormValidity(form) {
//   const inputList = Array.from(form.querySelectorAll(".popup__input"));
//   const btnSubmit = form.querySelector(".popup__submit-btn");

//   inputList.forEach((input) => {
//     input.addEventListener("input", () => {
//       checkInputValidity(form, input);
//       toggleSubmitBtnDisabling(inputList, btnSubmit);
//     });
//   });
// }
import { formSettings } from "./data.js";

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
  const formList = document.querySelectorAll(formSettings.formSelector);

  formList.forEach((form) => {
    checkFormValidity(form, formSettings);
  });
}

enableValidation(formSettings);
