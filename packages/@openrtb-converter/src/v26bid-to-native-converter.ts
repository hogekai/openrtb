import type { Bid } from "iab-openrtb/v26";
import type { Converter } from "./converter";
import type {
  Asset,
  DataAsset,
  ImageAsset,
  LinkAsset,
  Native,
  TitleAsset,
  VideoAsset,
} from "iab-adcom/media";
import type {
  AssetResponse,
  DataResponse,
  ImageAssetType,
  ImageResponse,
  NativeResponse,
  TitleResponse,
  VideoResponse,
} from "iab-native/v12";
import type { LinkResponse } from "iab-native";

export class V26BidToNativeConverter implements Converter<Partial<Bid>, Native> {
  public to(from: Partial<Bid>): Native {
    const nativeResponse: NativeResponse = JSON.parse(from.adm || "{}");
    return {
      link: this.convertLink(nativeResponse.link),
      asset:
        nativeResponse.assets?.map((asset) => this.convertAsset(asset)) || [],
    };
  }

  public from(to: Native): Partial<Bid> {
    if (!to?.link) {
      throw new Error("Link is required.");
    }

    const nativeResponse: NativeResponse = {
      link: this.convertLinkToResponse(to.link),
      assets:
        to.asset?.map((asset) => this.convertAssetToResponse(asset)) || [],
    };

    return {
      adm: JSON.stringify(nativeResponse),
    } as Bid;
  }

  private convertLink(link: LinkResponse): LinkAsset {
    return {
      url: link.url,
      urlfb: link.fallback,
      trkr: link.clicktrackers,
    };
  }

  private convertAsset(asset: AssetResponse): Asset {
    const result: Asset = {
      id: asset.id,
      req: asset.required === 1 ? 1 : 0,
    };

    if (asset.title) {
      result.title = this.convertTitle(asset.title);
    }

    if (asset.img) {
      result.image = this.convertImage(asset.img);
    }

    if (asset.data) {
      result.data = this.convertData(asset.data);
    }

    if (asset.video) {
      result.video = this.convertVideo(asset.video);
    }

    if (asset.link) {
      result.link = this.convertLink(asset.link);
    }

    return result;
  }

  private convertTitle(title: TitleResponse): TitleAsset {
    return {
      text: title.text,
      len: title.len,
    };
  }

  private convertImage(image: ImageResponse): ImageAsset {
    return {
      url: image.url,
      w: image.w,
      h: image.h,
      type: image.type,
    };
  }

  private convertData(data: DataResponse): DataAsset {
    return {
      value: data.value,
      len: data.len,
      type: data.type,
    };
  }

  private convertLinkToResponse(link: LinkAsset): LinkResponse {
    return {
      url: link.url,
      fallback: link.urlfb,
      clicktrackers: link.trkr,
    };
  }

  private convertVideo(video: VideoResponse): VideoAsset {
    return {
      adm: video.vasttag,
    };
  }

  private convertAssetToResponse(asset: Asset): AssetResponse {
    const result: AssetResponse = {
      id: asset.id,
      required: asset.req === 1 ? 1 : 0,
    };

    if (asset.title) {
      result.title = this.convertTitleToResponse(asset.title);
    }

    if (asset.image) {
      result.img = this.convertImageToResponse(asset.image);
    }

    if (asset.data) {
      result.data = this.convertDataToResponse(asset.data);
    }

    if (asset.video) {
      result.video = this.convertVideoToResponse(asset.video);
    }

    return result;
  }

  private convertTitleToResponse(title: TitleAsset): TitleResponse {
    return {
      text: title.text,
      len: title.len,
    };
  }

  private convertImageToResponse(image: ImageAsset): ImageResponse {
    return {
      url: image.url,
      w: image.w,
      h: image.h,
      type: image.type as ImageAssetType,
    };
  }

  private convertDataToResponse(data: DataAsset): DataResponse {
    return {
      value: data.value,
      len: data.len,
      type: data.type,
    };
  }

  private convertVideoToResponse(video: VideoAsset): VideoResponse {
    return {
      vasttag: video.adm || "",
    };
  }
}
