import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Offer, User } from '@prisma/client';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

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

  let offer: Offer;
  let user: User;

  beforeEach(async () => {
    await prisma.purchase.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.user.deleteMany();
    offer = await prisma.offer.create({
      data: {
        name: 'Offer Name',
        priceInCents: 1000,
        currency: 'USD',
      },
    });
    user = await prisma.user.create({
      data: {
        name: 'User Name',
        email: 'test@gmail.com',
        birthDate: new Date(),
        gender: 'MALE',
      },
    });
  });

  describe('POST', () => {
    it('creates purchase', async () => {
      const createPurchaseDto: CreatePurchaseDto = {
        offerId: offer.id,
        userId: user.id,
      };

      const response = await request(app.getHttpServer())
        .post('/purchases')
        .send(createPurchaseDto)
        .expect(201);

      expect(response.body.offerId).toEqual(offer.id);
      expect(response.body.userId).toEqual(user.id);
    });
  });
});
