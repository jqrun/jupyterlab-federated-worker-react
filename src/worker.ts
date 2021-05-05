import React from 'react';

console.log('worker loaded');

self.onmessage = (event: MessageEvent) => {
  console.log('worker onmessage', event);
  console.log('React test', React.isValidElement({}));
};
