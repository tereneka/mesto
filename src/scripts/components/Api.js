export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getApi(endpoint, method, body) {
    return body
      ? fetch(`${this._baseUrl}/${endpoint}`, {
          method: method,
          headers: this._headers,
          body: body,
        })
      : fetch(`${this._baseUrl}/${endpoint}`, {
          method: method,
          headers: this._headers,
        });
  }

  _getResult(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return this._getApi("users/me", "GET").then((res) => this._getResult(res));
  }

  setAvatar({ avatar }) {
    const body = JSON.stringify({ avatar });
    return this._getApi("users/me/avatar", "PATCH", body).then((res) =>
      this._getResult(res)
    );
  }

  setUserInfo({ name, about }) {
    const body = JSON.stringify({ name, about });
    return this._getApi("users/me", "PATCH", body).then((res) =>
      this._getResult(res)
    );
  }

  getCards() {
    return this._getApi("cards", "GET").then((res) => this._getResult(res));
  }

  postCard({ name, link }) {
    const body = JSON.stringify({ name, link });
    return this._getApi("cards", "POST", body).then((res) =>
      this._getResult(res)
    );
  }

  deleteCard(id) {
    return this._getApi(`cards/${id}`, "DELETE").then((res) =>
      this._getResult(res)
    );
  }

  addCardLike(id) {
    return this._getApi(`cards/${id}/likes`, "PUT").then((res) =>
      this._getResult(res)
    );
  }

  deleteCardLike(id) {
    return this._getApi(`cards/${id}/likes`, "DELETE").then((res) =>
      this._getResult(res)
    );
  }
}
