#!/usr/bin/env python

from graphqlclient import GraphQLClient

value = 100

def main():
    client = GraphQLClient('http://localhost:4466')

    query = "query { measurement(where: {id: \"%s\"}) { value }}" % (value)
#    result = client.execute(query)
    while True:
      result = client.execute('''
        mutation {
          createMeasurement(data: {
            value: %s
          }) {
            value
          }
      }
        ''' % (value))
      print(result)

if __name__ == '__main__':
    main()
