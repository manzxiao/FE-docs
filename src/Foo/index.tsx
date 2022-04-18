import React from 'react';

import { getParameters } from 'codesandbox/lib/api/define';

const pj = {
  dependencies: {
    typescript: '4.6.2',
  },
  description: 'TypeScript playground exported Sandbox',
  name: 'TypeScript Playground Export',
  version: '0.0.0',
};

const tj = {
  compilerOptions: {
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    strictBindCallApply: true,
    noImplicitThis: true,
    noImplicitReturns: true,
    alwaysStrict: true,
    esModuleInterop: true,
    declaration: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    target: 'ES2017',
    jsx: 'react',
    module: 'ESNext',
    moduleResolution: 'node',
  },
};

const parameters = getParameters({
  files: {
    'index.ts': {
      content: "console.log('hello')",
      isBinary: false,
    },
    'package.json': { content: pj as any, isBinary: false },
    'tsconfig.json': { content: tj as any, isBinary: false },
  },
});

const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
console.info(url);

export default ({ title }: { title: string }) => <h1>{title}</h1>;
