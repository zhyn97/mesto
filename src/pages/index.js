import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithComfirm from "../components/PopupWithComfirm.js";
import UserInfo from "../components/UserInfo.js";
import { cardsConfig } from "../configs/cardsConfig.js";
import { validationConfig } from "../configs/validationConfig.js";
import Api from "../components/Api.js";

import {
  editButton,
  addButton,
  formName,
  formPlace,
  nameField,
  occupationField,
  newName,
  newOccupation,
  popupEdit,
  popupAdd,
  places,
  template,
  popupBigImg,
  avatar,
  avatarImg,
  popupDelete,
  popupAvatar,
  formAvatar,
} from "../utilits/constants.js";

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-32",
  token: "375f8480-1170-4121-a89c-9ffd6ccda63c",
});

function avatarHandler() {
  formAvatarValidator.checkSaveButtonAndClearInputs();
  popupNewAvatar.open();
}

function saveAvatar() {
  popupNewAvatar.loading(true);
  const data = popupNewAvatar.getInputValues();
  api
    .newAvatar(data.link)
    .then((res) => {
      console.log("Аватар сохранен", res);
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log("Произошла ошибка", err);
    })
    .finally(() => {
      popupNewAvatar.loading(false);
    });
}

function editButtonHandler() {
  const dataUser = userInfo.getUserInfo();
  newName.value = dataUser.name.textContent;
  newOccupation.value = dataUser.occupation.textContent;
  formNameValidator.checkSaveButtonAndClearInputs();
  popupPersonData.open();
}

function saveNamePopup() {
  popupPersonData.loading(true);
  const data = popupPersonData.getInputValues();

  api
    .editUserData(data.name, data.about)
    .then((res) => {
      console.log("Данные сохранены", res);
      api
        .getUserData()
        .then((res) => {
          console.log(res);
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          console.log("Произошла ошибка", err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupPersonData.loading(false);
    });
}

function addButtonHandler() {
  formPlaceValidator.checkSaveButtonAndClearInputs();
  popupNewCard.open();
}

//Получение данных пользователя
let user;
api
  .getUserData()
  .then((res) => {
    console.log("Данные собраны", res);
    userInfo.setUserInfo(res);
    user = res;
  })
  .catch((err) => {
    console.log("Возникла ошибка", err);
  });

// Работа с классом Section
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(
        cardsConfig,
        item,
        template,
        handleCardClicker,
        {
          handleDeleteCard: (item) => {
            popupComfirm.open();
            // console.log(item);
            popupComfirm.setHandler(() => {
              api
                .deleteCard(item)
                .then((res) => {
                  console.log(res);
                  card.remove();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          },
          setLike: (item) => {
            if (
              card
                .querySelector(".place__like")
                .classList.contains("place__like_active")
            ) {
              Promise.all([api.getUserData(), api.deleteLike(item)])
                .then(([userData, deleteInf]) => {
                  console.log("лайк был, но мы удалили");
                  card.querySelector(".place__number-likes").textContent =
                    deleteInf.likes.length;
                  card
                    .querySelector(".place__like")
                    .classList.remove("place__like_active");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              Promise.all([api.getUserData(), api.setLike(item)])
                .then(([userData, likes]) => {
                  console.log("лайка не было, но мы установили");
                  card.querySelector(".place__number-likes").textContent =
                    likes.likes.length;
                  card
                    .querySelector(".place__like")
                    .classList.add("place__like_active");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          },
        },
        user
      );
      return card;
    },
  },
  places
);

function saveNewCardPopup() {
  popupNewCard.loading(true);
  const item = popupNewCard.getInputValues();
  console.log(item);

  Promise.all([api.getUserData(), api.addNewCard(item.name, item.link)])
    .then(([userData, card]) => {
      const user = userData;
      cardList.addNewCard(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNewCard.loading(false);
    });
}

// работа с классом UserInfo
const userInfo = new UserInfo({
  name: nameField,
  occupation: occupationField,
  avatar: avatarImg,
});

// открытие большой картинки
const popupImage = new PopupWithImage(popupBigImg);
popupImage.setEventListeners();

const popupComfirm = new PopupWithComfirm(popupDelete);
popupComfirm.setEventListeners();

function handleCardClicker(name, link) {
  popupImage.open(name, link);
}

// работа с классом PopupWithForm
const popupPersonData = new PopupWithForm(popupEdit, saveNamePopup);
const popupNewCard = new PopupWithForm(popupAdd, saveNewCardPopup);
const popupNewAvatar = new PopupWithForm(popupAvatar, saveAvatar);

popupPersonData.setEventListeners();
popupNewCard.setEventListeners();
popupNewAvatar.setEventListeners();

// слушатели кликов по кнопкам редактирования имени и добавления карточки
editButton.addEventListener("click", editButtonHandler);
addButton.addEventListener("click", addButtonHandler);
avatar.addEventListener("click", avatarHandler);

//функция плавного открытия и закрытия popup
window.addEventListener("load", () => {
  document
    .querySelectorAll(".popup")
    .forEach((popup) => popup.classList.add("popup_opacity"));
});

// работа с классом Card
function createCard(
  cardsConfig,
  item,
  template,
  handleCardClicker,
  { handleDeleteCard, setLike },
  user
) {
  const newCard = new Card(
    cardsConfig,
    item,
    template,
    handleCardClicker,
    { handleDeleteCard, setLike },
    user
  );
  return newCard.generateItem();
}

//работа с классом FormValidator
const formNameValidator = new FormValidator(validationConfig, formName);
const formPlaceValidator = new FormValidator(validationConfig, formPlace);
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formNameValidator.enableValidator();
formPlaceValidator.enableValidator();
formAvatarValidator.enableValidator();

// Отрисовка карточек
function renderCards() {
  Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cards]) => {
      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
}

renderCards();
