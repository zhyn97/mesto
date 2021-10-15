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



function openPopup(element){
    element.classList.add('popup_active');
}

function closePopup() {
    popup.forEach((el) => {
      el.classList.remove('popup_active');
    });
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