 
class Container{
    constructor(container, generateItem){
        this._container = container;
        this._generateItem = generateItem;
    }

    addItem(item) {
        const view = this._generateItem(item);
        this._container.prepend(view);
    }
    
}

export default Container;