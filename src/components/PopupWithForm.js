import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputs = this._popupSelector.querySelectorAll(".popup__change-line");
    this._saveButton = this._popupSelector.querySelector(".popup__save-button");
    this._getInputValues = this.getInputValues.bind(this);
  }

  getInputValues() {
    const inputsValue = {};
    this._inputs.forEach((item) => {
      inputsValue[item.name] = item.value;
    });
    return inputsValue;
  }

  close(event) {
    super.close(event);
    this._form.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      if (this._saveButton.textContent === "Создать") {
        this._saveButton.textContent = "Создание...";
      } else {
        this._saveButton.textContent = "Сохранение...";
      }
    } else {
      if (this._saveButton.textContent === "Создание...") {
        this._saveButton.textContent = "Создать";
      } else {
        this._saveButton.textContent = "Сохранить";
      }
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
    this._popupSelector.addEventListener("submit", this.close);
  }
}

export default PopupWithForm;
