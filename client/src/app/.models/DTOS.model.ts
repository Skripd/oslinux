import { Measurement } from './measurement.model';

export interface QueryCountDTO {
  measurementsConnection: {
    aggregate: {
      count: number
    }
  };
}

export interface QueryPagedDTO {
  measurements: Measurement[];
}

export interface SubDTO {
  measurement: {
    node: {
      id: string;
      createdAt: Date;
      value: number;
    }
  };
}

export interface QueryDayDTO {
  measurementsConnection: {
    aggregate: {
      count: number
    }
    edges: [
      {
        node: {
          createdAt: string,
          value: number
        }
      }
    ];
  };
}
