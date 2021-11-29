 
class CardList{
    constructor(config, createCard){
        this._config = config;
        this._createCard = createCard;
    }

    addItem(item) {
        const card = this._createCard(item);
        const view = card.generateCard();
        const places = document.querySelector(this._config.places);
        places.prepend(view);
    }
    
}

export default CardList;