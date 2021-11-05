const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const saveButton = document.querySelector('.popup__save-button');
const formName = document.querySelector('.form-name');
const formPlace = document.querySelector('.form-place');
const nameField = document.querySelector('.profile__name');
const occupationField = document.querySelector('.profile__occupation');
const newName = document.querySelector('.popup__name');
const newOccupation = document.querySelector('.popup__occupation');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const allForms = document.querySelectorAll('.popup__form');


function openPopup(element){
    element.classList.add('popup_active');
    document.addEventListener('keydown', escButtonHandler);
}

function closePopup() {
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

function closeButtonHandler(event){
    if(event.target.classList.contains('popup__close')){
        closePopup();
    }
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





////////////////////////////////////////////////функция добавления карточек

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
const popupBigImg = document.querySelector('.popup_big-img');


function creatCard(item){
    const element = template.querySelector('.place').cloneNode(true);
    const placeImg = element.querySelector('.place__image');
    element.querySelector('.place__title').textContent = item.name;
    placeImg.src = item.link;
    placeImg.alt = item.name;
    //функция удаления карточек
    element.querySelector('.place__trash').addEventListener('click', (event) => {
        event.target.closest('.place').remove();
    })
    //функиця открытия большой картинки
    placeImg.addEventListener('click', (event) => {
        openPopup(popupBigImg);
        const bigImg = popupBigImg.querySelector('.popup__big-img');

        bigImg.src = event.target.currentSrc;
        bigImg.alt = event.target.parentNode.querySelector('.place__title').textContent;
        popupBigImg.querySelector('.popup__big-img-title').textContent = event.target.alt;
    })
    //////функция лайков
    element.querySelector('.place__like').addEventListener('click', (event) => {
        event.target.classList.toggle('place__like_active')
    });
    
    return element;
}

function renderCard(item){
    const element = creatCard(item);
    places.prepend(element);
}

initialCards.forEach(renderCard);

////добавление новых элементов

const formNewCard = document.querySelector('.popup-add');
const namePlace = document.querySelector('.name-new-place');
const linkPlace = document.querySelector('.link-new-place');


function addNewCard(event) {
    event.preventDefault();
    
    const name = namePlace.value;
    const link = linkPlace.value;
    const item = {
        name: name,
        link: link 
    };
    
    renderCard(item);
    event.target.reset();
    closePopup();
}

formNewCard.addEventListener('submit', addNewCard);

//функция плавного открытия и закрытия popup

window.addEventListener('load', ()=>{
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_opacity'))
  })



//вызов функции валидации

  const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__change-line',
    inputErrorClass: 'popup__change-line_state_invalid',
    buttonSelector: '.popup__save-button',
    buttonDisabledClss: 'popup__save-button_state_disabled',
    errorSelector: '.error',
    buttonAddClass: 'profile__add-button',
    formAddSelector: '.form-place',
    formEditSelector: 'form-name'
  }
  

  enableValidator(config);