import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm){
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputs = this._popupSelector.querySelectorAll('.popup__change-line');
        this._getInputValues = this._getInputValues.bind(this);
    }

    _getInputValues(){
        const inputsValue = {};
        this._inputs.forEach(item => {
            inputsValue[item.name] = item.value;
        })
        return inputsValue;
    }

    close(event){
        super.close(event);
        // this._form.removeEventListener('submit', this._submitForm);
        this._form.reset();
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
        this._popupSelector.addEventListener('submit', this.close);
    }
}

export default PopupWithForm;