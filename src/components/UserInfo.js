class UserInfo{
    constructor({name, occupation, avatar}){
        this._name = name;
        this._occupation = occupation;
        this._avatar = avatar;
    }

    getUserInfo(){
        const dataUser = {
            name: this._name,
            occupation: this._occupation,
            avatar: this._avatar
        }
        return dataUser;
    }

    setUserInfo(obj){
        this._name.textContent = obj.name;
        this._occupation.textContent = obj.about;
        this._avatar.src = obj.avatar;
    }
}

export default UserInfo;