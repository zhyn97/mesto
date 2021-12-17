import '../pages/index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {cardsConfig} from '../configs/cardsConfig.js';
import {validationConfig} from '../configs/validationConfig.js';

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
  initialCards,
  places,
  template,
  popupBigImg
} from '../utilits/constants.js'


function editButtonHandler(){
    const dataUser = userInfo.getUserInfo();
    newName.value = dataUser.name.textContent;
    newOccupation.value = dataUser.occupation.textContent;
    formNameValidator.checkSaveButtonAndClearInputs();
    // popupPersonData.setEventListeners();
    popupPersonData.open();
}

function saveNamePopup(){
    userInfo.setUserInfo(popupPersonData.getInputValues());
} 


function addButtonHandler(){
    formPlaceValidator.checkSaveButtonAndClearInputs();
    // popupNewCard.setEventListeners();
    popupNewCard.open();
}



function saveNewCardPopup(){
  //   const item = [popupNewCard._getInputValues()];
  //   const newCard = new Section ({
  //   data: item,
  //   renderer: (item) => {
  //       const card = new Card(cardsConfig, item, template, handleCardClick);
  //       const newItem = card.generateItem();

  //       newCard.addItem(newItem);
  //     }
  //   }, places)
  // newCard.renderItems();
  const item = popupNewCard.getInputValues();
  const card = createCard(cardsConfig, item, template, handleCardClicker);
  cardList.addItem(card);
}

// работа с классом UserInfo
const userInfo = new UserInfo({
  name: nameField,
  occupation: occupationField
});


// открытие большой картинки
const popupImage = new PopupWithImage(popupBigImg);
popupImage.setEventListeners();

function handleCardClicker(name, link){
  popupImage.open(name, link);
}

// работа с классом PopupWithForm
const popupPersonData = new PopupWithForm(popupEdit, saveNamePopup);
const popupNewCard = new PopupWithForm(popupAdd, saveNewCardPopup);
popupPersonData.setEventListeners();
popupNewCard.setEventListeners();


// слушатели кликов по кнопкам редактирования имени и добавления карточки
editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);



//функция плавного открытия и закрытия popup
window.addEventListener('load', ()=>{
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_opacity'))
  })


// работа с классом Section
function createCard (cardsConfig, item, template, handleCardClicker){
  const newCard = new Card(cardsConfig, item, template, handleCardClicker);
  return newCard.generateItem();
}

    const cardList = new Section ({
      data: initialCards,
      renderer: (item) => {
          const card = createCard(cardsConfig, item, template, handleCardClicker);
          // const newItem = card.generateItem();

          cardList.addItem(card);
        }
    }, places)
    cardList.renderItems();



    //работа с классом FormValidator
    const formNameValidator = new FormValidator(validationConfig, formName);
    const formPlaceValidator = new FormValidator(validationConfig, formPlace);
    formNameValidator.enableValidator();
    formPlaceValidator.enableValidator();

    