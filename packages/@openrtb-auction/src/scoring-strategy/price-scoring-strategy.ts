import type { Bid } from "iab-openrtb/v26";
import type {
  BidScoringContext,
  BidScoringStrategy,
} from "../types";
import { CurrencyConverter } from "../currency-converter";

export class DefaultPriceScoringStrategy implements BidScoringStrategy {
  public async score(bid: Bid, context: BidScoringContext): Promise<number> {
    if (!context.bidInfo.currency || !context.currencyConversion) {
      return bid.price;
    }

    const targetCurrency = context.targetCurrency || "USD";
    const converter = new CurrencyConverter(context.currencyConversion);

    return converter.convert(
      bid.price,
      context.bidInfo.currency,
      targetCurrency
    );
  }
}
