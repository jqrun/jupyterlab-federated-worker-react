import React, { FunctionComponent, useEffect } from 'react';

export const WorkerComponent: FunctionComponent = () => {
  useEffect(() => {
    const worker = new Worker(
      new URL('./worker', (import.meta as { url: string }).url)
    );
    console.log('worker created', worker);
    worker.postMessage('Hello worker!');
  }, []);

  return <>Worker Component</>;
};
