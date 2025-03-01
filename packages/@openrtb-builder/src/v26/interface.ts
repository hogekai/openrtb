import type {
  App,
  Bid,
  BidRequest,
  BidResponse,
  Device,
  DOOH,
  Geo,
  Imp,
  NoBidReasonCode,
  Regs,
  Site,
  Source,
  User,
} from "iab-openrtb/v26";

export interface IBidRequestBuilder {
  withId(id: string): this;
  addImp(props?: Partial<Imp>): this;
  withSite(site: Partial<Site>): this;
  withApp(app: Partial<App>): this;
  withDOOH(dooh: Partial<DOOH>): this;
  withDevice(device: Partial<Device>): this;
  withUser(user: Partial<User>): this;
  withTest(test: 0 | 1): this;
  withAuctionType(at: number): this;
  withTimeout(tmax: number): this;
  withWhitelistedSeats(wseat: string[]): this;
  withBlockedSeats(bseat: string[]): this;
  withAllImps(allimps: 0 | 1): this;
  withCurrencies(cur: string[]): this;
  withLanguages(wlang: string[]): this;
  withLanguagesBCP47(wlangb: string[]): this;
  withAllowedCategories(acat: string[]): this;
  withBlockedCategories(bcat: string[]): this;
  withCategoryTaxonomy(cattax: number): this;
  withBlockedAdvertisers(badv: string[]): this;
  withBlockedApps(bapp: string[]): this;
  withSource(source: Source): this;
  withRegulations(regs: Regs): this;
  withExt(ext: Record<string, unknown>): this;
  withCommonImp(props: Partial<Imp>): this;
  withGeo(geo: Partial<Geo>): this;
  build(): BidRequest;
  reset(): this;
}

/**
 * Interface for OpenRTB 2.6 BidResponse builder
 */
export interface IBidResponseBuilder {
  withId(id: string): this;
  withBidId(bidid: string): this;
  withCurrency(cur: string): this;
  withCustomData(customdata: string): this;
  withNoBidReason(nbr: NoBidReasonCode): this;
  withExtension(ext: Record<string, unknown>): this;
  beginSeatBid(seat?: string): this;
  withCommonBid(props: Partial<Bid>): this;
  withGroup(group: 0 | 1): this;
  addBid(props: Partial<Bid> & { impid: string; price: number }): this;
  addBannerBid(props: Partial<Bid> & { impid: string; price: number }): this;
  addAudioBid(props: Partial<Bid> & { impid: string; price: number }): this;
  addVideoBid(props: Partial<Bid> & { impid: string; price: number }): this;
  addNativeBid(props: Partial<Bid> & { impid: string; price: number }): this;
  build(): BidResponse;
  reset(): this;
}
