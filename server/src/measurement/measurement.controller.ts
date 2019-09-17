import { Controller, Get, Post, Param } from '@nestjs/common';
import { MeasurementDTO } from './measurement.dto';

@Controller('measurement')
export class MeasurementController {

    @Get('latest')
    async findAll(): Promise<MeasurementDTO[]> {

        return [];
    }

    @Get('notbefore')
    async findNotBefore(date: Date): Promise<MeasurementDTO[]> {

        return [];
    }

    @Get('between')
    async findBetweenDate(dateLeft: Date, dateRight: Date): Promise<MeasurementDTO[]> {

        return [];
    }

    @Post()
    async insertOne(): Promise<MeasurementDTO> {

        return new MeasurementDTO(0);
    }

    @Get(':id')
    async findOne(id: string): Promise<MeasurementDTO> {

        return new MeasurementDTO(0);
    }

}
