import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options';
import { MeasurementResolver } from './oslinux-client/measurement/measurement.resolver';
import { HueControllerService } from './hue-controller/hue-controller.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
  ],
  controllers: [],
  providers: [MeasurementResolver, HueControllerService],
})
export class AppModule {}
