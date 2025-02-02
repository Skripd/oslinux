#!/usr/bin/env python

from graphqlclient import GraphQLClient

value = '5d839b9be03dd80007cd7ef1'

def main():
    client = GraphQLClient('http://192.166.178.5:4466')

    query = "query { measurement(where: {id: \"%s\"}) { value }}" % (value)
#    result = client.execute(query)
    result = client.execute('''
    query {
      measurement(where: {
        id: \"%s\"
      }) {
        value
      }
    }
        ''' % (value))

    print(result)


if __name__ == '__main__':
    main()
