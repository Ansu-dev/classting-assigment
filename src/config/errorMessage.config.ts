import {
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

export const ErrorMessage = {
    // * 토큰 에러 / server error
    30: { resultCode: -30, data: 'ACCESS-TOKEN EXPIRED.' },
    31: { resultCode: -31, data: 'REFRESH-TOKEN EXPIRED.' },
    9999: { resultCode: -9999, data: '[system] 서버 에러' },

    // * auth
    10000: { resultCode: -10000, data: '존재하지 않는 계정' },
    10001: { resultCode: -10001, data: '접근할수 없는 권한' },

    // * login
    11000: { resultCode: -11000, data: '옳지 않는 비밀번호' },

    // * school
    12000: { resultCode: -12000, data: '이미 존재하는 학교페이지 입니다.' },
    12001: { resultCode: -12001, data: '존재하지 않는 학교페이지' },
    12010: { resultCode: -12010, data: '이미 구독된 학교페이지 입니다.' },
} as const;

type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];

export function throwError(status: number, resultCode: number) {
    let errorMsg: JSON = ErrorMessage[resultCode];
    if (status === 400) {
        throw new BadRequestException(errorMsg);
    } else if (status === 401) {
        throw new UnauthorizedException(errorMsg);
    } else if (status === 403) {
        throw new ForbiddenException(errorMsg);
    } else if (status === 404) {
        throw new NotFoundException(errorMsg);
    } else if (status === 500) {
        throw new InternalServerErrorException(errorMsg);
    }
}
