(()=>{"use strict";const e=class{constructor(e,t){this._config=e,this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._inputErrorClass=e.inputErrorClass,this._button=t.querySelector(e.buttonSelector),this._buttonDisabledClass=e.buttonDisabledClass,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector))}checkSaveButtonAndClearInputs(){this._inputList.forEach((e=>this._hideError(e))),this._checkSaveButton()}_checkSaveButton(){this._form.checkValidity()?(this._button.removeAttribute("disabled"),this._button.classList.remove(this._buttonDisabledClass)):(this._button.setAttribute("disabled","disabled"),this._button.classList.add(this._buttonDisabledClass))}_hideError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent=""}_showError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage}_handleValidator(e){e.validity.valid?this._hideError(e):this._showError(e)}_setFormListeners(){this._form.addEventListener("input",(()=>this._checkSaveButton())),[...this._inputList].forEach((e=>{e.addEventListener("input",(()=>this._handleValidator(e)))}))}enableValidator(){this._setFormListeners()}},t=class{constructor(e){this._popupSelector=e,this._buttonClose=this._popupSelector.querySelector(".popup__close"),this.close=this.close.bind(this),this._cliclHandler=this._cliclHandler.bind(this),this._handlerEscKey=this._handlerEscKey.bind(this)}open(){this._popupSelector.classList.add("popup_active"),document.addEventListener("keydown",this._handlerEscKey)}close(e){e.preventDefault(),this._popupSelector.classList.remove("popup_active"),document.removeEventListener("keydown",this._handlerEscKey)}_handlerEscKey(e){"Escape"==e.code&&this.close(e)}_cliclHandler(e){e.target.classList.contains("popup")&&this.close(e)}setEventListeners(){this._buttonClose.addEventListener("click",this.close),this._popupSelector.addEventListener("click",this._cliclHandler)}},s=class extends t{constructor(e,t){super(e),this._submitForm=t,this._form=this._popupSelector.querySelector(".popup__form"),this._inputs=this._popupSelector.querySelectorAll(".popup__change-line"),this._saveButton=this._popupSelector.querySelector(".popup__save-button"),this._getInputValues=this.getInputValues.bind(this)}getInputValues(){const e={};return this._inputs.forEach((t=>{e[t.name]=t.value})),e}close(e){super.close(e),this._form.reset()}loading(e){e?"Создать"===this._saveButton.textContent?this._saveButton.textContent="Создание...":this._saveButton.textContent="Сохранение...":"Создание..."===this._saveButton.textContent?this._saveButton.textContent="Создать":this._saveButton.textContent="Сохранить"}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",this._submitForm),this._popupSelector.addEventListener("submit",this.close)}},o={place:".place",places:".places",template:".template",popupBigImg:".popup_big-img",formNewPlace:".form-place",confirm:".popup_delete-card"},n={formSelector:".popup__form",inputSelector:".popup__change-line",inputErrorClass:"popup__change-line_state_invalid",buttonSelector:".popup__save-button",buttonDisabledClass:"popup__save-button_state_disabled",buttonEditName:".profile__edit-button",buttonAddPlace:".profile__add-button"},i=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-button"),a=(document.querySelectorAll(".popup"),document.querySelectorAll(".popup__close"),document.querySelector(".form-name")),c=document.querySelector(".form-place"),l=document.querySelector(".profile__name"),d=document.querySelector(".profile__occupation"),h=document.querySelector(".popup__name"),u=document.querySelector(".popup__occupation"),_=document.querySelector(".popup-edit"),p=document.querySelector(".popup-add"),m=document.querySelector(".popup_delete-card"),v=(document.querySelector(".name-new-place"),document.querySelector(".link-new-place"),document.querySelector(".profile__avatar")),f=document.querySelector(".profile__edit-view"),S=document.querySelector(".popup-avatar"),g=document.querySelector(".form-avatar"),y=document.querySelector(".places"),k=document.querySelector(".template").content,b=document.querySelector(".popup_big-img"),E=new class{constructor({address:e,token:t}){this.address=e,this.token=t}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка : ${e.status}`)}getUserData(){return fetch(`${this.address}/users/me`,{headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c"}}).then(this._checkResponse)}getCards(){return fetch(`${this.address}/cards`,{headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c"}}).then(this._checkResponse)}editUserData(e,t){return fetch(`${this.address}/users/me`,{method:"PATCH",headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c","Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}addNewCard(e,t){return fetch(`${this.address}/cards`,{method:"POST",headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c","Content-Type":"application/json"},body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}deleteCard(e){return fetch(`${this.address}/cards/${e}`,{method:"DELETE",headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c"}}).then(this._checkResponse)}setLike(e){return fetch(`${this.address}/cards/${e}/likes`,{method:"PUT",headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c"}}).then(this._checkResponse)}deleteLike(e){return fetch(`${this.address}/cards/${e}/likes`,{method:"DELETE",headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c"}}).then(this._checkResponse)}newAvatar(e){return fetch(`${this.address}/users/me/avatar`,{method:"PATCH",headers:{authorization:"375f8480-1170-4121-a89c-9ffd6ccda63c","Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(this._checkResponse)}}({address:"https://mesto.nomoreparties.co/v1/cohort-32",token:"375f8480-1170-4121-a89c-9ffd6ccda63c"});let L;E.getUserData().then((e=>{console.log("Данные собраны",e),q.setUserInfo(e),L=e})).catch((e=>{console.log("Возникла ошибка",e)}));const C=new class{constructor({renderer:e},t){this._renderer=e,this._container=t}_addItem(e){this._container.append(e)}_appendCard(e){this._container.prepend(e)}renderItems(e){e.forEach((e=>{this._addItem(this._renderer(e))}))}addNewCard(e){this._appendCard(this._renderer(e))}}({renderer:e=>{const t=function(e,t,s,o,{handleDeleteCard:n,setLike:i},r){return new class{constructor(e,t,s,o,{handleDeleteCard:n,setLike:i},r){this._config=e,this._item=t,this._view=s.querySelector(this._config.place).cloneNode(!0),this._img=this._view.querySelector(".place__image"),this.remove=this.remove.bind(this),this._openBigImg=o,this._handleDeleteCard=n,this._setLike=i,this._user=r}remove(){this._view.remove()}_setDeleteButton(){this._user._id===this._item.owner._id?this._view.querySelector(".place__trash").addEventListener("click",(()=>this._handleDeleteCard(this._item._id))):this._view.querySelector(".place__trash").remove()}_setEventListeners(){this._setDeleteButton(),this._view.querySelector(".place__like").addEventListener("click",(()=>this._setLike(this._item._id))),this._img.addEventListener("click",(()=>this._openBigImg(this._item.name,this._item.link)))}generateItem(){return this._view.querySelector(".place__title").textContent=this._item.name,this._img.src=this._item.link,this._img.alt=this._item.name,this._view.querySelector(".place__number-likes").textContent=this._item.likes.length,this._item.likes.forEach((e=>{e._id===this._user._id&&this._view.querySelector(".place__like").classList.add("place__like_active")})),this._setEventListeners(),this._view}}(e,t,s,o,{handleDeleteCard:n,setLike:i},r).generateItem()}(o,e,k,I,{handleDeleteCard:e=>{D.open(),D.setHandler((()=>{E.deleteCard(e).then((e=>{console.log(e),t.remove()})).catch((e=>{console.log(e)}))}))},setLike:e=>{t.querySelector(".place__like").classList.contains("place__like_active")?Promise.all([E.getUserData(),E.deleteLike(e)]).then((([e,s])=>{console.log("лайк был, но мы удалили"),t.querySelector(".place__number-likes").textContent=s.likes.length,t.querySelector(".place__like").classList.remove("place__like_active")})).catch((e=>{console.log(e)})):Promise.all([E.getUserData(),E.setLike(e)]).then((([e,s])=>{console.log("лайка не было, но мы установили"),t.querySelector(".place__number-likes").textContent=s.likes.length,t.querySelector(".place__like").classList.add("place__like_active")})).catch((e=>{console.log(e)}))}},L);return t}},y),q=new class{constructor({name:e,occupation:t,avatar:s}){this._name=e,this._occupation=t,this._avatar=s}getUserInfo(){return{name:this._name,occupation:this._occupation,avatar:this._avatar}}setUserInfo(e){this._name.textContent=e.name,this._occupation.textContent=e.about,this._avatar.src=e.avatar}}({name:l,occupation:d,avatar:f}),w=new class extends t{open(e,t){super.open();const s=this._popupSelector.querySelector(".popup__big-img");s.src=t,s.alt=e,this._popupSelector.querySelector(".popup__big-img-title").textContent=e}}(b);w.setEventListeners();const D=new class extends t{constructor(e){super(e),this._buttonDelete=this._popupSelector.querySelector(".popup__delete-button")}setHandler(e){this._handleSubmitCallback=e}setEventListeners(){super.setEventListeners(),this._buttonDelete.addEventListener("click",(()=>this._handleSubmitCallback())),this._buttonDelete.addEventListener("click",this.close)}}(m);function I(e,t){w.open(e,t)}D.setEventListeners();const x=new s(_,(function(){x.loading(!0);const e=x.getInputValues();E.editUserData(e.name,e.about).then((e=>{console.log("Данные сохранены",e),E.getUserData().then((e=>{console.log(e),q.setUserInfo(e)})).catch((e=>{console.log("Произошла ошибка",e)}))})).catch((e=>{console.log(e)})).finally((()=>{x.loading(!1)}))})),B=new s(p,(function(){B.loading(!0);const e=B.getInputValues();console.log(e),Promise.all([E.getUserData(),E.addNewCard(e.name,e.link)]).then((([e,t])=>{C.addNewCard(t)})).catch((e=>{console.log(e)})).finally((()=>{B.loading(!1)}))})),A=new s(S,(function(){A.loading(!0);const e=A.getInputValues();E.newAvatar(e.link).then((e=>{console.log("Аватар сохранен",e),q.setUserInfo(e)})).catch((e=>{console.log("Произошла ошибка",e)})).finally((()=>{A.loading(!1)}))}));x.setEventListeners(),B.setEventListeners(),A.setEventListeners(),i.addEventListener("click",(function(){const e=q.getUserInfo();h.value=e.name.textContent,u.value=e.occupation.textContent,U.checkSaveButtonAndClearInputs(),x.open()})),r.addEventListener("click",(function(){$.checkSaveButtonAndClearInputs(),B.open()})),v.addEventListener("click",(function(){V.checkSaveButtonAndClearInputs(),A.open()})),window.addEventListener("load",(()=>{document.querySelectorAll(".popup").forEach((e=>e.classList.add("popup_opacity")))}));const U=new e(n,a),$=new e(n,c),V=new e(n,g);U.enableValidator(),$.enableValidator(),V.enableValidator(),Promise.all([E.getUserData(),E.getCards()]).then((([e,t])=>{C.renderItems(t)})).catch((e=>{console.log(e)}))})();