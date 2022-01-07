class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  _addItem(element) {
    this._container.append(element);
  }

  _appendCard(element) {
    this._container.prepend(element);
  }

  // renderItems() {
  //   this._renderedItems.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  renderItems(cards) {
    cards.forEach((item) => {
      this._addItem(this._renderer(item));
    });
  }

  addNewCard(card) {
    this._appendCard(this._renderer(card));
  }
}

export default Section;
