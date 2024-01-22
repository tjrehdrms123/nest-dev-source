import { AbstractEntity } from "../../../src/database/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments) // N:1 여러개의 댓글이 하나의 게시물에 대한 댓글
  item: Item;
}
