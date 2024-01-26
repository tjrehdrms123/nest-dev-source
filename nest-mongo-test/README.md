# NestJS E2E,Unit Testing + MongoDB <img src="./jest.png" align=left width="100" alt="Logo" />

> 테스팅에 대해 학습한 내용을 정리 합니다.

<br/>

테스트 함수는 deterministic 해야한다. (언제 실행되든 항상 같은 결과를 내야한다.)

통합 테스트는 문제가 발생했을때 문제를 알려주는 것으로 생각하고,
단위 테스트는 문제가 발생한 이유를 알려준다고 생각한다.

## 🌿 Unit Code

### RUN

```bash
npm test users.controller
npm test user.repository
```

### Setting

1.  Test 파일 생성
    - 모듈 폴더 밑 **test** 폴더 생성
    - Unit 테스트할 파일 생성
      - [users.controller.spec.ts](./src/users/test/users.controller.spec.ts)
2.  공급자 파일 모킹
    - 모듈 폴더 및 **mocks** 폴더 생성
    - 주입(Provider)된 공급자 모킹 파일 생성
      - [users.service.ts](./src/users/__mocks__/users.service.ts)
        - mockResolvedValue: 비동기 함수를 모킹할 경우
        - mockReturnValue: 정적 값
      - [users.controller.ts](./src/users/users.controller.ts)
        - constructor 부분에 `DI`된 것 확인
        - QnA) 모킹한 공급자가 다른 공급자를 주입 받고 있다면 그 대상도 모킹해야되는가?
          - 아니다. 가장 높은 수준의 종속성만 모킹하면 된다.
3.  더미 데이터 생성

    - [user.stub.ts](./src/users/test/stubs/user.stub.ts)

4.  Test파일에 모킹한 공급자 연결
    - createTestingModule 함수의 providers 옵션이 `jest.mock('../users.service')`에 의해 모의된 값을 주입
    - [users.controller.spec.ts](./src/users/test/users.controller.spec.ts)

---

테스트 대상이 Repo일 경우 추가 작업

5. 모델 파일 모킹
   - [mock.model.ts](./src/database/test/support/mock.model.ts)
   - [user.model.ts](./src/users/test/support/user.model.ts)

### 참고 영상

- [Nest.js E2E Testing With Supertest (Rest API + MongoDB)](https://www.youtube.com/watch?v=R2ndY_JhxWk&t=330s)

## 🌿 E2E Code 작성 방법

### SETTING

1.  Test 파일 생성
    - 모듈 폴더 밑 **test** 폴더 밑 **intergreation** 폴더 생성
    - E2E할 파일 생성
    - [users.controller.intergreation.spec.ts](./src/users/test/intergreation/users.controller.intergreation.spec.ts)
2.  Database 연결
    - [database.module.ts](./src/database/database.module.ts)
    - [database.service.ts](./src/database/database.service.ts)
3.  Database 주입
    - [app.module.ts](./src/app.module.ts)
4.  Test 파일 작성
    - [users.controller.intergreation.spec.ts](./src/users/test/intergreation/users.controller.intergreation.spec.ts)

### 참고 영상

- [Nest.js Unit Testing | Best Practices + MongoDB](https://www.youtube.com/watch?v=1Vc6Xw8FMpg&t=335s))

### TEST Code Example

```js
describe('getUser', () => {
  describe('when getUser is called', () => {
    let user: User;
    beforeEach(async () => {
      // 1. beforeEach에서 검증할 함수 실행 후 return 값 저장
      user = await usersController.getUser(userStub().userId);
    });
    // 2. test 함수에서 Stub을 통해 값 검증
    // -> usersService는 모킹된 Service 함수
    test('then it should call usersService', () => {
      // TEST CASE: usersService의 getUserById함수가 전달한 사용자 DI를 사용하여 Service에 메서드를 호출하고 있는지
      expect(usersService.getUserById).toBeCalledWith(userStub().userId);
    });
    test('then is should return a user', () => {
      // TEST CASE: 반환값이 옯바른지
      expect(user).toEqual(userStub());
    });
  });
});
```
