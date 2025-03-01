import { uuid } from "@/libraries/uuid";
import { type IBidRequestBuilder } from "./interface";
import type {
  App,
  BidRequest,
  Device,
  DOOH,
  Geo,
  Imp,
  Regs,
  Site,
  Source,
  User,
} from "iab-openrtb/v26";

/**
 * Builder for creating OpenRTB 2.6 BidRequest objects
 */
export class BidRequestBuilder implements IBidRequestBuilder {
  private request: Partial<BidRequest>;
  private commonImpProps: Partial<Imp> = {};

  public constructor() {
    this.request = {
      id: uuid(),
      imp: [],
    };
  }

  public reset(): this {
    const newInstance = new BidRequestBuilder();
    Object.assign(this, newInstance);
    return this;
  }

  /**
   * Sets the ID of the bid request
   */
  public withId(id: string): this {
    this.request.id = id;
    return this;
  }

  /**
   * Adds an impression to the bid request
   */
  public addImp(props: Partial<Imp> = {}): this {
    const newImp: Imp = {
      id: uuid(),
      ...props,
    };

    if (!this.request.imp) {
      this.request.imp = [];
    }
    this.request.imp.push(newImp);
    return this;
  }

  /**
   * Sets the site object
   */
  public withSite(site: Partial<Site>): this {
    this.request.site = {
      ...this.request.site,
      ...site,
    };
    return this;
  }

  /**
   * Sets the app object
   */
  public withApp(app: Partial<App>): this {
    this.request.app = {
      ...this.request.app,
      ...app,
    };
    return this;
  }

  /**
   * Sets the DOOH object
   */
  public withDOOH(dooh: Partial<DOOH>): this {
    this.request.dooh = {
      ...this.request.dooh,
      ...dooh,
    };
    return this;
  }

  /**
   * Sets the device object
   */
  public withDevice(device: Partial<Device>): this {
    this.request.device = {
      ...this.request.device,
      ...device,
    };
    return this;
  }

  /**
   * Sets the user object
   */
  public withUser(user: Partial<User>): this {
    this.request.user = {
      ...this.request.user,
      ...user,
    };
    return this;
  }

  /**
   * Sets the test mode flag
   */
  public withTest(test: 0 | 1): this {
    this.request.test = test;
    return this;
  }

  /**
   * Sets the auction type
   */
  public withAuctionType(at: number): this {
    this.request.at = at;
    return this;
  }

  /**
   * Sets the maximum time in milliseconds for receiving bids
   */
  public withTimeout(tmax: number): this {
    this.request.tmax = tmax;
    return this;
  }

  /**
   * Sets the allowed list of buyer seats
   */
  public withWhitelistedSeats(wseat: string[]): this {
    this.request.wseat = wseat;
    return this;
  }

  /**
   * Sets the block list of buyer seats
   */
  public withBlockedSeats(bseat: string[]): this {
    this.request.bseat = bseat;
    return this;
  }

  /**
   * Sets the all impressions flag
   */
  public withAllImps(allimps: 0 | 1): this {
    this.request.allimps = allimps;
    return this;
  }

  /**
   * Sets the allowed currencies
   */
  public withCurrencies(cur: string[]): this {
    this.request.cur = cur;
    return this;
  }

  /**
   * Sets the allowed languages using ISO-639-1-alpha-2
   */
  public withLanguages(wlang: string[]): this {
    this.request.wlang = wlang;
    return this;
  }

  /**
   * Sets the allowed languages using IETF BCP 47
   */
  public withLanguagesBCP47(wlangb: string[]): this {
    this.request.wlangb = wlangb;
    return this;
  }

  /**
   * Sets the allowed advertiser categories
   */
  public withAllowedCategories(acat: string[]): this {
    this.request.acat = acat;
    return this;
  }

  /**
   * Sets the blocked advertiser categories
   */
  public withBlockedCategories(bcat: string[]): this {
    this.request.bcat = bcat;
    return this;
  }

  /**
   * Sets the category taxonomy
   */
  public withCategoryTaxonomy(cattax: number): this {
    this.request.cattax = cattax;
    return this;
  }

  /**
   * Sets the blocked advertiser domains
   */
  public withBlockedAdvertisers(badv: string[]): this {
    this.request.badv = badv;
    return this;
  }

  /**
   * Sets the blocked applications
   */
  public withBlockedApps(bapp: string[]): this {
    this.request.bapp = bapp;
    return this;
  }

  /**
   * Sets the source object
   */
  public withSource(source: Source): this {
    this.request.source = source;
    return this;
  }

  /**
   * Sets the regulations object
   */
  public withRegulations(regs: Regs): this {
    this.request.regs = regs;
    return this;
  }

  /**
   * Sets extension data
   */
  public withExt(ext: Record<string, unknown>): this {
    this.request.ext = {
      ...this.request.ext,
      ...ext,
    };
    return this;
  }

  public withGeo(geo: Partial<Geo>): this {
    this.request.device = {
      geo: {
        ...this.request.device?.geo,
        ...geo,
      },
    };

    return this;
  }

  /**
   * Sets common properties for all impressions
   */
  public withCommonImp(props: Partial<Imp>): this {
    this.commonImpProps = {
      ...this.commonImpProps,
      ...props,
      ...(props.banner && {
        banner: { ...this.commonImpProps.banner, ...props.banner },
      }),
      ...(props.video && {
        video: { ...this.commonImpProps.video, ...props.video },
      }),
      ...(props.native && {
        native: { ...this.commonImpProps.native, ...props.native },
      }),
    };

    return this;
  }

  /**
   * Builds and returns the final BidRequest object
   */
  public build(): BidRequest {
    return (this.request = {
      ...this.request,
      imp: (this.request.imp || []).map((imp) => ({
        ...this.commonImpProps,
        ...imp,
      })),
    } as BidRequest);
  }
}
