class Card{
    constructor(config, item, template, openBigImg, {handleDeleteCard, setLike}, user){
        this._config = config;
        this._item = item;
        this._view = template.querySelector(this._config.place).cloneNode(true);
        this.remove = this.remove.bind(this);
        this._openBigImg = openBigImg;
        this._handleDeleteCard = handleDeleteCard;
        this._setLike = setLike;
        this._user = user;
    }

    remove(){
        this._view.remove();
    }

    _setDeleteButton(){
        if (this._user._id === this._item.owner._id){
            this._view.querySelector('.place__trash').addEventListener('click', () => this._handleDeleteCard(this._item._id));
        } else{
            this._view.querySelector('.place__trash').remove();
        }
    }

    _setEventListeners(){
        this._setDeleteButton();
        this._view.querySelector('.place__like').addEventListener('click', () => this._setLike(this._item._id));
        this._view.querySelector('.place__image').addEventListener('click', () => this._openBigImg(this._item.name, this._item.link));
    }

    generateItem(){
        this._view.querySelector('.place__title').textContent = this._item.name;
        this._view.querySelector('.place__image').src = this._item.link;
        this._view.querySelector('.place__image').alt = this._item.name;
        this._view.querySelector('.place__number-likes').textContent = this._item.likes.length;
        
        this._item.likes.forEach(like => {
            if(like._id === this._user._id){
                this._view.querySelector('.place__like').classList.add('place__like_active');
            }
        });
        this._setEventListeners();

        return this._view;
    }
}

export default Card;