 
class CardList{
    constructor(config, cards, createCard){
        this._config = config;
        this._cards = cards;
        this._createCard = createCard;
    }

    addItem(item) {
        const card = this._createCard(item);
        const view = card.render();
        const places = document.querySelector(this._config.places);
        places.prepend(view);
    }
    
}

export default CardList;