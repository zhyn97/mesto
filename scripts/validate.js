//Валидация форм


  function enableValidator(validConfig){
    const forms = [...document.querySelectorAll(validConfig.formSelector)];
    forms.forEach((form) => setFormListeners(form, validConfig));
  }
  
  function setFormListeners(form, config){
    form.addEventListener('input', () => checkSaveButton(form, config))
    const inputs = [...form.querySelectorAll(config.inputSelector)]
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => handleValidator(inputElement, form, config))
    })
  
    checkSaveButton(form, config);
  }
  
  function checkSaveButton(form, config){
      const button = form.querySelector(config.buttonSelector);
  
      button.disabled = !form.checkValidity();
      button.classList.toggle(config.buttonDisabledClss, !form.checkValidity());
  }
  
  
  function handleValidator(input, form, config){
   if(!input.validity.valid){
      showError(input, form, config);
   }
   else{
      dontShowError (input, form, config);
   }
  }  
  
  function showError (input, form, config){
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.add(config.inputErrorClass);
  
      errorElement.textContent = input.validationMessage;
  }
  
  function dontShowError (input, form, config){
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.remove(config.inputErrorClass);
      
      errorElement.textContent = '';
  }
  

  function hidenError(config){
    const errors = document.querySelectorAll('.error');
    const inputs = document.querySelectorAll('.popup__change-line');
    errors.forEach(el => el.textContent = '');
    inputs.forEach(el => el.classList.remove(config.inputErrorClass));
}
  
  