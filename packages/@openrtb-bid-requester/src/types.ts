import type {
  BidRequest as BidRequestV25,
  BidResponse as BidResponseV25,
} from "iab-openrtb/v25";
import type {
  BidRequest as BidRequestV26,
  BidResponse as BidResponseV26,
} from "iab-openrtb/v26";
import type { Openrtb } from "iab-openrtb/v30";

export type BidRequesterOptions = {
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
};

export type OpenRTBClientSettings = {
  headers: HeadersInit;
  cache: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
};

export interface IBidRequester {
  requestV25(
    url: string,
    bidRequest: BidRequestV25,
    options?: BidRequesterOptions
  ): Promise<BidResponseV25>;
  requestV26(
    url: string,
    bidRequest: BidRequestV26,
    options?: BidRequesterOptions
  ): Promise<BidResponseV26>;
  requestV30(
    url: string,
    openrtb: Openrtb,
    options?: BidRequesterOptions
  ): Promise<Openrtb>;
}

export type ExceptionType =
  | "InvalidBidRequest"
  | "NoBidResponse"
  | "Unexpected";

export type OpenRTBVersion = "2.5" | "2.6" | "3.0";
