import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
    ){}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    })
    const tags = createItemDto.tags.map((createTagDto) => new Tag(createTagDto));
    const item = new Item({
      ...createItemDto,
      listing,
      tags,
      comments: [] // 저금 아이템을 생성할때는 댓글이 없다.
    }); // item 엔테디를 인스턴스화 하고, DTO 속성이 일치하므로 생성자로 직접 전달 할 수 있다.

    await this.entityManager.save(item)
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  async findOne(id: number) {
    return await this.itemRepository.findOne({ 
      where: {id},
      relations: { 
        listing: true,
        comments: true,
        tags: true
      }
     });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id });
    item.public = updateItemDto.public; //public 컬럼만 업데이트
    const comments = updateItemDto.comments.map((CreateCommentDto) => new Comment(CreateCommentDto));
    item.comments = comments; // 전달 받은 item들을 comment를 통해 인스턴스화 함
    await this.entityManager.save(item);
  }

  async updateTransaction(id: number, updateItemDto: UpdateItemDto){
    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemRepository.findOneBy({ id });
      item.public = updateItemDto.public; //public 컬럼만 업데이트
      const comments = updateItemDto.comments.map((CreateCommentDto) => new Comment(CreateCommentDto));
      item.comments = comments; // 전달 받은 item들을 comment를 통해 인스턴스화 함
      await this.entityManager.save(item);
      throw new Error('Transaction Test Error');
      const tagConent = `${Math.random()}`;
      const tag = new Tag({ content: tagConent });
      await entityManager.save(tag);
    })
  }

  async remove(id: number) {
    await this.itemRepository.delete(id)
  }
}
