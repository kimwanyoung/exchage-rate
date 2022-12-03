## :rocket: Graphql + Node.js + Mongodb 환율 정보 CRUD 구현 과제 :rocket:

### 테스트 방법

```bash
# exchangerate-server 폴더
npm install nodemon
npm install
npm start

# exchange-client 폴더
npm install
npm start
# apollo-server와 client 서버 모두 실행 후 http://localhost:3000 접속
```
### 구현한 기능
  - **환율 정보 조회 - getExchangeRate(src: String!, tgt: String!)**
  - **환율 정보 전부 조회 - getExchangeRates(amount: Int!)**
  - **데이터 생성 - createExchangeRate(info: InputUpdateExchangeInfo)**
  - **환율 정보 upsert - postExchangeRate(info: InputUpdateExchangeInfo)**
  - **환율 정보 삭제 - deleteExchangeRate(info: InputDeleteExchangeInfo)**
  - **클라이언트에서도 구현 완료 !!**

### 테스트 스크립트
```bash
#환율 정보 조회
curl -XPOST "http://localhost:5110/graphql" --silent \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d '
{ 
  "query": "query { getExchangeRate (src: \"krw\", tgt: \"usd\") { src tgt rate date } }"
}
' | jq
```
```bash
#환율 정보 모두 조회
curl -XPOST "http://localhost:5110/graphql" --silent \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d '
{ 
  "query": "query { getExchangeRate (amount: 5) { src tgt rate date } }"
}
' | jq
```
```bash
#환율 정보 생성
curl -XPOST "http://localhost:5110/graphql" --silent \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d '
{ 
  "query": "mutation { createExchangeRate (info: { src: \"usd\", tgt: \"krw\", rate: 1342.11, date:\"2022-12-02\" }) { src tgt rate date } }"
}
' | jq
```
```bash
#환율 정보 수정
curl -XPOST "http://localhost:5110/graphql" --silent \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d '
{ 
  "query": "mutation { createExchangeRate (info: { src: \"usd\", tgt: \"krw\", rate: 1542.11, date:\"2022-12-02\" }) { src tgt rate date } }"
}
' | jq
```
```bash
#환율 정보 삭제
curl -XPOST "http://localhost:5110/graphql" --silent \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d '
{ 
  "query": "mutation { deleteExchangeRate (info: { src: \"usd\", tgt: \"krw\", date:\"2022-12-02\" }) { src tgt rate date } }"
}
' | jq
```
### 사용 기술 스택
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
