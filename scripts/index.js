const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__save-button');
const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.profile__name');
const occupationField = document.querySelector('.profile__occupation');
const newName = document.querySelector('.popup__name');
const newOccupation = document.querySelector('.popup__occupation');

function openPopup(){
    popup.classList.add('popup_active');
}

function closePopup(){
    popup.classList.remove('popup_active');
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


newName.value = nameField.textContent;
newOccupation.value = occupationField.textContent;
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', savePopup);
popup.addEventListener('mouseup', popupCliclHandler);