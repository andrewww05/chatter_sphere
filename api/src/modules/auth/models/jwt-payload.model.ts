export type TokenType = 'access' | 'refresh';

export class JwtPayloadInput {
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export class JwtPayload extends JwtPayloadInput {
    public readonly tokenType: TokenType;

    public constructor(tokenType: TokenType, id: string) {
        super(id);

        this.tokenType = tokenType;
    }
}
