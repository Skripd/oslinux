import gql from 'graphql-tag';

export const QUERY_PAGED = gql`
query($before: String, $from: Int, $to: Int) {
  measurements(before: $before, skip: $from, last: $to) {
    id
    createdAt
    value
  }
}
`;

export const QUERY_COUNT = gql`
query {
  measurementsConnection {
    aggregate {
      count
    }
  }
}
`;

export const MEASUREMENT_SUBSCRIPTION = gql`
subscription {
  measurement {
    node {
      id
      createdAt
      value
    }
  }
}
`;

export const QUERY_DAY = gql`
query($startDate: DateTime!, $endDate: DateTime!) {
	measurementsConnection(where: {
    AND: [
      {
        createdAt_gte: $startDate
      },
      {
        createdAt_lte: $endDate
      }
    ]
  }) {
    aggregate {
      count
    },
    edges {
      node {
        createdAt
        value
      }
    }
  }
}
`;
