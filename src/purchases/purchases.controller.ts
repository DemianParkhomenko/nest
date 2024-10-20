import { Controller, Post, Body } from '@nestjs/common';

import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseService } from './purchases.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }
}
