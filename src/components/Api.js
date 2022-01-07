class Api {
  constructor({ address, token }) {
    this.address = address;
    this.token = token;
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка : ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this.address}/cards`, {
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then(this._checkResponse);
  }

  editUserData(name, about) {
    return fetch(`${this.address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this.address}/cards`, {
      method: "POST",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then(this._checkResponse);
  }

  setLike(id) {
    return fetch(`${this.address}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then(this._checkResponse);
  }

  newAvatar(link) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}

export default Api;
