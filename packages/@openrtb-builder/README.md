# @openrtb/builder

TypeScript builder library for constructing OpenRTB 2.6 bid requests and responses.

## Features

- 🛠️ Fluent builder pattern for OpenRTB 2.6 objects
- 🎯 Full TypeScript type definitions support
- 🔄 Intuitive object constructing using method chaining
- 📝 Compliance with OpenRTB 2.6 specifications
- ⚡ Support for ESM and CommonJS
- 🔑 Automatic ID parameter generation using UUID

## Usage

### Basic Usage

```typescript
import { BidRequestBuilder } from "@openrtb/builder/v26";

const bidRequest = new BidRequestBuilder()
  .withTimeout(500)
  .addImp({ id: "imp1", banner: { w: 300, h: 250 } })
  .build();
```

```typescript
import { BidResponseBuilder } from "@openrtb/builder/v26";

const bidResponse = new BidResponseBuilder()
  .beginSeatBid("seat1")
  .addBannerBid({
    adm: "<creative>",
    impid: "imp-id",
    price: 2.0,
  })
  .build();
```

### Constructing a Bid Request

```typescript
const builder = new BidRequestBuilder()
  .withId("request-id")
  .withTimeout(500)
  .withCurrency(["USD"])
  .withSite({
    id: "site1",
    domain: "example.com",
  });

// Add an impression
builder.addImp({
  banner: {
    w: 300,
    h: 250,
  },
});

const request = builder.build();
```

### Constructing a Bid Response

```typescript
const builder = new BidResponseBuilder()
  .withId("response-id")
  .withCurrency("USD")
  .withBidId("bid-1");

// Add a seat bid and its bid
builder
  .beginSeatBid("seat1")
  .withCommonBid({
    adomain: ["advertiser.com"],
    cat: ["IAB1"],
  })
  .addBannerBid({
    adm: "<creative>",
    impid: "imp-id",
    price: 2.0,
  })
  .addVideoBid({
    adm: "<VAST>",
    impid: "imp-id",
    price: 2.0,
  });

const response = builder.build();
```

### Adding Custom Behavior Using the Decorator Pattern

This library supports the Decorator Pattern to extend functionality. Using decorators, you can customize the builder`s behavior is various ways.

- Add custom parameters for DSP/AdExchange/SSP
- Convert to specific formats
- Add validation rules
- Implement logging and monitoring capabilities

```typescript
import { BidRequestBuilderDecorator } from "@openrtb/builder/v26";

class DV360BidRequestDecorator extends BidRequestBuilderDecorator {
  public withExt(ext: Record<string, unknown>): this {
    return super.withExt({
      ...ext,
      google: {
        billing_id: "123456789",
        publisher_id: "pub-1234567890",
      },
    });
  }

  public addImp(props?: Partial<ImpV26>): this {
    return super.addImp({
      ...props,
      ext: {
        ...props?.ext,
        google: {
          slot_visibility: "ABOVE_THE_FOLD",
        },
      },
    });
  }
}

const dv360Builder = new DV360BidRequestDecorator(new BidRequestBuilder());
const dv360Request = dv360Builder
  .withId("request-1")
  .withSite({
    id: "site1",
    domain: "example.com",
  })
  .addImp({
    banner: {
      w: 300,
      h: 250,
    },
  })
  .build();
```

## API Documents

For detailed API documentation, please refer to [API.md](./API.md).

## Dependencies

- [iab-openrtb](https://github.com/hogekai/types-iab-openrtb): OpenRTB Type definitions
- [uuid](https://www.npmjs.com/package/uuid): uuid generation

## License

[MIT License](LICENCE)