import { describe, it, expect } from "vitest";
import { BidResponseBuilder } from "@/v26";

describe("Bid Response Builder", () => {
  describe("top level parameters", () => {
    it.each([
      {
        method: "withId",
        value: "test-id",
        expectedKey: "id",
        expectedValue: "test-id",
      },
      {
        method: "withBidId",
        value: "bid-id-1",
        expectedKey: "bidid",
        expectedValue: "bid-id-1",
      },
      {
        method: "withCurrency",
        value: "JPY",
        expectedKey: "cur",
        expectedValue: "JPY",
      },
      {
        method: "withCustomData",
        value: "custom-value",
        expectedKey: "customdata",
        expectedValue: "custom-value",
      },
      {
        method: "withNoBidReason",
        value: 2,
        expectedKey: "nbr",
        expectedValue: 2,
      },
      {
        method: "withExtension",
        value: { custom: "value" },
        expectedKey: "ext",
        expectedValue: { custom: "value" },
      },
    ])(
      //$method で指定した値 $value が $expectedKey に設定される
      "sets $expectedKey to $value when $method is specified as $value",
      ({ method, value, expectedKey, expectedValue }) => {
        const sut = new BidResponseBuilder() as any;
        sut[method](value);
        const result = sut.build();
        expect(result[expectedKey]).toEqual(expectedValue);
      }
    );
  });

  describe("control seatbid and bid", () => {
    it("makes new seatbid with `beginSeatBid`", () => {
      const builder = new BidResponseBuilder()
        .beginSeatBid("seat1")
        .addBid({ impid: "imp1", price: 1.0 });

      const result = builder.build();
      expect(result.seatbid).toHaveLength(1);
      expect(result.seatbid![0].seat).toBe("seat1");
    });

    it("sets group flag with `withGroup`", () => {
      const builder = new BidResponseBuilder()
        .beginSeatBid()
        .withGroup(1)
        .addBid({ impid: "imp1", price: 1.0 });

      const result = builder.build();
      expect(result.seatbid![0].group).toBe(1);
    });

    it("`withCommonBid` is applied all bid when build process", () => {
      const sut = new BidResponseBuilder()
        .beginSeatBid()
        .addBid({ impid: "imp1", price: 1.0 })
        .addBid({ impid: "imp2", price: 2.0 })
        .withCommonBid({ price: 1 });

      const result = sut.build();
      const bids = result.seatbid![0].bid;
      expect(bids[0].price).toBe(1);
      expect(bids[1].price).toBe(1);
    });

    it("`withCommonBid` is applied to multiple seatbid", () => {
      const builder = new BidResponseBuilder()
        .withCommonBid({ price: 2 })
        .beginSeatBid()
        .addBid({ impid: "imp1", price: 1.0 })
        .beginSeatBid()
        .addBid({ impid: "imp2", price: 2.0 });

      const result = builder.build();
      expect(result.seatbid![0].bid[0].price).toBe(2);
      expect(result.seatbid![1].bid[0].price).toBe(2);
    });
  });

  describe("short cut method", () => {
    it.each([
      {
        method: "addBannerBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 1,
      },
      {
        method: "addVideoBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 2,
      },
      {
        method: "addAudioBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 3,
      },
      {
        method: "addNativeBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 4,
      },
    ])(
      "$method creates bid by media type",
      ({ method, args, expectedType, expectedValue }) => {
        const sut = new BidResponseBuilder().beginSeatBid() as any;
        sut[method](...args);

        const result = sut.build();
        const bid = result.seatbid![0].bid[0];
        expect(bid[expectedType]).toBe(expectedValue);
      }
    );
  });
});
