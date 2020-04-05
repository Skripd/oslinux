export type Maybe<T> = T | null;

export interface MeasurementWhereInput {
  /** Logical AND on all given filters. */
  AND?: Maybe<MeasurementWhereInput[]>;

  id?: Maybe<string>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<string>;
  /** All values that are contained in given list. */
  id_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  id_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<string>;
  /** All values greater than the given value. */
  id_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<string>;
  /** All values containing the given string. */
  id_contains?: Maybe<string>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<string>;

  createdAt?: Maybe<DateTime>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<DateTime>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<DateTime[]>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<DateTime[]>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<DateTime>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<DateTime>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<DateTime>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<DateTime>;

  value?: Maybe<number>;
  /** All values that are not equal to given value. */
  value_not?: Maybe<number>;
  /** All values that are contained in given list. */
  value_in?: Maybe<number[]>;
  /** All values that are not contained in given list. */
  value_not_in?: Maybe<number[]>;
  /** All values less than the given value. */
  value_lt?: Maybe<number>;
  /** All values less than or equal the given value. */
  value_lte?: Maybe<number>;
  /** All values greater than the given value. */
  value_gt?: Maybe<number>;
  /** All values greater than or equal the given value. */
  value_gte?: Maybe<number>;
}

export interface MeasurementWhereUniqueInput {
  id?: Maybe<string>;
}

export interface MeasurementCreateInput {
  id?: Maybe<string>;

  value: number;
}

export interface MeasurementUpdateInput {
  value?: Maybe<number>;
}

export interface MeasurementUpdateManyMutationInput {
  value?: Maybe<number>;
}

export interface MeasurementSubscriptionWhereInput {
  /** Logical AND on all given filters. */
  AND?: Maybe<MeasurementSubscriptionWhereInput[]>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  mutation_in?: Maybe<MutationType[]>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  updatedFields_contains?: Maybe<string>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  updatedFields_contains_every?: Maybe<string[]>;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  updatedFields_contains_some?: Maybe<string[]>;

  node?: Maybe<MeasurementWhereInput>;
}

export enum MeasurementOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC",
  ValueAsc = "value_ASC",
  ValueDesc = "value_DESC"
}

export enum MutationType {
  Created = "CREATED",
  Updated = "UPDATED",
  Deleted = "DELETED"
}

export type DateTime = any;

/** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
export type Long = any;

// ====================================================
// Documents
// ====================================================

export namespace GetLastMeasurements {
  export type Variables = {
    last: number;
  };

  export type Query = {
    __typename?: "Query";

    measurements: (Maybe<Measurements>)[];
  };

  export type Measurements = {
    __typename?: "Measurement";

    createdAt: DateTime;

    value: number;
  };
}

export namespace GetMeasurementCount {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    measurementsConnection: MeasurementsConnection;
  };

  export type MeasurementsConnection = {
    __typename?: "MeasurementConnection";

    aggregate: Aggregate;
  };

  export type Aggregate = {
    __typename?: "AggregateMeasurement";

    count: number;
  };
}

export namespace GetPage {
  export type Variables = {
    before?: Maybe<string>;
    from: number;
    to: number;
  };

  export type Query = {
    __typename?: "Query";

    measurements: (Maybe<Measurements>)[];
  };

  export type Measurements = {
    __typename?: "Measurement";

    id: string;

    value: number;

    createdAt: DateTime;
  };
}

export namespace SubscribeToNewMeasurements {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";

    measurement: Maybe<Measurement>;
  };

  export type Measurement = {
    __typename?: "MeasurementSubscriptionPayload";

    node: Maybe<Node>;
  };

  export type Node = {
    __typename?: "Measurement";

    id: string;

    createdAt: DateTime;

    value: number;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class GetLastMeasurementsGQL extends Apollo.Query<
  GetLastMeasurements.Query,
  GetLastMeasurements.Variables
> {
  document: any = gql`
    query getLastMeasurements($last: Int!) {
      measurements(last: $last) {
        createdAt
        value
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetMeasurementCountGQL extends Apollo.Query<
  GetMeasurementCount.Query,
  GetMeasurementCount.Variables
> {
  document: any = gql`
    query getMeasurementCount {
      measurementsConnection {
        aggregate {
          count
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetPageGQL extends Apollo.Query<GetPage.Query, GetPage.Variables> {
  document: any = gql`
    query getPage($before: String, $from: Int!, $to: Int!) {
      measurements(before: $before, skip: $from, last: $to) {
        id
        value
        createdAt
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class SubscribeToNewMeasurementsGQL extends Apollo.Subscription<
  SubscribeToNewMeasurements.Subscription,
  SubscribeToNewMeasurements.Variables
> {
  document: any = gql`
    subscription subscribeToNewMeasurements {
      measurement {
        node {
          id
          createdAt
          value
        }
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
