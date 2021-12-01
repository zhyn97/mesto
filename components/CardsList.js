 
class CardList{
    constructor(config, createCard){
        this._config = config;
        this._createCard = createCard;
    }

    addItem(item) {
        const view = this._createCard(item);
        const places = document.querySelector(this._config.places);
        places.prepend(view);
    }
    
}

export default CardList;