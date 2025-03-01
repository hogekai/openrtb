import type { MacroContext } from "./types";

export class MacroReplacer {
  private readonly macroMap: Map<string, (context: MacroContext) => string>;
  private context: MacroContext;
  private version: "3" | "2" | "both" = "both";

  constructor(
    initialContext: Partial<MacroContext> = {},
    version: "3" | "2" | "both" = "both"
  ) {
    this.context = initialContext;
    this.version = version;
    this.macroMap = this.initializeMacroMap();
  }

  private initializeMacroMap(): Map<string, (context: MacroContext) => string> {
    const map = new Map<string, (context: MacroContext) => string>();

    const getValue = (value: any) => value?.toString() ?? "";

    const commonMacros = {
      "${OPENRTB_ID}": (ctx: MacroContext) => getValue(ctx.id),
      "${OPENRTB_BID_ID}": (ctx: MacroContext) => getValue(ctx.bidId),
      "${OPENRTB_ITEM_ID}": (ctx: MacroContext) => getValue(ctx.itemId),
      "${OPENRTB_SEAT_ID}": (ctx: MacroContext) => getValue(ctx.seatId),
      "${OPENRTB_PRICE}": (ctx: MacroContext) => getValue(ctx.price),
      "${OPENRTB_CURRENCY}": (ctx: MacroContext) => getValue(ctx.currency),
      "${OPENRTB_MBR}": (ctx: MacroContext) => getValue(ctx.mbr),
      "${OPENRTB_LOSS}": (ctx: MacroContext) => getValue(ctx.loss),
      "${OPENRTB_MIN_TO_WIN}": (ctx: MacroContext) => getValue(ctx.minToWin),

      "${AUCTION_ID}": (ctx: MacroContext) => getValue(ctx.id),
      "${AUCTION_BID_ID}": (ctx: MacroContext) => getValue(ctx.bidId),
      "${AUCTION_IMP_ID}": (ctx: MacroContext) => getValue(ctx.itemId),
      "${AUCTION_SEAT_ID}": (ctx: MacroContext) => getValue(ctx.seatId),
      "${AUCTION_PRICE}": (ctx: MacroContext) => getValue(ctx.price),
      "${AUCTION_CURRENCY}": (ctx: MacroContext) => getValue(ctx.currency),
      "${AUCTION_MBR}": (ctx: MacroContext) => getValue(ctx.mbr),
      "${AUCTION_LOSS}": (ctx: MacroContext) => getValue(ctx.loss),
      "${AUCTION_MIN_TO_WIN}": (ctx: MacroContext) => getValue(ctx.minToWin),
    };

    const versionSpecificMacros = {
      openrtb: {
        "${OPENRTB_MEDIA_ID}": (ctx: MacroContext) => getValue(ctx.mediaId),
        "${OPENRTB_ITEM_QTY}": (ctx: MacroContext) => getValue(ctx.itemQty),
      },
      auction: {
        "${AUCTION_AD_ID}": (ctx: MacroContext) => getValue(ctx.adId),
        "${AUCTION_MULTIPLIER}": (ctx: MacroContext) =>
          getValue(ctx.multiplier),
        "${AUCTION_IMP_TS}": (ctx: MacroContext) => getValue(ctx.impTs),
      },
    };

    if (this.version === "both" || this.version === "3") {
      Object.entries(commonMacros).forEach(([macro, fn]) => {
        if (macro.startsWith("${OPENRTB_")) map.set(macro, fn);
      });
    }
    if (this.version === "both" || this.version === "2") {
      Object.entries(commonMacros).forEach(([macro, fn]) => {
        if (macro.startsWith("${AUCTION_")) map.set(macro, fn);
      });
    }

    if (this.version === "both" || this.version === "3") {
      Object.entries(versionSpecificMacros.openrtb).forEach(([macro, fn]) =>
        map.set(macro, fn)
      );
    }
    if (this.version === "both" || this.version === "2") {
      Object.entries(versionSpecificMacros.auction).forEach(([macro, fn]) =>
        map.set(macro, fn)
      );
    }

    return map;
  }

  /**
   * Update the context with new values
   */
  public updateContext(newContext: Partial<MacroContext>): void {
    this.context = { ...this.context, ...newContext };
  }

  /**
   * Replace macros in the input string
   */
  public replace(input: string, context?: Partial<MacroContext>): string {
    let result = input;
    for (const [macro, replacer] of this.macroMap) {
      try {
        const value = replacer({ ...this.context, ...context });
        result = result.replace(
          new RegExp(macro.replace(/\$/g, "\\$"), "g"),
          value
        );
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error replacing macro ${macro}: ${error.message}`);
        }
      }
    }
    return result;
  }

  /**
   * Get supported macro names for current version
   */
  public getSupportedMacros(): string[] {
    return Array.from(this.macroMap.keys());
  }

  /**
   * Get current context values
   */
  public getContext(): MacroContext {
    return { ...this.context };
  }
}
