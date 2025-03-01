import {
  APIFramework,
  AudioVideoCreativeSubtype,
  CategoryTaxonomy,
  CreativeAttribute,
  MediaRating,
  SlotPosition,
} from "iab-adcom";
import { NoBidReasonCode } from "iab-openrtb/v26";
import { z } from "zod";

export const bidSchema = z.object({
  id: z.string(),
  impid: z.string(),
  price: z.number(),
  nurl: z.string().optional(),
  burl: z.string().optional(),
  lurl: z.string().optional(),
  adm: z.string().optional(),
  adid: z.string().optional(),
  adomain: z.array(z.string()).optional(),
  bundle: z.string().optional(),
  iurl: z.string().optional(),
  cid: z.string().optional(),
  crid: z.string().optional(),
  tactic: z.string().optional(),
  cattax: z.nativeEnum(CategoryTaxonomy).optional(),
  cat: z.array(z.string()).optional(),
  attr: z.array(z.nativeEnum(CreativeAttribute)).optional(),
  apis: z.array(z.nativeEnum(APIFramework)).optional(),
  protocol: z.nativeEnum(AudioVideoCreativeSubtype).optional(),
  qagmediarating: z.nativeEnum(MediaRating).optional(),
  language: z.string().optional(),
  langb: z.string().optional(),
  dealid: z.string().optional(),
  w: z.number().optional(),
  h: z.number().optional(),
  wratio: z.number().optional(),
  hratio: z.number().optional(),
  exp: z.number().optional(),
  dur: z.number().optional(),
  mtype: z.number().optional(),
  slotinpod: z.nativeEnum(SlotPosition).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const seatBidSchema = z.object({
  bid: z.array(bidSchema),
  seat: z.string().optional(),
  group: z.union([z.literal(0), z.literal(1)]).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const bidResponseSchema = z.object({
  id: z.string(),
  seatbid: z.array(seatBidSchema).optional(),
  bidid: z.string().optional(),
  cur: z.string().optional(),
  customdata: z.string().optional(),
  nbr: z.nativeEnum(NoBidReasonCode).optional(),
  ext: z.record(z.unknown()).optional(),
});
