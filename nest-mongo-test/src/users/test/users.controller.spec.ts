import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../schemas/user.schema';


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
        console.log('user:',user);
      })

      test('then it should call usersService', () => {
        console.log('usersService:',usersController);
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      })

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })
});
