class Card{
    constructor(config, item, template, openBigImg){
        this._config = config;
        this._item = item;
        this._view = template.querySelector(this._config.place).cloneNode(true);
        this._remove = this._remove.bind(this);
        this._like = this._like.bind(this);
        this._openBigImg = openBigImg;
    }

    _remove(){
        this._view.remove();
    }

    _like(event){
        event.target.classList.toggle('place__like_active');
    }

    _setEventListeners(){
        this._view.querySelector('.place__trash').addEventListener('click', this._remove);
        this._view.querySelector('.place__like').addEventListener('click', this._like);
        this._view.querySelector('.place__image').addEventListener('click', () => this._openBigImg(this._item.name, this._item.link));
        // this._view.querySelector('.place__image').addEventListener('click', () => this._openBigImg.setEventListeners());
    }

    generateItem(){
        this._view.querySelector('.place__title').textContent = this._item.name;
        this._view.querySelector('.place__image').src = this._item.link;
        this._view.querySelector('.place__image').alt = this._item.name;
        this._setEventListeners();

        return this._view;
    }
}

export default Card;