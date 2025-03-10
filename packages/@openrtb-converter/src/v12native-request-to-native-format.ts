import type { Imp } from "iab-openrtb/v26";
import type { Converter } from "./converter";
import type { NativeRequest } from "iab-native";
import type { NativeFormat } from "iab-adcom/placement";
import type { AssetFormat, VideoPlacement } from "iab-adcom/placement";
import type { Asset as V12Asset, VideoRequest } from "iab-native";
import type { AudioVideoCreativeSubtype } from "iab-adcom";

export class V12NativeRequestToNativeFormatConverter
  implements Converter<NativeRequest, NativeFormat>
{
  public to(from: NativeRequest): NativeFormat {
    return {
      asset: this.convertAssetsToAssetFormats(from.assets),
    };
  }

  private convertAssetsToAssetFormats(assets: V12Asset[]): AssetFormat[] {
    return assets.map((asset) => {
      return {
        id: asset.id,
        req: asset.required,
        title: asset.title,
        img: asset.img,
        data: asset.data,
        video: asset.video
          ? this.convertV12VideoToVideoPlacement(asset.video)
          : undefined,
      };
    });
  }

  private convertV12VideoToVideoPlacement(video: VideoRequest): VideoPlacement {
    return {
      mime: video.mimes,
      ctype: video.protocols as AudioVideoCreativeSubtype[],
      maxdur: video.maxduration,
      mindur: video.minduration,
    };
  }

  public from(to: NativeFormat): NativeRequest {
    return {
      assets: this.convertAssetFormatsToAssets(to.asset),
      ver: "1.2",
    };
  }

  private convertAssetFormatsToAssets(assetFormats: AssetFormat[]): V12Asset[] {
    return assetFormats.map((assetFormat) => {
      const asset: V12Asset = {
        id: assetFormat.id,
        required: assetFormat.req,
      };

      if (assetFormat.title) {
        asset.title = assetFormat.title;
      }

      if (assetFormat.img) {
        asset.img = assetFormat.img;
      }

      if (assetFormat.data) {
        asset.data = assetFormat.data;
      }

      if (assetFormat.video) {
        asset.video = this.convertVideoPlacementToV12Video(assetFormat.video);
      }

      return asset;
    });
  }

  private convertVideoPlacementToV12Video(
    videoPlacement: VideoPlacement
  ): VideoRequest {
    return {
      mimes: videoPlacement.mime,
      protocols: videoPlacement.ctype as number[],
      maxduration: videoPlacement.maxdur || 500,
      minduration: videoPlacement.mindur || 0,
    };
  }
}
