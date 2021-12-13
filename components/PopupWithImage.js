import Popup from '../components/Popup.js';

class PopupWithImage extends Popup{
    open(event){
        super.open();

        const bigImg = this._popupSelector.querySelector('.popup__big-img');

        bigImg.src = event.target.currentSrc;
        bigImg.alt = event.target.parentNode.querySelector('.place__title').textContent;
        this._popupSelector.querySelector('.popup__big-img-title').textContent = event.target.alt;
    }
}

export default PopupWithImage;