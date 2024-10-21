import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { CreateUserDto } from './dto/create-user.dto';

describe('users', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    prisma = module.get(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('POST', () => {
    it('creates a user', async () => {
      const user: CreateUserDto = {
        name: 'Kenneth Lane Thompson',
        birthDate: new Date('1943-02-04').toISOString(),
        email: 'ken@google.com',
        gender: 'MALE',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201);

      const dbUser = await prisma.user.findUnique({
        where: { id: response.body.id },
      });

      expect(dbUser.email).toEqual(user.email);
      expect(dbUser.birthDate.toISOString()).toEqual(user.birthDate);
    });
  });
});
