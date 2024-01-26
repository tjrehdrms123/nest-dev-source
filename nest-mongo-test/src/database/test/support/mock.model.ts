export abstract class MockModel<T> {
  protected abstract entityStub: T; // 함수명만 정의하고 실제 실행 영역은 상속받는 클래스에 맡긴다. -> UserModel

  constructor(createEntityData: T){
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): void {} // create 메서드를 호출할때 전달 받은 DTO로 인스턴스화(new) 하는데, 인스턴스할 값을 테스트

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub
    }
  }

  async find(): Promise<T[]> {
    return [this.entityStub]
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }
}