class Api {
  constructor({ address, token }) {
    this.address = address;
    this.token = token;
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
  }

  getCards() {
    return fetch(`${this.address}/cards`, {
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
  }

  deleteCard(id) {
    return fetch(`${this.address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
  }

  setLike(id) {
    return fetch(`${this.address}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
  }

  deleteLike(id) {
    return fetch(`${this.address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "375f8480-1170-4121-a89c-9ffd6ccda63c",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка : ${res.status}`);
      }
    });
  }
}

export default Api;
