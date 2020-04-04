/// <reference lib="webworker" />

import { QueryDayDTO } from './.models/DTOS.model';
import { IDTOWebWorker } from './.models/DTOS.internal.model';

addEventListener('message', ({ data }) => {
  const start = new Date().getMilliseconds();
  const _in = data as QueryDayDTO;
  const aggregrateSize = Math.floor(_in.measurementsConnection.aggregate.count / 100);
  let aggregrator = 0;
  let counter = 0;

  const d: number[] = [];
  const l: string[] = [];
  _in.measurementsConnection.edges.forEach(({ node }) => {
        counter++;
        aggregrator += node.value;

        if (counter === aggregrateSize) {
          d.push(Math.floor(aggregrator / aggregrateSize));
          l.push(`${new Date(node.createdAt).toLocaleTimeString()}`);
          counter = 0;
          aggregrator = 0;
        }
      });

  // const response = `worker response to ${data}`;
  const response: IDTOWebWorker = {data: d, labels: l};
  console.log(`TIME::${new Date().getMilliseconds() - start}`);
  postMessage(response);
});
