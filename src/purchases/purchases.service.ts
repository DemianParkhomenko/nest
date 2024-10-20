import { Injectable } from '@nestjs/common';

import { AnalyticsService } from '../analytics/analytics.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  private readonly reportTimeout = 24 * 60 * 60 * 1000;

  constructor(
    private prisma: PrismaService,
    private analyticsService: AnalyticsService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const purchase = await this.prisma.purchase.create({
      data: createPurchaseDto,
    });
    this.analyticsService.sendEvent('New purchase created', purchase.id);
    return purchase;
  }

  async findPurchasesWithoutReport() {
    const now = new Date();

    const purchases = await this.prisma.purchase.findMany({
      where: {
        astrologicalReportSentAt: null,
        createdAt: { lte: new Date(now.getTime() - this.reportTimeout) },
      },
      select: { id: true, userId: true },
    });

    return purchases;
  }

  async setAstrologicalReportSentAt(purchaseIds: string[]) {
    await this.prisma.purchase.updateMany({
      where: { id: { in: purchaseIds } },
      data: { astrologicalReportSentAt: new Date() },
    });
  }
}
