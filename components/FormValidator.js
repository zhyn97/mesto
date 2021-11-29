class FormValidator{
    constructor(config, form){
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._buttonSelector = config.buttonSelector;
        this._buttonDisabledClass = config.buttonDisabledClass;
        this._form = form;
        this._buttonEditname = document.querySelector(config.buttonEditName);
        this._buttonEditplace = document.querySelector(config.buttonAddPlace);
    }

    _checkSaveButton(form){
        const button = form.querySelector(this._buttonSelector);
    
        button.disabled = !form.checkValidity();
        button.classList.toggle(this._buttonDisabledClass, !form.checkValidity());
    }

    _showError (input, form){
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
    
        errorElement.textContent = input.validationMessage;
    }
    
    _hideError (input, form){
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        
        errorElement.textContent = '';
    }

    _handleValidator(input, form){
        if(!input.validity.valid){
           this._showError(input, form);
        }
        else{
           this._hideError (input, form);
        }
       }

    _setFormListeners(){
        this._form.addEventListener('input', () => this._checkSaveButton(this._form, this._config))
        const inputs = [...this._form.querySelectorAll(this._inputSelector)]
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._handleValidator(inputElement, this._form));
            this._buttonEditname.addEventListener('click', () => this._hideError(inputElement, this._form));
            this._buttonEditplace.addEventListener('click', () => this._hideError(inputElement, this._form));
        })
        this._buttonEditname.addEventListener('click', () => this._checkSaveButton(this._form, this._config));
        this._buttonEditplace.addEventListener('click', () => this._checkSaveButton(this._form, this._config));
        this._checkSaveButton(this._form, this._config);
      }


    enableValidator(){
        this._setFormListeners();
      }

}

export default FormValidator;