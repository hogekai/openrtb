import type { Display } from "iab-adcom/media";
import type { Converter } from "./converter";
import type { Bid as V26Bid } from "iab-openrtb/v26";

export class V26BidToDisplayConverter
  implements Converter<Partial<V26Bid>, Display>
{
  public to(from: Partial<V26Bid>) {
    return {
      api: from.apis?.[0],
      w: from.w,
      h: from.h,
      wratio: from.wratio,
      hratio: from.hratio,
      adm: from.adm,
    };
  }

  public from(to: Display) {
    return {
      adm: to.adm,
      apis: to?.api ? [to.api] : [],
      w: to.w,
      h: to.h,
      wratio: to.wratio,
      hratio: to.hratio,
    };
  }
}
