import Popup from './Popup.js';

class PopupWithComfirm extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._buttonDelete = this._popupSelector.querySelector('.popup__delete-button');
    }
    

    setHandler(action){
        this._handleSubmitCallback = action;
    }

    setEventListeners(){
        super.setEventListeners();
        this._buttonDelete.addEventListener('click', () => this._handleSubmitCallback());
        this._buttonDelete.addEventListener('click', this.close);
    }
    
}

export default PopupWithComfirm;