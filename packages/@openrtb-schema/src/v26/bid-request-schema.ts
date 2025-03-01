import {
  AgentType,
  APIFramework,
  AudioVideoCreativeSubtype,
  AutoRefreshTrigger,
  CategoryTaxonomy,
  CompanionType,
  ConnectionType,
  ContentContext,
  CreativeAttribute,
  DeliveryMethod,
  DeviceType,
  DOOHMultiplierMeasurementSourceType,
  DOOHVenueTaxonomy,
  ExpandableDirection,
  FeedType,
  IDMatchMethod,
  IPLocationService,
  LinearityMode,
  LocationType,
  MediaRating,
  PlacementPosition,
  PlaybackCessationMode,
  PlaybackMethod,
  PodDeduplicationSetting,
  ProductionQuality,
  SlotPosition,
  StartDelayMode,
  UserAgentSource,
  VideoPlacementSubtype,
  VolumeNormalizationMode,
} from "iab-adcom";
import { z } from "zod";

export const regsSchema = z.object({
  coppa: z.union([z.literal(0), z.literal(1)]).optional(),
  gdpr: z.union([z.literal(0), z.literal(1)]).optional(),
  us_privacy: z.string().optional(),
  gpp: z.string().optional(),
  gpp_sid: z.array(z.number()).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const metricSchema = z.object({
  type: z.string(),
  value: z.number(),
  vendor: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const formatSchema = z.object({
  w: z.number().optional(),
  h: z.number().optional(),
  wratio: z.number().optional(),
  hratio: z.number().optional(),
  wmin: z.number().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const dealSchema = z.object({
  id: z.string(),
  bidfloor: z.number().optional(),
  bidfloorcur: z.string().optional(),
  at: z.number().optional(),
  wseat: z.array(z.string()).optional(),
  wadomain: z.array(z.string()).optional(),
  guar: z.union([z.literal(0), z.literal(1)]).optional(),
  mincpmpersec: z.number().optional(),
  durfloors: z.array(z.record(z.unknown())).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const networkSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  domain: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const channelSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  domain: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const supplyChainNodeSchema = z.object({
  asi: z.string(),
  sid: z.string(),
  rid: z.string().optional(),
  name: z.string().optional(),
  domain: z.string().optional(),
  hp: z.union([z.literal(0), z.literal(1)]).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const brandVersionSchema = z.object({
  brand: z.string().optional(),
  version: z.array(z.string()).optional(),
});

export const segmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const durFloorsSchema = z.object({
  mindur: z.number().optional(),
  maxdur: z.number().optional(),
  bidfloor: z.number().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const supplyChainSchema = z.object({
  complete: z.union([z.literal(0), z.literal(1)]),
  nodes: z.array(supplyChainNodeSchema),
  ver: z.string(),
  ext: z.record(z.unknown()).optional(),
});

export const bannerSchema = z.object({
  format: z.array(formatSchema).optional(),
  w: z.number().optional(),
  h: z.number().optional(),
  btype: z.array(z.number()).optional(),
  battr: z.array(z.nativeEnum(CreativeAttribute)).optional(),
  pos: z.nativeEnum(PlacementPosition).optional(),
  mimes: z.array(z.string()).optional(),
  topframe: z.union([z.literal(0), z.literal(1)]).optional(),
  expdir: z.array(z.nativeEnum(ExpandableDirection)).optional(),
  api: z.array(z.nativeEnum(APIFramework)).optional(),
  id: z.string().optional(),
  vcm: z.union([z.literal(0), z.literal(1)]).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const videoSchema = z.object({
  mimes: z.array(z.string()),
  minduration: z.number().optional(),
  maxduration: z.number().optional(),
  startdelay: z.nativeEnum(StartDelayMode).optional(),
  maxseq: z.number().optional(),
  poddur: z.number().optional(),
  protocols: z.array(z.nativeEnum(AudioVideoCreativeSubtype)).optional(),
  w: z.number().optional(),
  h: z.number().optional(),
  podid: z.string().optional(),
  podseq: z.number().optional(),
  rqddurs: z.array(z.number()).optional(),
  plcmt: z.nativeEnum(VideoPlacementSubtype).optional(),
  linearity: z.nativeEnum(LinearityMode).optional(),
  skip: z.union([z.literal(0), z.literal(1)]).optional(),
  skipmin: z.number().optional(),
  skipafter: z.number().optional(),
  slotinpod: z.nativeEnum(SlotPosition).optional(),
  mincpmpersec: z.number().optional(),
  battr: z.array(z.nativeEnum(CreativeAttribute)).optional(),
  maxextended: z.number().optional(),
  minbitrate: z.number().optional(),
  maxbitrate: z.number().optional(),
  boxingallowed: z.union([z.literal(0), z.literal(1)]).optional(),
  playbackmethod: z.array(z.nativeEnum(PlaybackMethod)).optional(),
  playbackend: z.nativeEnum(PlaybackCessationMode).optional(),
  delivery: z.array(z.nativeEnum(DeliveryMethod)).optional(),
  pos: z.nativeEnum(PlacementPosition).optional(),
  companionad: z.array(bannerSchema).optional(),
  api: z.array(z.nativeEnum(APIFramework)).optional(),
  companiontype: z.array(z.nativeEnum(CompanionType)).optional(),
  poddedupe: z.array(z.nativeEnum(PodDeduplicationSetting)).optional(),
  durfloors: z.array(z.record(z.unknown())).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const audioSchema = z.object({
  mimes: z.array(z.string()),
  minduration: z.number().optional(),
  maxduration: z.number().optional(),
  poddur: z.number().optional(),
  protocols: z.array(z.nativeEnum(AudioVideoCreativeSubtype)).optional(),
  startdelay: z.nativeEnum(StartDelayMode).optional(),
  rqddurs: z.array(z.number()).optional(),
  podid: z.string().optional(),
  podseq: z.number().optional(),
  slotinpod: z.nativeEnum(SlotPosition).optional(),
  mincpmpersec: z.number().optional(),
  battr: z.array(z.nativeEnum(CreativeAttribute)).optional(),
  maxextended: z.number().optional(),
  minbitrate: z.number().optional(),
  maxbitrate: z.number().optional(),
  delivery: z.array(z.nativeEnum(DeliveryMethod)).optional(),
  companionad: z.array(bannerSchema).optional(),
  api: z.array(z.nativeEnum(APIFramework)).optional(),
  companiontype: z.array(z.nativeEnum(CompanionType)).optional(),
  maxseq: z.number().optional(),
  feed: z.nativeEnum(FeedType).optional(),
  stitched: z.union([z.literal(0), z.literal(1)]).optional(),
  nvol: z.nativeEnum(VolumeNormalizationMode).optional(),
  durfloors: z.array(z.record(z.unknown())).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const nativeSchema = z.object({
  request: z.string(),
  ver: z.string().optional(),
  api: z.array(z.nativeEnum(APIFramework)).optional(),
  battr: z.array(z.nativeEnum(CreativeAttribute)).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const pmpSchema = z.object({
  private_auction: z.union([z.literal(0), z.literal(1)]).optional(),
  deals: z.array(dealSchema).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const geoSchema = z.object({
  lat: z.number().optional(),
  lon: z.number().optional(),
  type: z.nativeEnum(LocationType).optional(),
  accuracy: z.number().optional(),
  lastfix: z.number().optional(),
  ipservice: z.nativeEnum(IPLocationService).optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  regionfips104: z.string().optional(),
  metro: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  utcoffset: z.number().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const userAgentSchema = z.object({
  browsers: z.array(brandVersionSchema).optional(),
  platform: brandVersionSchema.optional(),
  mobile: z.union([z.literal(0), z.literal(1)]).optional(),
  architecture: z.string().optional(),
  bitness: z.string().optional(),
  model: z.string().optional(),
  source: z.nativeEnum(UserAgentSource).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const dataSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  segment: z.array(segmentSchema).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const publisherSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  cattax: z.nativeEnum(CategoryTaxonomy).optional(),
  cat: z.array(z.string()).optional(),
  domain: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const appSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  bundle: z.string().optional(),
  domain: z.string().optional(),
  storeurl: z.string().optional(),
  cattax: z.nativeEnum(CategoryTaxonomy).optional(),
  cat: z.array(z.string()).optional(),
  sectioncat: z.array(z.string()).optional(),
  pagecat: z.array(z.string()).optional(),
  ver: z.string().optional(),
  privacypolicy: z.union([z.literal(0), z.literal(1)]).optional(),
  paid: z.union([z.literal(0), z.literal(1)]).optional(),
  publisher: publisherSchema.optional(),
  content: z.record(z.unknown()).optional(),
  keywords: z.string().optional(),
  kwarray: z.array(z.string()).optional(),
  inventorypartnerdomain: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const producerSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  cattax: z.nativeEnum(CategoryTaxonomy).optional(),
  cat: z.array(z.string()).optional(),
  domain: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const uidSchema = z.object({
  id: z.string(),
  atype: z.nativeEnum(AgentType).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const qtySchema = z.object({
  multiplier: z.number(),
  sourcetype: z.nativeEnum(DOOHMultiplierMeasurementSourceType).optional(),
  vendor: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const contentSchema = z.object({
  id: z.string().optional(),
  episode: z.number().optional(),
  title: z.string().optional(),
  series: z.string().optional(),
  season: z.string().optional(),
  artist: z.string().optional(),
  genre: z.string().optional(),
  album: z.string().optional(),
  isrc: z.string().optional(),
  producer: producerSchema.optional(),
  url: z.string().optional(),
  cattax: z.nativeEnum(CategoryTaxonomy).optional(),
  cat: z.array(z.string()).optional(),
  prodq: z.nativeEnum(ProductionQuality).optional(),
  context: z.nativeEnum(ContentContext).optional(),
  contentrating: z.string().optional(),
  userrating: z.string().optional(),
  qagmediarating: z.nativeEnum(MediaRating).optional(),
  keywords: z.string().optional(),
  kwarray: z.array(z.string()).optional(),
  livestream: z.union([z.literal(0), z.literal(1)]).optional(),
  sourcerelationship: z.union([z.literal(0), z.literal(1)]).optional(),
  len: z.number().optional(),
  language: z.string().optional(),
  langb: z.string().optional(),
  embeddable: z.union([z.literal(0), z.literal(1)]).optional(),
  data: z.array(dataSchema).optional(),
  network: networkSchema.optional(),
  channel: channelSchema.optional(),
  ext: z.record(z.unknown()).optional(),
});

export const refSettingsSchema = z.object({
  reftype: z.nativeEnum(AutoRefreshTrigger).optional(),
  minint: z.number().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const impSchema = z.object({
  id: z.string(),
  metric: z.array(metricSchema).optional(),
  banner: bannerSchema.optional(),
  video: videoSchema.optional(),
  audio: audioSchema.optional(),
  native: nativeSchema.optional(),
  pmp: pmpSchema.optional(),
  displaymanager: z.string().optional(),
  displaymanagerver: z.string().optional(),
  instl: z.union([z.literal(0), z.literal(1)]).optional(),
  tagid: z.string().optional(),
  bidfloor: z.number().optional(),
  bidfloorcur: z.string().optional(),
  clickbrowser: z.union([z.literal(0), z.literal(1)]).optional(),
  secure: z.union([z.literal(0), z.literal(1)]).optional(),
  iframebuster: z.array(z.string()).optional(),
  rwdd: z.union([z.literal(0), z.literal(1)]).optional(),
  ssai: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .optional(),
  exp: z.number().optional(),
  qty: z.record(z.unknown()).optional(),
  dt: z.number().optional(),
  refresh: z.record(z.unknown()).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const siteSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  domain: z.string().optional(),
  cattax: z.nativeEnum(CategoryTaxonomy).optional(),
  cat: z.array(z.string()).optional(),
  sectioncat: z.array(z.string()).optional(),
  pagecat: z.array(z.string()).optional(),
  page: z.string().optional(),
  ref: z.string().optional(),
  search: z.string().optional(),
  mobile: z.union([z.literal(0), z.literal(1)]).optional(),
  privacypolicy: z.union([z.literal(0), z.literal(1)]).optional(),
  publisher: publisherSchema.optional(),
  content: z.record(z.unknown()).optional(),
  keywords: z.string().optional(),
  kwarray: z.array(z.string()).optional(),
  inventorypartnerdomain: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const doohSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  venuetype: z.array(z.string()).optional(),
  venuetypetax: z.nativeEnum(DOOHVenueTaxonomy).optional().default(1),
  publisher: publisherSchema.optional(),
  domain: z.string().optional(),
  keywords: z.string().optional(),
  content: contentSchema.optional(),
  ext: z.record(z.unknown()).optional(),
});

export const deviceSchema = z.object({
  geo: geoSchema.optional(),
  dnt: z.union([z.literal(0), z.literal(1)]).optional(),
  lmt: z.union([z.literal(0), z.literal(1)]).optional(),
  ua: z.string().optional(),
  sua: userAgentSchema.optional(),
  ip: z.string().optional(),
  ipv6: z.string().optional(),
  devicetype: z.nativeEnum(DeviceType).optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  os: z.string().optional(),
  osv: z.string().optional(),
  hwv: z.string().optional(),
  h: z.number().optional(),
  w: z.number().optional(),
  ppi: z.number().optional(),
  pxratio: z.number().optional(),
  js: z.union([z.literal(0), z.literal(1)]).optional(),
  geofetch: z.union([z.literal(0), z.literal(1)]).optional(),
  flashver: z.string().optional(),
  language: z.string().optional(),
  langb: z.string().optional(),
  carrier: z.string().optional(),
  mccmnc: z.string().optional(),
  connectiontype: z.nativeEnum(ConnectionType).optional(),
  ifa: z.string().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const sourceSchema = z.object({
  fd: z.union([z.literal(0), z.literal(1)]).optional(),
  tid: z.string().optional(),
  pchain: z.string().optional(),
  schain: supplyChainSchema.optional(),
  ext: z.record(z.unknown()).optional(),
});

export const eidSchema = z.object({
  inserter: z.string().optional(),
  source: z.string(),
  matcher: z.string().optional(),
  mm: z.nativeEnum(IDMatchMethod).optional(),
  uids: z.array(uidSchema),
  ext: z.record(z.unknown()).optional(),
});

export const refreshSchema = z.object({
  refsettings: z.array(refSettingsSchema).optional(),
  count: z.number().optional(),
  ext: z.record(z.unknown()).optional(),
});

export const userSchema = z.object({
  id: z.string().optional(),
  buyeruid: z.string().optional(),
  keywords: z.string().optional(),
  kwarray: z.array(z.string()).optional(),
  customdata: z.string().optional(),
  geo: geoSchema.optional(),
  data: z.array(dataSchema).optional(),
  consent: z.string().optional(),
  eids: z.array(eidSchema).optional(),
  ext: z.record(z.unknown()).optional(),
});

export const bidRequestSchema = z.object({
  id: z.string(),
  imp: z.array(impSchema),
  site: siteSchema.optional(),
  app: appSchema.optional(),
  dooh: doohSchema.optional(),
  device: deviceSchema.optional(),
  user: userSchema.optional(),
  test: z
    .union([z.literal(0), z.literal(1)])
    .optional()
    .default(0),
  at: z.number().optional().default(2),
  tmax: z.number().optional(),
  wseat: z.array(z.string()).optional(),
  bseat: z.array(z.string()).optional(),
  allimps: z
    .union([z.literal(0), z.literal(1)])
    .optional()
    .default(0),
  cur: z.array(z.string()).optional(),
  wlang: z.array(z.string()).optional(),
  wlangb: z.array(z.string()).optional(),
  acat: z.array(z.string()).optional(),
  bcat: z.array(z.string()).optional(),
  cattax: z.number().optional().default(1),
  badv: z.array(z.string()).optional(),
  bapp: z.array(z.string()).optional(),
  source: sourceSchema.optional(),
  regs: regsSchema.optional(),
  ext: z.record(z.unknown()).optional(),
});
