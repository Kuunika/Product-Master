import { Module } from '@nestjs/common';
import { OclClientService } from './ocl-client.service';

@Module({
  providers: [OclClientService],
  exports: [OclClientService]
})
export class OclClientModule {}
