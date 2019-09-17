# oslinux project

## Client
The oslinux client is written in typescript (https://www.typescriptlang.org/) and uses Angular (https://angular.io).

Clarity (https://clarity.design) is used as a thirdparty component framework. It looks good and is easy to use.

## Server
The oslinux server is written in typescript, runs on nodejs and uses the NestJS framework (https://nestjs.com).

Nestjs enables structured nodejs backend development similar to how Angular provides structure for developing frontend. NestJS has many features and support for REST, Websockets, GraphQL, GRPC, Redis and many other things out of the box.

The backend uses nodejs process spawner to launch python script that interface with the raspberry pi.

The backend uses a mini API to interface with Hue Lighting.