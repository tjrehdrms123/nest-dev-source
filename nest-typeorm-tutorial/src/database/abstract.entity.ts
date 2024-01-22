import { PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>){
    // Read: 새 항목을 만들기 쉽다.
    // name, public 속성중 일부가 있는 객체를 전달하면 생상자가 자동으로 할당 하기 때문에 추 후 업데이트할때 속성을 계속 업데이트할 필요가 없어진다.
    Object.assign(this, entity)
  }
}