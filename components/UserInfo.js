class UserInfo{
    constructor({name, occupation}){
        this._name = name;
        this._occupation = occupation;
    }

    getUserInfo(){
        const dataUser = {
            name: this._name,
            occupation: this._occupation
        }
        return dataUser;
    }

    setUserInfo(obj){
        this._name.textContent = obj.name;
        this._occupation.textContent = obj.occupation;
    }
}

export default UserInfo;