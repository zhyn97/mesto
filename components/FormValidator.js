class FormValidator{
    constructor(config, formName, checkSaveButton){
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._formName = formName;
        this._checkSaveButton = checkSaveButton;
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

    _setFormListeners(form){
        form.addEventListener('input', () => this._checkSaveButton(form, this._config))
        const inputs = [...form.querySelectorAll(this._inputSelector)]
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._handleValidator(inputElement, form))
        })
      
        this._checkSaveButton(form, this._config);
      }


    enableValidator(){
        const forms = [...document.querySelectorAll(this._formSelector)];
        forms.forEach((form) => this._setFormListeners(form));
      }

}

export default FormValidator;