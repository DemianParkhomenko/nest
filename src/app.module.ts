import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AnalyticsService } from './analytics/analytics.service';
import { AstrologyService } from './astrology/astrology.service';
import { NotificationService } from './notification/notification.service';
import { PrismaModule } from './prisma/prisma.module';
import { PurchasesModule } from './purchases/purchases.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PurchasesModule,
    ScheduleModule.forRoot(),
  ],
  providers: [AnalyticsService, AstrologyService, NotificationService],
})
export class AppModule {}
