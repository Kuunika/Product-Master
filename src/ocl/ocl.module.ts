import { Module } from '@nestjs/common';
import { OCLClient } from './ocl.client';
import { OCLService } from './ocl.service';

@Module({
  providers: [OCLService, OCLClient],
  exports: [OCLService]
})
export class OCLModule {}
