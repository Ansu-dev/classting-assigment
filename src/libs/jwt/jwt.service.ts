import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { GetTokenType } from './types/getToken.type';

@Injectable()
export class JwtService {
    private readonly jwtSecret: string;
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';
    }

    getToken(userId: number): GetTokenType {
        const accessToken: string = sign({ userId }, this.jwtSecret, { expiresIn: '1h' });
        const refreshToken: string = sign({ userId }, this.jwtSecret, { expiresIn: '1d' });
        return { accessToken, refreshToken };
    }

    verifyToken(token: string) {
        let data: { state: boolean; user: string | JwtPayload | undefined } = {
            state: false,
            user: undefined,
        };
        verify(token, this.jwtSecret, async (err, user) => {
            if (err) data = { state: false, user: undefined };
            else data = { state: true, user: user };
        });

        return data;
    }
}
