// универсальные функции
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// редактирование профиля
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfilePopup = document.querySelector(".popup_name_edit-profile");
const editProfileCloseBtn = editProfilePopup.querySelector(".popup__close-btn");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const userNameInput = editProfileForm.querySelector(
  ".popup__input_data_user-name"
);
const userAboutInput = editProfileForm.querySelector(
  ".popup__input_data_user-about"
);
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

function openEditProfilePopup() {
  userNameInput.value = profileName.textContent;
  userAboutInput.value = profileAbout.textContent;
  editProfilePopup.classList.add("popup_opened");
}

function editProfileFormSubmitHandler(evt, popup) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileAbout.textContent = userAboutInput.value;
  closePopup(popup);
}

editProfileBtn.addEventListener("click", openEditProfilePopup);
editProfileCloseBtn.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
editProfileForm.addEventListener("submit", (evt) =>
  editProfileFormSubmitHandler(evt, editProfilePopup)
);

// карточи
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardsContainer = document.querySelector(".elements");
const addCardBtn = document.querySelector(".profile__add-btn");
const addCardPopup = document.querySelector(".popup_name_add-card");
const addCardCloseBtn = addCardPopup.querySelector(".popup__close-btn");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_data_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_data_card-link");
const fullscreenPhotoPopup = document.querySelector(
  ".popup_name_fullscreen-photo"
);
const fullscreenPhoto = fullscreenPhotoPopup.querySelector(".popup__photo");
const fullscreenPhotoCaption = fullscreenPhotoPopup.querySelector(
  ".popup__photo-caption"
);
const fullscreenPhotoCloseBtn =
  fullscreenPhotoPopup.querySelector(".popup__close-btn");

function addCard(card, place) {
  const cardTemplate = cardsContainer.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector(".elements__photo");
  const cardTitle = cardElement.querySelector(".elements__title");
  const likeCardBtn = cardElement.querySelector(".elements__like");
  const trashCardBtn = cardElement.querySelector(".elements__trash");
  cardTitle.textContent = card.name;
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;

  // лайк для карточек
  likeCardBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like_active");
  });

  // удаление карточек
  trashCardBtn.addEventListener("click", () => {
    trashCardBtn.closest(".elements__item").remove();
  });

  // открытие fullscreen
  function openFullscreenPhotoPopup(evt) {
    fullscreenPhoto.src = evt.target.src;
    fullscreenPhoto.alt = card.name;
    fullscreenPhotoCaption.textContent = card.name;
    fullscreenPhotoPopup.classList.add("popup_opened");
  }
  cardPhoto.addEventListener("click", openFullscreenPhotoPopup);

  if (place === "end") {
    cardsContainer.append(cardElement);
  } else {
    cardsContainer.prepend(cardElement);
  }
}

function openAddCardPopup() {
  addCardPopup.classList.add("popup_opened");
}

function addCardFormSubmitHandler(evt, popup) {
  evt.preventDefault();
  addCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    "start"
  );
  closePopup(popup);
}

// первоначальный рендеринг карточек
initialCards.forEach((card) => addCard(card, "end"));

// добавление новых карточек
addCardBtn.addEventListener("click", openAddCardPopup);
addCardCloseBtn.addEventListener("click", () => closePopup(addCardPopup));
addCardForm.addEventListener("submit", (evt) =>
  addCardFormSubmitHandler(evt, addCardPopup)
);

// закрытие fullscreen
fullscreenPhotoCloseBtn.addEventListener("click", () =>
  closePopup(fullscreenPhotoPopup)
);
