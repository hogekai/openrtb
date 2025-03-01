import type { Bid } from "iab-openrtb/v26";

export interface BidInformation {
  currency: string;
  version: string;
  seat?: string;
}

export interface CurrencyRates {
  /** ISO 4217 Currency Code (Example: USD, JPY, EUR) */
  [currency: string]: number;
}

interface ConversionRates {
  /** convert rate of base currency */
  [baseCurrency: string]: CurrencyRates;
}

export interface CurrencyConversionData {
  dataAsOf: string;
  generatedAt: string;
  conversions: ConversionRates;
}

export interface BidScoringStrategy {
  score(bid: Bid, context: BidScoringContext): Promise<number>;
}

export interface BidScoringContext {
  bidInfo: BidInformation;
  currencyConversion?: CurrencyConversionData;
  targetCurrency?: string; 
}

export interface AuctionOptions {
  lossProcessing?: boolean;
  currencyConversionData?: CurrencyConversionData;
  scoringStrategy?: BidScoringStrategy;
  targetCurrency?: string;
}
