class NewCard {
    constructor (config, addItem, closePopup){
        this._config = config;
        this._form = document.querySelector('.form-place');
        this._addCard = this._addCard.bind(this);
        this._inputNameNewPlace = this._form.querySelector('.name-new-place');
        this._inputLinkNewPlace = this._form.querySelector('.link-new-place');
        this._addItem = addItem;
        this._closePopup = closePopup;
    }

    _addCard(event){
        event.preventDefault();
        const name = this._inputNameNewPlace.value;
        const link = this._inputLinkNewPlace.value;
        const item = {
            name,
            link
        };

        this._addItem(item);

        this._form.reset();

        this._closePopup();
    }

    addListener(){
        this._form.addEventListener('submit', this._addCard);
    }
}

export default NewCard;