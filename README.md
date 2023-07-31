# Classting-Backend

## 🛠️ Version <br/>

![Node.js 버전](https://img.shields.io/badge/Node.js-18.13.0-brightgreen) ![Nest.js 버전](https://img.shields.io/badge/Nest.js-9.0.0-red) ![Typeorm 버전](https://img.shields.io/badge/Typeorm-0.3.17-blue)

<br/>

## ✔️ 디렉토리 구조

```
📦src
 ┣ 📂config
 ┃ ┣ 📜errorMessage.config.ts : throw error exception에 대한 에러코드 정의
 ┃ ┗ 📜mockRepository.config.ts : test code 작성에 필요한 mock repository 설정
 ┣ 📂decorator
 ┃ ┗ 📜getUser.decorator.ts : access guard로 부터 얻어오는 user의 id를 모듈화
 ┣ 📂guard
 ┃ ┣ 📂guard
 ┃ ┃ ┣ 📜accessToken.guard.ts : user 검증 guard
 ┃ ┃ ┗ 📜admin.guard.ts : admin role guard
 ┃ ┗ 📂strategy
 ┃ ┃ ┗ 📜accessToken.strategy.ts
 ┣ 📂interceptor
 ┃ ┗ 📜logging.interceptor.ts : 요청에 대한 logging 설정
 ┣ 📂libs
 ┃ ┣ 📂crypto : 비밀번호 암호화에 대한 함수 module화
 ┃ ┃ ┣ 📜crypto.module.ts
 ┃ ┃ ┗ 📜crypto.service.ts
 ┃ ┗ 📂jwt : token 발행과 검증에대한 함수 module화
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┗ 📜getToken.type.ts
 ┃ ┃ ┣ 📜jwt.module.ts
 ┃ ┃ ┗ 📜jwt.service.ts
 ┣ 📂models : Database의 테이블 객체
 ┃ ┣ 📜Notice.entity.ts
 ┃ ┣ 📜Role.entity.ts
 ┃ ┣ 📜School.entity.ts
 ┃ ┣ 📜Subscribe.entity.ts
 ┃ ┗ 📜User.entity.ts
 ┣ 📂modules : 도메인들의 controller, service, module
 ┃ ┣ 📂auth
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜common.response.dto.ts
 ┃ ┣ 📂notice
 ┃ ┣ 📂school
 ┃ ┣ 📂user
 ┃ ┗ 📜index.module.ts : 도메인을 root module
 ┣ 📂repository : repository 전략을 통한 orm 함수
 ┣ 📂typeorm : database 설정
 ┃ ┣ 📜typeorm.module.ts
 ┃ ┗ 📜typeorm.service.ts
 ┣ 📜app.module.ts : root module(global config, orm 연결 등...)
 ┗ 📜main.ts
```

<br/>

## 📖 ERD <br/>

<img width="790" alt="스크린샷 2023-07-31 오전 9 23 04" src="https://github.com/Ansu-dev/classting-assigment/assets/108314208/dd4c4112-36e9-4b91-bb06-295801109ee0">

## ✔️ Settings

```bash
DB_HOST=127.0.0.1
DB_USERNAME=db_username
DB_PASSWORD=db_password
DB_PORT=db_port
DB_NAME=db_name
DB_SYNC=false
JWT_SECRET_KEY=jwt_secret_key(jwt 토큰발행에 필요)

환경변수 설정

PORT를 지정하지 않을경우 자동으로 3000번 PORT로 실행되며
API 명세는 http://localhost:[지정포트]/swagger 확인가능합니다.
```

<br/>

## ✔️ Run & Build

### ▪️ Local (yarn script)

```bash
yarn // package 설치
yarn start:dev [애플리케이션 명칭]

...

yarn start:dev
```

### ▪️ Docker

```bash
docker compose up [docker-compose services 명칭] -d --build

...
ex)
docker compose up classting-server -d --build
```

<br/>

## ✔️ 과제전향을 진행하며...

```

```

<br/>
