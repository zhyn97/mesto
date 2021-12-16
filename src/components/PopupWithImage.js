import Popup from '../components/Popup.js';

class PopupWithImage extends Popup{
    open(name, link){
        super.open();
        const bigImg = this._popupSelector.querySelector('.popup__big-img');
        bigImg.src = link;
        bigImg.alt = name;
        this._popupSelector.querySelector('.popup__big-img-title').textContent = name;
    }
}

export default PopupWithImage;