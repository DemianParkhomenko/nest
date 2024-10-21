import { Module } from '@nestjs/common';

import { AnalyticsModule } from '../analytics/analytics.module';
import { PurchaseController } from './purchases.controller';
import { PurchaseService } from './purchases.service';

@Module({
  imports: [AnalyticsModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchasesModule {}
