// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  measurement: (where?: MeasurementWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  measurement: (
    where: MeasurementWhereUniqueInput
  ) => MeasurementNullablePromise;
  measurements: (args?: {
    where?: MeasurementWhereInput;
    orderBy?: MeasurementOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Measurement>;
  measurementsConnection: (args?: {
    where?: MeasurementWhereInput;
    orderBy?: MeasurementOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => MeasurementConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createMeasurement: (data: MeasurementCreateInput) => MeasurementPromise;
  updateMeasurement: (args: {
    data: MeasurementUpdateInput;
    where: MeasurementWhereUniqueInput;
  }) => MeasurementPromise;
  updateManyMeasurements: (args: {
    data: MeasurementUpdateManyMutationInput;
    where?: MeasurementWhereInput;
  }) => BatchPayloadPromise;
  upsertMeasurement: (args: {
    where: MeasurementWhereUniqueInput;
    create: MeasurementCreateInput;
    update: MeasurementUpdateInput;
  }) => MeasurementPromise;
  deleteMeasurement: (where: MeasurementWhereUniqueInput) => MeasurementPromise;
  deleteManyMeasurements: (
    where?: MeasurementWhereInput
  ) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  measurement: (
    where?: MeasurementSubscriptionWhereInput
  ) => MeasurementSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type MeasurementOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "value_ASC"
  | "value_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type MeasurementWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface MeasurementWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  value?: Maybe<Int>;
  value_not?: Maybe<Int>;
  value_in?: Maybe<Int[] | Int>;
  value_not_in?: Maybe<Int[] | Int>;
  value_lt?: Maybe<Int>;
  value_lte?: Maybe<Int>;
  value_gt?: Maybe<Int>;
  value_gte?: Maybe<Int>;
  AND?: Maybe<MeasurementWhereInput[] | MeasurementWhereInput>;
}

export interface MeasurementCreateInput {
  id?: Maybe<ID_Input>;
  value: Int;
}

export interface MeasurementUpdateInput {
  value?: Maybe<Int>;
}

export interface MeasurementUpdateManyMutationInput {
  value?: Maybe<Int>;
}

export interface MeasurementSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<MeasurementWhereInput>;
  AND?: Maybe<
    MeasurementSubscriptionWhereInput[] | MeasurementSubscriptionWhereInput
  >;
}

export interface NodeNode {
  id: ID_Output;
}

export interface Measurement {
  id: ID_Output;
  createdAt: DateTimeOutput;
  value: Int;
}

export interface MeasurementPromise extends Promise<Measurement>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  value: () => Promise<Int>;
}

export interface MeasurementSubscription
  extends Promise<AsyncIterator<Measurement>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  value: () => Promise<AsyncIterator<Int>>;
}

export interface MeasurementNullablePromise
  extends Promise<Measurement | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  value: () => Promise<Int>;
}

export interface MeasurementConnection {
  pageInfo: PageInfo;
  edges: MeasurementEdge[];
}

export interface MeasurementConnectionPromise
  extends Promise<MeasurementConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<MeasurementEdge>>() => T;
  aggregate: <T = AggregateMeasurementPromise>() => T;
}

export interface MeasurementConnectionSubscription
  extends Promise<AsyncIterator<MeasurementConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<MeasurementEdgeSubscription>>>() => T;
  aggregate: <T = AggregateMeasurementSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface MeasurementEdge {
  node: Measurement;
  cursor: String;
}

export interface MeasurementEdgePromise
  extends Promise<MeasurementEdge>,
    Fragmentable {
  node: <T = MeasurementPromise>() => T;
  cursor: () => Promise<String>;
}

export interface MeasurementEdgeSubscription
  extends Promise<AsyncIterator<MeasurementEdge>>,
    Fragmentable {
  node: <T = MeasurementSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateMeasurement {
  count: Int;
}

export interface AggregateMeasurementPromise
  extends Promise<AggregateMeasurement>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateMeasurementSubscription
  extends Promise<AsyncIterator<AggregateMeasurement>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface MeasurementSubscriptionPayload {
  mutation: MutationType;
  node: Measurement;
  updatedFields: String[];
  previousValues: MeasurementPreviousValues;
}

export interface MeasurementSubscriptionPayloadPromise
  extends Promise<MeasurementSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = MeasurementPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = MeasurementPreviousValuesPromise>() => T;
}

export interface MeasurementSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<MeasurementSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = MeasurementSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = MeasurementPreviousValuesSubscription>() => T;
}

export interface MeasurementPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  value: Int;
}

export interface MeasurementPreviousValuesPromise
  extends Promise<MeasurementPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  value: () => Promise<Int>;
}

export interface MeasurementPreviousValuesSubscription
  extends Promise<AsyncIterator<MeasurementPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  value: () => Promise<AsyncIterator<Int>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Measurement",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
export const prisma = new Prisma();
