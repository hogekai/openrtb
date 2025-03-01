# OpenRTB/Auction Macro Replacer

TypeScript macro replacer library compliant with OpenRTB 2.6/3.0.

## Features

- 🎯 Support for both OpenRTB 3.0 and Auction 2.x macro formats
- 📝 Version-specific macro handling
- 🛠️ Safe handling of undefined/null values
- ⚡ Type-safe context management

## Usage

```typescript
import { MacroReplacer } from "@openrtb/macro-replacer";

// Create a new instance with initial context
const replacer = new MacroReplacer({
  id: "auction123",
  price: 10.5,
  currency: "USD",
});

// Replace macros in a string
const result = replacer.replace(
  "Auction ${OPENRTB_ID}: ${OPENRTB_PRICE} ${OPENRTB_CURRENCY}"
);
// Output: "Auction auction123: 10.5 USD"

// Update context values
replacer.updateContext({ price: 15.0 });

// Get supported macros
const macros = replacer.getSupportedMacros();
```

## Version-specific Usage

You can create version-specific instances that only support macros for either OpenRTB 3.0 or Auction 2.x:

```typescript
// OpenRTB 3.0 only
const openrtbReplacer = new MacroReplacer({}, "3");

// Auction 2.x only
const auctionReplacer = new MacroReplacer({}, "2");
```

## Supported Macros

### Common Macros (Both Versions)

- `${OPENRTB_ID}` / `${AUCTION_ID}`: Auction identifier
- `${OPENRTB_BID_ID}` / `${AUCTION_BID_ID}`: Bid identifier
- `${OPENRTB_ITEM_ID}` / `${AUCTION_IMP_ID}`: Item/Impression identifier
- `${OPENRTB_SEAT_ID}` / `${AUCTION_SEAT_ID}`: Seat identifier
- `${OPENRTB_PRICE}` / `${AUCTION_PRICE}`: Clearing price
- `${OPENRTB_CURRENCY}` / `${AUCTION_CURRENCY}`: Currency
- `${OPENRTB_MBR}` / `${AUCTION_MBR}`: Market Bid Ratio
- `${OPENRTB_LOSS}` / `${AUCTION_LOSS}`: Loss reason code
- `${OPENRTB_MIN_TO_WIN}` / `${AUCTION_MIN_TO_WIN}`: Minimum price to win

### OpenRTB 3.0 Specific

- `${OPENRTB_MEDIA_ID}`: Media identifier
- `${OPENRTB_ITEM_QTY}`: Item quantity

### Auction 2.x Specific

- `${AUCTION_AD_ID}`: Ad identifier
- `${AUCTION_MULTIPLIER}`: Price multiplier
- `${AUCTION_IMP_TS}`: Impression timestamp

## Error Handling

The library handles missing context values gracefully by replacing them with empty strings. Invalid macros are left unchanged in the output string.

## TypeScript Support

The library is written in TypeScript and includes type definitions. Context values are type-safe through the `MacroContext` interface.

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.
