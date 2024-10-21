import { Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';

import { AstrologyService } from './astrology.service';

@Module({
  imports: [NotificationModule, PurchasesModule],
  providers: [AstrologyService],
})
export class PurchasesModule {}
