import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasurementController } from './measurement/measurement.controller';

@Module({
  imports: [],
  controllers: [AppController, MeasurementController],
  providers: [AppService],
})
export class AppModule {}
