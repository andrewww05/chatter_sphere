export class GoogleUser {
    public readonly email: string;
    public readonly name: string;
    public readonly picture: string;
    // Google user's id
    public readonly sub: string;

    constructor(email: string, name: string, picture: string, sub: string) {
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.sub = sub;
    }
}
