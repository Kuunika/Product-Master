import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OclClientModule } from './ocl-client/ocl-client.module';

@Module({
  imports: [OclClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
