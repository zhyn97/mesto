const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');
const saveButton = document.querySelector('.popup__save-button');
const formName = document.querySelector('.form-name');
const nameField = document.querySelector('.profile__name');
const occupationField = document.querySelector('.profile__occupation');
const newName = document.querySelector('.popup__name');
const newOccupation = document.querySelector('.popup__occupation');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const likeButton = document.querySelectorAll('.place__like');




function openPopup(element){
    element.classList.add('popup_active');
}

function closePopup() {
    popup.forEach(el => el.classList.remove('popup_active'))
}
function editButtonHandler(){
    openPopup(popupEdit);
    newName.value = nameField.textContent;
    newOccupation.value = occupationField.textContent;
}

function addButtonHandler(){
    openPopup(popupAdd);
}

function closeButtonHandler(event){
    if(event.target.classList.contains('popup__close')){
        closePopup();
    }
}

function savePopup(event){
    console.log(event);
    event.preventDefault();
    nameField.textContent = newName.value;
    occupationField.textContent = newOccupation.value;
    closePopup();
}

function popupCliclHandler(event){
    console.log(event.target);
    if (event.target.classList.contains('popup')){
        closePopup();
    }
}


editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
closeButton.forEach(closeButton =>
    closeButton.addEventListener('click', closePopup)
    );    
formName.addEventListener('submit', savePopup);
popup.forEach(popup => popup.addEventListener('mouseup',popupCliclHandler));






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

function creatCard(item){
    const element = template.querySelector('.place').cloneNode(true);
    element.querySelector('.place__title').textContent = item.name;
    element.querySelector('.place__image').src = item.link;
    element.querySelector('.place__image').alt = item.name;
    return element;
}

function renderCard(item){
    const element = creatCard(item);
    places.append(element);
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
}

formNewCard.addEventListener('submit', addNewCard)