import { Module } from '@nestjs/common';

import { AnalyticsService } from '../analytics/analytics.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PurchaseController } from './purchases.controller';
import { PurchaseService } from './purchases.service';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, AnalyticsService],
})
export class PurchasesModule {}
