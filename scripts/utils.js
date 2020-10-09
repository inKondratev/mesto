import {linkInputAdd,nameInputAdd,nameInputEdit,jobInputEdit,profileName,profileActivity} from './index.js'
// Закрытие попапа по клику на оверлей
export const clickOverlayClose =(evt)=>{
    const popupOpened = document.querySelector('.popup_opened');
    if(evt.target === evt.currentTarget){
        closePopup(popupOpened);
    }
}
// Закрытие попапа по ESC
export const closePopupEsc = (evt) =>{
    const popupOpened = document.querySelector('.popup_opened');
    if(evt.key === 'Escape'){
        closePopup(popupOpened);
    }
}

// Функция открытия попапа
export const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    popup.addEventListener('click',clickOverlayClose);
    document.addEventListener('keydown',closePopupEsc);
    nameInputAdd.value = '';
    linkInputAdd.value = '';
    nameInputEdit.value = profileName.textContent;
    jobInputEdit.value = profileActivity.textContent;
}
// Функция закрытия попапа
export const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
    popup.removeEventListener('click', clickOverlayClose);
    document.removeEventListener('keydown',closePopupEsc);
}