import { MacroReplacer } from "@openrtb/macro-replacer";
import { DefaultPriceScoringStrategy } from "./scoring-strategy/price-scoring-strategy";
import type {
  AuctionOptions,
  BidInformation,
  BidScoringStrategy,
} from "./types";
import type { Bid } from "iab-openrtb/v26";

export class Auction {
  private readonly bids: Map<string, Bid> = new Map();
  private readonly bidInfo: WeakMap<Bid, BidInformation> = new WeakMap();
  private winner?: Bid;
  private status: "open" | "closed" = "open";
  private readonly macroReplacer: MacroReplacer;
  private readonly scoringStrategy: BidScoringStrategy;

  constructor(
    private readonly itemIds: string[],
    private readonly options: AuctionOptions = {}
  ) {
    this.scoringStrategy =
      options.scoringStrategy || new DefaultPriceScoringStrategy();
    this.macroReplacer = new MacroReplacer({});
  }

  public placeBid(bid: Bid, bidInfo: BidInformation): void {
    if (this.status !== "open") {
      throw new Error("Auction is closed");
    }
    if (!this.itemIds.includes(bid.impid)) {
      throw new Error("Invalid impression ID");
    }

    this.bids.set(bid.id, bid);
    this.bidInfo.set(bid, bidInfo);
  }

  public async end(): Promise<Bid> {
    if (this.status !== "open") {
      throw new Error("Auction already ended");
    }
    if (this.bids.size === 0) {
      throw new Error("No bids placed");
    }

    this.status = "closed";
    this.winner = await this.selectWinner();
    this.processLosingBids();

    return this.winner;
  }

  private async selectWinner(): Promise<Bid> {
    let highestScore = -Infinity;
    let winner: Bid | undefined;

    for (const bid of this.bids.values()) {
      const bidInfo = this.bidInfo.get(bid);
      if (!bidInfo) continue;

      const score = await this.scoringStrategy.score(bid, {
        bidInfo,
        currencyConversion: this.options.currencyConversionData,
        targetCurrency: this.options.targetCurrency,
      });

      if (score > highestScore) {
        highestScore = score;
        winner = bid;
      }
    }

    if (!winner) {
      throw new Error("Failed to select winner");
    }

    return winner;
  }

  private processLosingBids(): void {
    if (!this.winner || !this.options.lossProcessing) return;

    const winningPrice = this.winner.price;
    const macroContext = {
      price: winningPrice,
      minToWin: winningPrice + 0.01,
      loss: 102,
    };

    for (const [id, bid] of this.bids) {
      if (id !== this.winner.id && bid.lurl) {
        const processedUrl = this.macroReplacer.replace(bid.lurl, {
          ...macroContext,
          itemId: bid.impid,
          seatId: this.bidInfo.get(bid)?.seat
        });
        this.sendLossNotification(processedUrl);
      }
    }
  }

  private async sendLossNotification(url: string): Promise<void> {
    try {
      await fetch(url, { keepalive: true });
    } catch (error) {
      console.error("Failed to send loss notification:", error);
    }
  }
}
