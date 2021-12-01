class FormValidator{
    constructor(config, form){
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._button = form.querySelector(config.buttonSelector);
        this._buttonDisabledClass = config.buttonDisabledClass;
        this._form = form;
        this._buttonEditname = document.querySelector(config.buttonEditName);
        this._buttonEditplace = document.querySelector(config.buttonAddPlace);
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

    _showError (input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
    
        errorElement.textContent = input.validationMessage;
    }
    
    _hideError (input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        
        errorElement.textContent = '';
    }

    _handleValidator(input){
        if(!input.validity.valid){
           this._showError(input, this._form);
        }
        else{
           this._hideError (input, this._form);
        }
       }

    _setFormListeners(){
        this._form.addEventListener('input', () => this.checkSaveButton())
        const inputs = [...this._form.querySelectorAll(this._inputSelector)]
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._handleValidator(inputElement, this._form));
            this._buttonEditname.addEventListener('click', () => this._hideError(inputElement, this._form));
            this._buttonEditplace.addEventListener('click', () => this._hideError(inputElement, this._form));
        })
      }


    enableValidator(){
        this._setFormListeners();
      }

}

export default FormValidator;