import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class CryptoService {
    private readonly saltRounds: number;
    constructor() {
        this.saltRounds = 10;
    }

    bcryptPassword = (password: string): Promise<string> => {
        const hashPassword = hash(password, this.saltRounds);
        return hashPassword;
    };
}
