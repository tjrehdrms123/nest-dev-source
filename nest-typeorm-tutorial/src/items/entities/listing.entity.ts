import { AbstractEntity } from "../../../src/database/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing extends AbstractEntity<Listing> {
  @Column({ comment: '설명' })
  description: string;

  @Column()
  rating: number
}
