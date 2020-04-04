
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum MeasurementOrderByInput {
    id_ASC = "id_ASC",
    id_DESC = "id_DESC",
    createdAt_ASC = "createdAt_ASC",
    createdAt_DESC = "createdAt_DESC",
    value_ASC = "value_ASC",
    value_DESC = "value_DESC"
}

export enum MutationType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}

export class MeasurementCreateInput {
    id?: string;
    value: number;
}

export class MeasurementSubscriptionWhereInput {
    AND?: MeasurementSubscriptionWhereInput[];
    mutation_in?: MutationType[];
    updatedFields_contains?: string;
    updatedFields_contains_every?: string[];
    updatedFields_contains_some?: string[];
    node?: MeasurementWhereInput;
}

export class MeasurementUpdateInput {
    value?: number;
}

export class MeasurementUpdateManyMutationInput {
    value?: number;
}

export class MeasurementWhereInput {
    AND?: MeasurementWhereInput[];
    id?: string;
    id_not?: string;
    id_in?: string[];
    id_not_in?: string[];
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    id_contains?: string;
    id_not_contains?: string;
    id_starts_with?: string;
    id_not_starts_with?: string;
    id_ends_with?: string;
    id_not_ends_with?: string;
    createdAt?: DateTime;
    createdAt_not?: DateTime;
    createdAt_in?: DateTime[];
    createdAt_not_in?: DateTime[];
    createdAt_lt?: DateTime;
    createdAt_lte?: DateTime;
    createdAt_gt?: DateTime;
    createdAt_gte?: DateTime;
    value?: number;
    value_not?: number;
    value_in?: number[];
    value_not_in?: number[];
    value_lt?: number;
    value_lte?: number;
    value_gt?: number;
    value_gte?: number;
}

export class MeasurementWhereUniqueInput {
    id?: string;
}

export interface Node {
    id: string;
}

export class AggregateMeasurement {
    count: number;
}

export class BatchPayload {
    count: Long;
}

export class Measurement implements Node {
    id: string;
    createdAt: DateTime;
    value: number;
}

export class MeasurementConnection {
    pageInfo: PageInfo;
    edges: MeasurementEdge[];
    aggregate: AggregateMeasurement;
}

export class MeasurementEdge {
    node: Measurement;
    cursor: string;
}

export class MeasurementPreviousValues {
    id: string;
    createdAt: DateTime;
    value: number;
}

export class MeasurementSubscriptionPayload {
    mutation: MutationType;
    node?: Measurement;
    updatedFields?: string[];
    previousValues?: MeasurementPreviousValues;
}

export abstract class IMutation {
    abstract createMeasurement(data: MeasurementCreateInput): Measurement | Promise<Measurement>;
    abstract updateMeasurement(data: MeasurementUpdateInput, where: MeasurementWhereUniqueInput): Measurement | Promise<Measurement>;
    abstract deleteMeasurement(where: MeasurementWhereUniqueInput): Measurement | Promise<Measurement>;
    abstract upsertMeasurement(where: MeasurementWhereUniqueInput, create: MeasurementCreateInput, update: MeasurementUpdateInput): Measurement | Promise<Measurement>;
    abstract updateManyMeasurements(data: MeasurementUpdateManyMutationInput, where?: MeasurementWhereInput): BatchPayload | Promise<BatchPayload>;
    abstract deleteManyMeasurements(where?: MeasurementWhereInput): BatchPayload | Promise<BatchPayload>;
}

export class PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
}

export abstract class IQuery {
    abstract measurements(where?: MeasurementWhereInput, orderBy?: MeasurementOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): Measurement[] | Promise<Measurement[]>;
    abstract measurement(where: MeasurementWhereUniqueInput): Measurement | Promise<Measurement>;
    abstract measurementsConnection(where?: MeasurementWhereInput, orderBy?: MeasurementOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): MeasurementConnection | Promise<MeasurementConnection>;
    abstract node(id: string): Node | Promise<Node>;
}

export abstract class ISubscription {
    abstract measurement(where?: MeasurementSubscriptionWhereInput): MeasurementSubscriptionPayload | Promise<MeasurementSubscriptionPayload>;
}

export type DateTime = any;
export type Long = any;
