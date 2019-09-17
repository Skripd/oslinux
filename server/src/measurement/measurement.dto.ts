export class MeasurementDTO {
    readonly id: string;
    readonly createdOn: Date;
    readonly measurement: number;

    constructor(measurement: number) {
        this.id = 'none';
        this.createdOn = new Date();
        this.measurement = measurement;
    }
}
