# @openrtb/bid-requester

Typescript bid requester library compliant with OpenRTB 2.5/2.6/3.0

## Features

- 🎯 Full TypeScript type definitions support
- 📝 Compliant with OpenRTB
- 🛠️ Support for ESM and CommonJS
- ⚡ Can be used without instantiation
- 🧪 Test-friendly interface

## Usage

### Basic Usage

```typescript
import { bidRequester } from "@openrtb/bid-requester";
import { BidRequest, BidResponse } from "iab-openrtb/v26";

const bidRequest: BidRequest = {
  id: "bid-request-1",
  imp: [
    {
      id: "1",
      banner: {
        w: 300,
        h: 250,
      },
    },
  ],
};

const bidResponse = await bidRequester.requestV26(
  "https://example.com/endpoint",
  bidRequest,
  {
    headers: {
      Token: "auth-token",
    },
  }
);
```

### Version specific Bid Requests

```typescript
const bidResponseV25 = await bidRequester.requestV25(
  "https://example.com/v25",
  bidRequestV25
);
const bidResponseV26 = await bidRequester.requestV26(
  "https://example.com/v26",
  bidRequestV26
);
const bidResponseV30 = await bidRequester.requestV30(
  "https://example.com/v30",
  bidRequestV30
);
```

### Exception

```typescript
import {
  BidRequesterException
} from "@openrtb/bid-requester";

try {
  const bidResponse = await bidRequester.requestV26(
    "https://example.com/endpoint",
    bidRequest
  );
} catch (error) {
  if (error instanceof BidRequesterException) {
    // error handling...
    if (error.type === 'InvalidBidRequest') {

    } else if (error.type === 'NoBidResponse') {

    } else {

    }
}

// exception types...
type ExceptionType =
  | "InvalidBidRequest"
  | "NoBidResponse"
  | "Unexpected";
```

### Mock

Test-friendly interface available

```typescript
import { IBidRequester } from "@openrtb/bid-requester";

const bidRequesterMock = mock<IBidRequester>();
```

### Options

If you want to change from OpenRTB recommended data encoding and data format, you can use options.

Available options:

```typescript
export type BidRequesterOptions = {
  headers?: HeadersInit; // custom headers
  cache?: RequestCache; // no-store, default, no-cache... (defaults to no-store)
  credentials?: RequestCredentials; // include, omit, same-origin...
  mode?: RequestMode; // same-origin, cors, no-cors...
};
```

Usage:

```typescript
import { BidRequester } from "@openrtb/bid-requester";
import { BidRequest, BidResponse } from "iab-openrtb/v26";

// Common options
const bidRequester = new BidRequester({
  headers: {
    "Accept-Encoding": "*",
  },
});

const bidRequest: BidRequest = {
  id: "bid-request-1",
  imp: [
    {
      id: "1",
      banner: {
        w: 300,
        h: 250,
      },
    },
  ],
};

const bidResponse = await bidRequester.requestV26(
  "https://example.com/endpoint",
  bidRequest,
  {
    // Specific options
    headers: {
      Token: "auth-token",
    },
  }
);
```

## License

[MIT License](./LICENSE)
