import CardList from "../components/CardsList.js";
import Card from "../components/Card.js";
import NewCard from "../components/NewCard.js";
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
    openPopup(popupEdit);
}

function setProfileInputs(){
    newName.value = nameField.textContent;
    newOccupation.value = occupationField.textContent;
}


function addButtonHandler(){
    const addForm = popupAdd.querySelector('.form-place');
    addForm.reset();
    openPopup(popupAdd);
}

function saveNamePopup(event){
    event.preventDefault();
    nameField.textContent = newName.value;
    occupationField.textContent = newOccupation.value;
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

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__change-line',
    inputErrorClass: 'popup__change-line_state_invalid',
    buttonSelector: '.popup__save-button',
    buttonDisabledClass: 'popup__save-button_state_disabled',
    errorSelector: '.error',
    buttonAddClass: 'profile__add-button',
    buttonEditName: '.profile__edit-button',
    buttonAddPlace: '.profile__add-button',
    formAddSelector: '.form-place',
    formEditSelector: 'form-name',
  }
  
  const cardsConfig = {
    place: '.place',
    places: '.places',
    template: '.template',
    popupBigImg: '.popup_big-img',
    formNewPlace: '.form-place',
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


    const template = document.querySelector('.template').content;
    const cardsList = new CardList (cardsConfig, createCard);
    //const newCard = new NewCard (cardsConfig, addItem, closePopup);
    //newCard.addListener();


    function createCard(item) {
      const card = new Card(cardsConfig, item, template, openBigImg);
      card.generateCard();
      return card;
    }

    
    // function addItem(item){
    //   cardsList.addItem(item);
    // }


    initialCards.forEach((item)=>{
        cardsList.addItem(item);
    })

    //работа с классом FormValidator
    const formNameValidator = new FormValidator(validationConfig, formName);
    const formPlaceValidator = new FormValidator(validationConfig, formPlace);
    formNameValidator.enableValidator();
    formPlaceValidator.enableValidator();