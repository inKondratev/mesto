export class FormValidator {
    constructor(data, formSelector){
        this._form = data.form;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formSelector = formSelector;
    }
    _showInputError (formElement, inputElement,errorMessage){
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }
    
    _hideInputError (formElement,inputElement){
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    
    _checkInputValidity (formElement,inputElement){
    if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(formElement,inputElement);
    }
    }
    _hasInvalidInput (inputList){
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    
    _toggleButtonState (inputList, buttonElement){
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled',true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled',true)
        }
    }
    
    _setEventListeners (formElement){
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement)=>{
            inputElement.addEventListener('input',()=>{
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }
    enableValidation(){
        const formList = Array.from(document.querySelectorAll(this._form));

        formList.forEach((formElement) =>{
            this._setEventListeners(formElement);
        })
    }
}