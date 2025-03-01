import { BidRequesterException } from "./exception";
import type { BidRequesterOptions, OpenRTBClientSettings } from "./types";

export class OpenRTBClient {
  private url: string;
  private settings: OpenRTBClientSettings;

  public constructor(
    url: string,
    version: string,
    options?: BidRequesterOptions
  ) {
    this.url = url;
    this.settings = {
      cache: options?.cache ? options.cache : "no-store",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
        "x-openrtb-version": version,
        ...options?.headers,
      },
      credentials: options?.credentials,
      mode: options?.mode,
    };
  }

  public async request<Req, Res>(bidRequest: Req): Promise<Res> {
    try {
      let init: any = {
        method: "POST",
        body: JSON.stringify(bidRequest),
        cache: this.settings.cache,
        headers: this.settings.headers,
        mode: this.settings.mode,
        credentials: this.settings.credentials,
      };

      const httpResponse = await fetch(this.url, init);

      if (httpResponse.status === 200) {
        return httpResponse.json() as Res;
      } else if (httpResponse.status === 204) {
        throw new BidRequesterException(
          "No bid response received from the auction.",
          "NoBidResponse"
        );
      } else if (httpResponse.status === 400) {
        throw new BidRequesterException(
          (await httpResponse.text()) ||
            "required parameters are missing or malformed.",
          "InvalidBidRequest"
        );
      } else {
        throw new BidRequesterException(
          `Unexpected HTTP response: received status code ${httpResponse.status}`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new BidRequesterException("Unexpected error");
      }
    }
  }
}
