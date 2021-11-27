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
    hidenError(popupEdit, config);
    valueNameControl();
    checkSaveButton(formName, config);
    openPopup(popupEdit);
}

function valueNameControl(){
    newName.value = nameField.textContent;
    newOccupation.value = occupationField.textContent;
}

valueNameControl();

function addButtonHandler(){
    const addForm = popupAdd.querySelector('.form-place');
    addForm.reset();
    hidenError(popupAdd, config);
    checkSaveButton(formPlace, config);
    openPopup(popupAdd);
}

function savePopup(event){
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
closeButtons.forEach(closeButtons =>
    closeButtons.addEventListener('click', closePopup)
    );    
formName.addEventListener('submit', savePopup);
popups.forEach(popups => popups.addEventListener('mouseup',popupCliclHandler));


//функция плавного открытия и закрытия popup

window.addEventListener('load', ()=>{
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_opacity'))
  })



//функиця открытия большой картинки
function openBigImg (event) {
  const popupBigImg = document.querySelector(config.popupBigImg);
  openPopup(popupBigImg);
  const bigImg = popupBigImg.querySelector('.popup__big-img');

  bigImg.src = event.target.currentSrc;
  bigImg.alt = event.target.parentNode.querySelector('.place__title').textContent;
  popupBigImg.querySelector('.popup__big-img-title').textContent = event.target.alt;
}

  const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__change-line',
    inputErrorClass: 'popup__change-line_state_invalid',
    buttonSelector: '.popup__save-button',
    buttonDisabledClss: 'popup__save-button_state_disabled',
    errorSelector: '.error',
    buttonAddClass: 'profile__add-button',
    formAddSelector: '.form-place',
    formEditSelector: 'form-name',
    //конфиг для Card
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

  import CardList from "../components/CardsList.js";
  import Card from "../components/Card.js";
  import CardAdd from "../components/CardAdd.js";
  import FormValidate from "../components/FormValidate.js";

    const template = document.querySelector('.template').content;
    const cardsList = new CardList (config, initialCards, createCard);
    const cardAdd = new CardAdd (config, addItem, closePopup);
    cardAdd.addListener();


    function createCard(item) {
      const card = new Card(config, item, template, openBigImg);
      return card;
    }

    
    function addItem(item){
      cardsList.addItem(item);
    }


    initialCards.forEach((item)=>{
        cardsList.addItem(item);
    })

    //работа с классом FormValidate
    const formValidate = new FormValidate(config, formName, checkSaveButton)
    formValidate.enableValidator();

    function hidenError(form, config){
      const errors = form.querySelectorAll(config.errorSelector);
      const inputs = form.querySelectorAll(config.inputSelector);
      errors.forEach(el => el.textContent = '');
      inputs.forEach(el => el.classList.remove(config.inputErrorClass));
  }

    function checkSaveButton(form, config){
        const button = form.querySelector(config.buttonSelector);
    
        button.disabled = !form.checkValidity();
        button.classList.toggle(config.buttonDisabledClss, !form.checkValidity());
    }