import type { CurrencyConversionData } from "./types";

export class CurrencyConverter {
  constructor(private readonly conversionData: CurrencyConversionData) {}

  convert(amount: number, from: string, to: string): number {
    if (from === to) return amount;

    const conversions = this.conversionData.conversions;

    if (conversions[from]?.[to]) {
      return amount * conversions[from][to];
    }

    if (conversions[to]?.[from]) {
      return amount * (1 / conversions[to][from]);
    }

    const usdRate = this.getUSDRate(from);
    const targetRate = this.getUSDRate(to);

    if (usdRate && targetRate) {
      return amount * (targetRate / usdRate);
    }

    return amount;
  }

  private getUSDRate(currency: string): number | null {
    const conversions = this.conversionData.conversions;

    if (currency === "USD") return 1;
    if (conversions["USD"]?.[currency]) return conversions["USD"][currency];
    if (conversions[currency]?.["USD"]) return 1 / conversions[currency]["USD"];

    return null;
  }
}
