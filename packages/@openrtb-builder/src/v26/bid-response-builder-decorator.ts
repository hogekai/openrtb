import type { IBidResponseBuilder } from "./interface";
import type { BidResponse, Bid, NoBidReasonCode} from "iab-openrtb/v26";

/**
 * Abstract base decorator class for BidResponseBuilder
 */
export abstract class BidResponseBuilderDecorator
  implements IBidResponseBuilder
{
  protected constructor(protected readonly builder: IBidResponseBuilder) {}

  public withId(id: string): this {
    this.builder.withId(id);
    return this;
  }

  public withBidId(bidid: string): this {
    this.builder.withBidId(bidid);
    return this;
  }

  public withCurrency(cur: string): this {
    this.builder.withCurrency(cur);
    return this;
  }

  public withCustomData(customdata: string): this {
    this.builder.withCustomData(customdata);
    return this;
  }

  public withNoBidReason(nbr: NoBidReasonCode): this {
    this.builder.withNoBidReason(nbr);
    return this;
  }

  public withExtension(ext: Record<string, unknown>): this {
    this.builder.withExtension(ext);
    return this;
  }

  public beginSeatBid(seat?: string): this {
    this.builder.beginSeatBid(seat);
    return this;
  }

  public withCommonBid(props: Partial<Bid>): this {
    this.builder.withCommonBid(props);
    return this;
  }

  public withGroup(group: 0 | 1): this {
    this.builder.withGroup(group);
    return this;
  }

  public addBid(props: Partial<Bid> & { impid: string; price: number }): this {
    this.builder.addBid(props);
    return this;
  }

  public addBannerBid(
    props: Partial<Bid> & { impid: string; price: number }
  ): this {
    this.builder.addBannerBid(props);
    return this;
  }

  public addAudioBid(
    props: Partial<Bid> & { impid: string; price: number }
  ): this {
    this.builder.addAudioBid(props);
    return this;
  }

  public addVideoBid(
    props: Partial<Bid> & { impid: string; price: number }
  ): this {
    this.builder.addVideoBid(props);
    return this;
  }

  public addNativeBid(
    props: Partial<Bid> & { impid: string; price: number }
  ): this {
    this.builder.addNativeBid(props);
    return this;
  }

  public build(): BidResponse {
    return this.builder.build();
  }

  public reset(): this {
    this.builder.reset();
    return this;
  }
}
