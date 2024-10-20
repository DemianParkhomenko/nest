import { Module } from '@nestjs/common';

import { NotificationService } from '../notification/notification.service';
import { PurchaseService } from '../purchases/purchases.service';

@Module({
  providers: [NotificationService, PurchaseService],
})
export class PurchasesModule {}
