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

<img width="790" alt="스크린샷 2023-07-31 오전 9 23 04" src="https://github.com/Ansu-dev/classting-assigment/assets/108314208/5de64325-21b2-4539-8c3c-80b80367574b">

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

## ✔️ 과제전형을 진행하며...

```
과제가 실제 서비스를 개발하는 것과 유사한 형태로 주어졌기 때문에, 현실적인 요구사항과 제약 사항을 고려하면서 문제를 해결하려 노력하였습니다.
일반적인 Server 개발자로서 코딩만 잘하는것이 아닌 요구사항을 토대로 직접 DB 모델링과, API를 설계할수 있는 자유도 높은 부분이 굉장히 흥미롭게 과제전형을 진행한거같습니다.
아마 자유도 높은 형식때문에 그렇겠지만 요구사항에서 몇가지 자세한 조건이 없어 과제를 진행하며 이런식의 설계가 맞는지 의문을 계속 가졌던거 같습니다.
예를 들어 학교 관리자와 학생의 권한 분리를 위해 요구사항에는 없는 인증에대한 기능을 해야될 까?
추가 구현 부분에서 구독 취소후 재구독을 했을 경우에 대한 조건 이런부분까지도 고려를 해야할 까?
와 같은 물음이 있었던거 같습니다.

```

<br/>
