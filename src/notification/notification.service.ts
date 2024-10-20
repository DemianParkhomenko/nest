import { Injectable, Logger } from '@nestjs/common';
import { setTimeout as sleep } from 'timers/promises';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendNotification(userId: string, message: string) {
    await sleep(100);
    this.logger.log(`Sending notification to ${userId}: ${message}`);
  }
}
