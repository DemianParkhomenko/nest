import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'nestjs-prisma';

import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationModule } from './notification/notification.module';
import { PurchasesModule } from './purchases/purchases.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PurchasesModule,
    ScheduleModule.forRoot(),
    AnalyticsModule,
    NotificationModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
