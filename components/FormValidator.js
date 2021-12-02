class FormValidator{
    constructor(config, form){
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._button = form.querySelector(config.buttonSelector);
        this._buttonDisabledClass = config.buttonDisabledClass;
        this._form = form;
    }

    checkSaveButton(){
        if (this._form.checkValidity()) {
            this._button.removeAttribute("disabled");
            this._button.classList.remove(this._buttonDisabledClass);
        } else {
            this._button.setAttribute("disabled", "disabled");
            this._button.classList.add(this._buttonDisabledClass);
        }
    }

    hideError (input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        
        errorElement.textContent = '';
    }

    _showError (input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
    
        errorElement.textContent = input.validationMessage;
    }

    _handleValidator(input){
        if(!input.validity.valid){
           this._showError(input);
        }
        else{
           this.hideError (input);
        }
       }

    _setFormListeners(){
        this._form.addEventListener('input', () => this.checkSaveButton())
        const inputs = [...this._form.querySelectorAll(this._inputSelector)]
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._handleValidator(inputElement));
        })
      }


    enableValidator(){
        this._setFormListeners();
      }

}

export default FormValidator;