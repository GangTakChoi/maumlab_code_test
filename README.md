
# 서버 실행
### 1. 사전작업
+ Docker 설치

### 2. 실행
```bash
$ docker compose up
```

# 로그 확인
```bash
$ docker logs -f maum_code_test
```

# 수행 목록
- [x] 설문지 CREATE
- [x] 설문지 READ
- [x] 설문지 UPDATE
- [x] 설문지 DELETE
---
- [x] 문항 CREATE
- [x] 문항 READ
- [x] 문항 UPDATE
- [x] 문항 DELETE
---
- [x] 선택지 CREATE
- [x] 선택지 READ
- [x] 선택지 UPDATE
- [x] 선택지 DELETE
---
- [x] 답변 CREATE
- [x] 답변 READ
- [ ] 답변 UPDATE
- [x] 답변 DELETE
---
- [x] 설문지 완료 처리

- [x] 완료된 설문지 확인

- [ ] [에러처리] 요청 실패 시 적절한 에러를 리턴
- [ ] [에러처리] 에러 등답에 제한은 없지만 일관되게 응답해야 함

- [ ] [로그] 에러 및 특이사항 발생시 로그를 확인하여 대처할 수 있게 작성