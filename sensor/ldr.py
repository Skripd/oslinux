#!/usr/bin/env python
import spidev
import time

from graphqlclient import GraphQLClient

#Define Variables
delay = 2
ldr_channel = 0
#value = '5d839b9be03dd80007cd7ef1'

#Create SPI
spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz=1000000

#Create GraphQL client
client = GraphQLClient('http://192.168.178.5:4466')

    # read SPI data from the MCP3008, 8 channels in total
def readadc(adcnum):
    if adcnum > 7 or adcnum < 0:
        return -1
    r = spi.xfer2([1, (8 + adcnum) << 4, 0])
    data = ((r[1] & 3) << 8) + r[2]
    #print(data)
    return data

def writeToDB(value):
    query = "query { measurement(where: {id: \"%s\"}) { value }}" % (value)
#    result = client.execute(query)
    result = client.execute('''
    mutation {
      createMeasurement(data: {
        value: %d
      }) {
        id
      }
    }
        ''' % (1000 - value))
    print(result)
    return result


def main():
  while True:
    ldr_value = readadc(ldr_channel)
    r = writeToDB(ldr_value)
#    print("LDR Value: %d" % ldr_value)
    #print(r)
    time.sleep(delay)



if __name__ == '__main__':
    main()

