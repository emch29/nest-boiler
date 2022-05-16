import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  let mockUserRepo:  Repository<User>;

  const USERS:Array<User> = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      isActive: true
    }, 
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Joe',
      isActive: true
    }
    
  ]

 

  beforeEach(async () => {
     const repositoryMockFactory  = jest.fn(() => ({
       findOne: jest.fn(async (id: string) => {
         return Promise.resolve(USERS.find((x) => x.id === parseInt(id)))
       }),
       find: jest.fn(() => Promise.resolve(USERS))
    }));
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    mockUserRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should succed', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(2);
  });


  it('find one should succed', async () => {
    const result = await service.findOne('1');
    expect(mockUserRepo.findOne).toHaveBeenCalled();
    expect(mockUserRepo.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual(USERS[0])
  });

});
