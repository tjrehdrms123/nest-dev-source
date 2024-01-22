import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";
import { AbstractEntity } from "../../../src/database/abstract.entity";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column({ comment: '이름' })
  name: string;

  @Column({ default: true, comment: '공개 여부'})
  public: boolean

  @OneToOne(() => Listing, { cascade: true }) // 1:1: 하나의 아이템에 대한 설명과 랭킹
  @JoinColumn()
  listing: Listing

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true }) // 1:N: 하나의 아이템에 여러개의 댓글
  @JoinColumn()
  comments: Comment[] // 여러개의 댓글이 때문에 배열로

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
