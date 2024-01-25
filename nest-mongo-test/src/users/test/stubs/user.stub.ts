import { User } from "src/users/schemas/user.schema";

// export const = {} 객체 형태로 내보내면 테스트 객체를 변경할 수 있는 잠재적인 위험이 있다.
// 테스트간 데이터를 공유하지 않도록 함수로 감쌈
export const userStub = (): User => {
  return {
    userId: '123',
    email: 'test@example.com',
    age: 23,
    favoriteFoods: ['apples', 'pizza']
  }
}