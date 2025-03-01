import type { IBidRequestBuilder } from "./interface";
import type {
  BidRequest,
  Site,
  Device,
  User,
  Source,
  Regs,
  Imp,
  App,
  DOOH,
} from "iab-openrtb/v26";
import type { Geo } from "iab-openrtb/v26";

/**
 * Abstract base decorator class for BidRequestBuilder
 */
export abstract class BidRequestBuilderDecorator implements IBidRequestBuilder {
  protected constructor(protected readonly builder: IBidRequestBuilder) {}

  public withId(id: string): this {
    this.builder.withId(id);
    return this;
  }

  public addImp(props?: Partial<Imp>): this {
    this.builder.addImp(props);
    return this;
  }

  public withSite(site: Partial<Site>): this {
    this.builder.withSite(site);
    return this;
  }

  public withApp(app: Partial<App>): this {
    this.builder.withApp(app);
    return this;
  }

  public withDOOH(dooh: Partial<DOOH>): this {
    this.builder.withDOOH(dooh);
    return this;
  }

  public withDevice(device: Partial<Device>): this {
    this.builder.withDevice(device);
    return this;
  }

  public withUser(user: Partial<User>): this {
    this.builder.withUser(user);
    return this;
  }

  public withTest(test: 0 | 1): this {
    this.builder.withTest(test);
    return this;
  }

  public withAuctionType(at: number): this {
    this.builder.withAuctionType(at);
    return this;
  }

  public withTimeout(tmax: number): this {
    this.builder.withTimeout(tmax);
    return this;
  }

  public withWhitelistedSeats(wseat: string[]): this {
    this.builder.withWhitelistedSeats(wseat);
    return this;
  }

  public withBlockedSeats(bseat: string[]): this {
    this.builder.withBlockedSeats(bseat);
    return this;
  }

  public withAllImps(allimps: 0 | 1): this {
    this.builder.withAllImps(allimps);
    return this;
  }

  public withCurrencies(cur: string[]): this {
    this.builder.withCurrencies(cur);
    return this;
  }

  public withLanguages(wlang: string[]): this {
    this.builder.withLanguages(wlang);
    return this;
  }

  public withLanguagesBCP47(wlangb: string[]): this {
    this.builder.withLanguagesBCP47(wlangb);
    return this;
  }

  public withAllowedCategories(acat: string[]): this {
    this.builder.withAllowedCategories(acat);
    return this;
  }

  public withBlockedCategories(bcat: string[]): this {
    this.builder.withBlockedCategories(bcat);
    return this;
  }

  public withCategoryTaxonomy(cattax: number): this {
    this.builder.withCategoryTaxonomy(cattax);
    return this;
  }

  public withBlockedAdvertisers(badv: string[]): this {
    this.builder.withBlockedAdvertisers(badv);
    return this;
  }

  public withBlockedApps(bapp: string[]): this {
    this.builder.withBlockedApps(bapp);
    return this;
  }

  public withSource(source: Source): this {
    this.builder.withSource(source);
    return this;
  }

  public withRegulations(regs: Regs): this {
    this.builder.withRegulations(regs);
    return this;
  }

  public withExt(ext: Record<string, unknown>): this {
    this.builder.withExt(ext);
    return this;
  }

  public withCommonImp(props: Partial<Imp>): this {
    this.builder.withCommonImp(props);
    return this;
  }

  public withGeo(geo: Partial<Geo>): this {
    this.builder.withGeo(geo);
    return this;
  }

  public build(): BidRequest {
    return this.builder.build();
  }

  public reset(): this {
    this.builder.reset();
    return this;
  }
}
