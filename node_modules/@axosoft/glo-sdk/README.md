# GitKraken Glo JavaScript SDK

![](https://img.shields.io/github/license/Axosoft/glo-sdk.svg?style=flat)
[![Build Status](https://travis-ci.org/Axosoft/glo-sdk.svg?branch=master)](https://travis-ci.org/Axosoft/glo-sdk)
![](https://img.shields.io/bundlephobia/min/@axosoft/glo-sdk.svg?label=size&style=flat)
![](https://img.shields.io/npm/dt/@axosoft/glo-sdk.svg?style=flat)

GitKraken Glo API [documentation](https://gloapi.gitkraken.com/v1/docs)

## How to Use

### Install

npm:
```
npm install -S @axosoft/glo-sdk
```
yarn
```
yarn add @axosoft/glo-sdk
```

### Example Usage

You must pass in an auth token. All method calls return a promise, so you should properly handle errors with a .catch or a try/catch block if using async/await.

```javascript
// Import options
const GloSDK = require('@axosoft/glo-sdk');
import GloSDK from '@axosoft/glo-sdk';


// Usage
GloSDK(authToken).boards.getAll()
  .then(boards => console.log(boards))
  .catch(error => console.error(error));

try {
  const boards = await GloSDK(authToken).boards.getAll();
} catch (error) {
  console.log(error);
}
```
