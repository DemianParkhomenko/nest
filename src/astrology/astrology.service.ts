import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { NotificationService } from '../notification/notification.service';
import { PurchaseService } from '../purchases/purchases.service';

@Injectable()
export class AstrologyService {
  constructor(
    private notificationService: NotificationService,
    private purchaseService: PurchaseService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async jobReports() {
    const purchases = await this.purchaseService.findPurchasesWithoutReport();

    for (const purchase of purchases) {
      await this.notificationService.sendNotification(
        purchase.userId,
        `Your astrology report is ready!`,
      );
    }

    const purchaseIds = purchases.map(({ id }) => id);
    await this.purchaseService.setAstrologicalReportSentAt(purchaseIds);
  }
}
