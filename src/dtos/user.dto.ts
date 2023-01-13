export default class UserDto {
    email: string;
    id: string;
    username: string;
    constructor(model: any) {
        this.email = model.email;
        this.id = model._id;
        this.username = model.username;
    }
}
