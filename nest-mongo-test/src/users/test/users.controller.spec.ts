import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


jest.mock('../users.service')

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService] // 모의 서비스 전달
    }).compile();
    
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub().userId)  
      })

      test('then it should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      })

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })

  describe('getUsers', () => {
    describe('when getUses is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers()  
      })

      test('then it should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      })

      test('then is should return a user', () => {
        expect(users).toEqual([userStub()]);
      })
    })
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          age: userStub().age
        }
        user = await usersController.createUser(createUserDto);
      })

      test('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUserDto.email, createUserDto.age);
      })

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto

      beforeEach(async () => {
        updateUserDto = {
          favoriteFoods: ['pizza'],
          age: 98
        }
        user = await usersController.updateUser(userStub().userId, updateUserDto)  
      })

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(userStub().userId, updateUserDto);
      })

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })
});
