class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._buttonClose = this._popupSelector.querySelector('.popup__close');
        this.close = this.close.bind(this);
        this._cliclHandler = this._cliclHandler.bind(this);
        this._handlerEscKey = this._handlerEscKey.bind(this);
    }

    open(){
        this._popupSelector.classList.add('popup_active');
    }
    
    close(event) {
        event.preventDefault()
        this._popupSelector.classList.remove('popup_active');
        this._buttonClose.removeEventListener('click', this.close);
        this._popupSelector.removeEventListener('click', this._cliclHandler);
        document.removeEventListener('keydown', this._handlerEscKey);
        this._popupSelector.removeEventListener('submit', this.close);
    }

    _handlerEscKey(event){
        if(event.code == 'Escape'){
            this.close(event);
        }
    }

    _cliclHandler(event){
        if (event.target.classList.contains('popup')){
            this.close(event);
        }
    }

    setEventListeners(){
        this._buttonClose.addEventListener('click', this.close);
        this._popupSelector.addEventListener('click', this._cliclHandler);
        document.addEventListener('keydown', this._handlerEscKey);
        this._popupSelector.addEventListener('submit', this.close)
    }
}

export default Popup;