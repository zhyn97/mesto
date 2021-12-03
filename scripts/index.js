import Container from "../components/Container.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const formName = document.querySelector('.form-name');
const formPlace = document.querySelector('.form-place');
const nameField = document.querySelector('.profile__name');
const occupationField = document.querySelector('.profile__occupation');
const newName = document.querySelector('.popup__name');
const newOccupation = document.querySelector('.popup__occupation');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const newPlaceName = document.querySelector('.name-new-place');
const newPlaceLink = document.querySelector('.link-new-place');


function openPopup(element){
    element.classList.add('popup_active');
    document.addEventListener('keydown', escButtonHandler);
}

function closePopup() {
    document.removeEventListener('keydown', escButtonHandler);
    popups.forEach(el => el.classList.remove('popup_active'));
}


function editButtonHandler(){
    setProfileInputs();
    formNameValidator.checkSaveButtonAndClearInputs();
    openPopup(popupEdit);
}

function setProfileInputs(){
    newName.value = nameField.textContent;
    newOccupation.value = occupationField.textContent;
}


function addButtonHandler(){
    const addForm = popupAdd.querySelector('.form-place');
    addForm.reset();
    formPlaceValidator.checkSaveButtonAndClearInputs();
    openPopup(popupAdd);
}

function saveNamePopup(event){
    event.preventDefault();
    nameField.textContent = newName.value;
    occupationField.textContent = newOccupation.value;
    closePopup();
}

function saveNewCard(event){
  event.preventDefault();
  const name = newPlaceName.value;
  const link = newPlaceLink.value;
  const item = {
      name,
      link
  };
  
  container.addItem(item);
  closePopup();
  }

function popupCliclHandler(event){
    if (event.target.classList.contains('popup')){
        closePopup();
    }
}

function escButtonHandler (event){
    if(event.code == 'Escape'){
        closePopup();
    }
}


editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
closeButtons.forEach(closeButton =>
    closeButton.addEventListener('click', closePopup)
    );    
formName.addEventListener('submit', saveNamePopup);
formPlace.addEventListener('submit', saveNewCard);
popups.forEach(popups => popups.addEventListener('mouseup',popupCliclHandler));


//функция плавного открытия и закрытия popup

window.addEventListener('load', ()=>{
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_opacity'))
  })



//функиця открытия большой картинки
function openBigImg (event) {
  const popupBigImg = document.querySelector(cardsConfig.popupBigImg);
  const bigImg = popupBigImg.querySelector('.popup__big-img');

  bigImg.src = event.target.currentSrc;
  bigImg.alt = event.target.parentNode.querySelector('.place__title').textContent;
  popupBigImg.querySelector('.popup__big-img-title').textContent = event.target.alt;
  openPopup(popupBigImg);
}

  

  // работа с классом Card 

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
    const places = document.querySelector('.places');
    const template = document.querySelector('.template').content;
    const container = new Container (places, generateItem);


    function generateItem(item) {
      const card = new Card(cardsConfig, item, template, openBigImg);
      const newItem = card.generateItem();
      return newItem;
    }


    initialCards.forEach((item)=>{
      container.addItem(item);
    })

    //работа с классом FormValidator
    const formNameValidator = new FormValidator(validationConfig, formName);
    const formPlaceValidator = new FormValidator(validationConfig, formPlace);
    formNameValidator.enableValidator();
    formPlaceValidator.enableValidator();