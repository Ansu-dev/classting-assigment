import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private readonly jwtSecret: string;
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';
    }

    getToken(userId: number) {
        const accessToken = sign({ userId }, this.jwtSecret, { expiresIn: '1h' });
        const refreshToken = sign({ userId }, this.jwtSecret, { expiresIn: '1d' });

        const data = {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };

        return data;
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
