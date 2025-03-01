import type { Bid as V26Bid } from "iab-openrtb/v26";
import type { Converter } from "./converter";
import type { Ad } from "iab-adcom/media";
import { v4 } from "uuid";
import { V26BidToDisplayConverter } from "./v26bid-to-display-converter";
import { V26BidToNativeConverter } from "./v26bid-to-native-converter";
import type { CategoryTaxonomy, CreativeAttribute } from "iab-adcom";

export class V26BidToAdConverter implements Converter<Partial<V26Bid>, Ad> {
  public to(from: Partial<V26Bid>) {
    const ad: Ad = {
      id: from.adid || v4(),
      adomain: from.adomain,
      bundle: from.bundle ? [from.bundle] : [],
      iurl: from.iurl,
      cat: from.cat,
      cattax: from.cattax,
      lang: from.language,
      attr: from.attr,
    };

    if (from.mtype === 1) {
      const converter = new V26BidToDisplayConverter();
      const display = converter.to(from);
      ad.display = display;
    } else if (from.mtype === 4) {
      const converter = new V26BidToNativeConverter();
      const native = converter.to(from);
      ad.display = {
        native: native,
      };
    }

    return ad;
  }

  public from(to: Ad) {
    let bid: Partial<V26Bid> = {
      adid: to.id,
      adomain: to.adomain,
      bundle: to.bundle ? to.bundle[0] : undefined,
      iurl: to.iurl,
      cat: to.cat,
      cattax: to.cattax as CategoryTaxonomy,
      language: to.lang,
      attr: to.attr as CreativeAttribute[],
    };

    if (to.display?.native) {
      const converter = new V26BidToNativeConverter();
      bid.adm = converter.from(to).adm;
    } else if (to.display) {
      const converter = new V26BidToDisplayConverter();
      bid = {
        ...bid,
        ...converter.from(to),
      };
    }

    return bid;
  }
}
