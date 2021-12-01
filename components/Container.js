 
class Container{
    constructor(places, generateItem){
        this._places = places;
        this._generateItem = generateItem;
    }

    addItem(item) {
        const view = this._generateItem(item);
        this._places.prepend(view);
    }
    
}

export default Container;