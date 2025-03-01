export type Version = "3" | "2" | "both";
export type MacroReplacerFn = (context: MacroContext) => string;

export interface MacroContext {
  id?: string; // Common request ID
  bidId?: string; // Common bid ID
  itemId?: string; // Common item/imp ID
  seatId?: string; // Common seat ID
  price?: number; // Common price
  currency?: string; // Common currency
  mbr?: number; // Common market bid ratio
  loss?: number; // Common loss reason
  minToWin?: number; // Common minimum to win

  // Version specific fields
  mediaId?: string; // OpenRTB: bid.mid
  itemQty?: number; // OpenRTB: item.qty
  adId?: string; // Auction: bid.adid
  multiplier?: number; // Auction: multiplier
  impTs?: number; // Auction: impression timestamp
}
