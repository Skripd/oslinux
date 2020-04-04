import { Resolver, Query, Args, Info, Mutation, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GqlAuthGuard } from 'src/gql-auth.guard';
import { PermissionsGuard } from 'src/permissions.guard';
import { Permissions } from 'src/permissions.decorator';
import { Measurement, BatchPayload } from 'src/prisma/prisma.binding';

@Resolver('Measurement')
export class MeasurementResolver {
    constructor(private readonly prismaService: PrismaService) {}

    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Query('measurements')
    @Permissions('oslinux-server:user')
    async getMeasurements(@Args() args, @Info() info): Promise<Measurement[]> {
      return this.prismaService.query.measurements(args, info);
    }
  
    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Query('measurement')
    @Permissions('oslinux-server:user')
    async getMeasurement(@Args() args, @Info() info): Promise<Measurement> {
      return this.prismaService.query.measurement(args, info);
    }

    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Query('measurementsConnection')
    @Permissions('oslinux-server:user')
    async getMeasurementsConnection(@Args() args, @Info() info): Promise<Measurement> {
      return this.prismaService.query.measurementsConnection(args, info);
    }
  
    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Mutation('createMeasurement')
    @Permissions('oslinux-server:poweruser')
    async createMeasurement(@Args() args, @Info() info): Promise<Measurement> {
      return this.prismaService.mutation.createMeasurement(args, info);
    }
  
    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Mutation('updateMeasurement')
    @Permissions('oslinux-server:poweruser')
    async updateMeasurement(@Args() args, @Info() info): Promise<Measurement> {
      return this.prismaService.mutation.updateMeasurement(args, info);
    }
  
    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Mutation('updateManyMeasurements')
    @Permissions('oslinux-server:poweruser')
    async updateManyMeasurements(@Args() args, @Info() info): Promise<BatchPayload> {
      return this.prismaService.mutation.updateManyMeasurements(args, info);
    }
  
    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Mutation('deleteMeasurement')
    @Permissions('oslinux-server:poweruser')
    async deleteMeasurement(@Args() args, @Info() info): Promise<Measurement> {
      return this.prismaService.mutation.deleteMeasurement(args, info);
    }
  
    @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Mutation('deleteManyMeasurements')
    @Permissions('oslinux-server:admin')
    async deleteManyMeasurements(@Args() args, @Info() info): Promise<BatchPayload> {
      return this.prismaService.mutation.deleteManyMeasurements(args, info);
    }
  
    // @UseGuards(GqlAuthGuard, PermissionsGuard)
    @Subscription('measurement')
    // @Permissions('oslinux-server:user')
    onMeasurementMutation(@Args() args, @Info() info) {
      return this.prismaService.subscription.measurement(args, info);
    }
}
