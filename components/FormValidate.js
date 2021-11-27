class FormValidate{
    constructor(config, formName, checkSaveButton){
        this._config = config;
        this._formName = formName;
        this._checkSaveButton = checkSaveButton;
    }

    _showError (input, form, config){
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.add(config.inputErrorClass);
    
        errorElement.textContent = input.validationMessage;
    }
    
    _dontShowError (input, form, config){
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.remove(config.inputErrorClass);
        
        errorElement.textContent = '';
    }

    _handleValidator(input, form, config){
        if(!input.validity.valid){
           this._showError(input, form, config);
        }
        else{
           this._dontShowError (input, form, config);
        }
       }

    _setFormListeners(form, config){
        form.addEventListener('input', () => this._checkSaveButton(form, config))
        const inputs = [...form.querySelectorAll(config.inputSelector)]
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._handleValidator(inputElement, form, config))
        })
      
        this._checkSaveButton(form, config);
      }


    enableValidator(){
        const forms = [...document.querySelectorAll(this._config.formSelector)];
        forms.forEach((form) => this._setFormListeners(form, this._config));
      }

}

export default FormValidate;