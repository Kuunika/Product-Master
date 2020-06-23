import { Module } from '@nestjs/common';
import { OclClientService } from './ocl-client.service';

@Module({
  providers: [OclClientService]
})
export class OclClientModule {}
