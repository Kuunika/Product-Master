import { Module } from '@nestjs/common';
import { transports as Transports } from 'winston';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FhirProductsModule } from './fhir-products/fhir-products.module';
import { defaultLogFormat } from './common/utils/os';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OCLModule } from './ocl/ocl.module';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: function (service: ConfigService): WinstonModuleOptions {
        const transports: Array<Transports.ConsoleTransportInstance | Transports.FileTransportInstance> = [
          new Transports.File({ filename: 'logs/error.log', level: 'error', format: defaultLogFormat() }),
          new Transports.File({ filename: 'logs/combined.log', format: defaultLogFormat() })
        ];
        if (service.get<string>('NODE_ENV') !== 'production') {
          transports.push(new Transports.Console({ format: defaultLogFormat() }));
        }
        return {
          level: 'info',
          format: defaultLogFormat(),
          defaultMeta: { service: 'Product Master' },
          transports: transports
        }
      },
      inject: [ConfigService]
    }),
    ProductsModule,
    FhirProductsModule,
    OCLModule
  ],
  providers: [AppService],
})
export class AppModule { }
