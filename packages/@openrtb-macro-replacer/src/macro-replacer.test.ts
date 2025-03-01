import { MacroReplacer } from "@/macro-replacer";

describe("MacroReplacer", () => {
  describe("Constructor and Initial State", () => {
    it("creates instance with default settings", () => {
      const sut = new MacroReplacer();
      const macros = sut.getSupportedMacros();

      expect(macros).toContain("${OPENRTB_ID}");
      expect(macros).toContain("${AUCTION_ID}");
    });

    it("creates OpenRTB v3 only instance", () => {
      const sut = new MacroReplacer({}, "3");
      const macros = sut.getSupportedMacros();

      expect(macros).toContain("${OPENRTB_ID}");
      expect(macros).not.toContain("${AUCTION_ID}");
    });

    it("creates Auction v2 only instance", () => {
      const sut = new MacroReplacer({}, "2");
      const macros = sut.getSupportedMacros();

      expect(macros).toContain("${AUCTION_ID}");
      expect(macros).not.toContain("${OPENRTB_ID}");
    });
  });

  describe("Context Operations", () => {
    it("initializes with provided context", () => {
      const initialContext = { id: "123", price: 10.5 };
      const sut = new MacroReplacer(initialContext);

      expect(sut.getContext()).toEqual(initialContext);
    });

    it("updates context with new values", () => {
      const sut = new MacroReplacer({ id: "123" });
      sut.updateContext({ price: 10.5 });

      expect(sut.getContext()).toEqual({
        id: "123",
        price: 10.5,
      });
    });

    it("preserves existing values during partial updates", () => {
      const sut = new MacroReplacer({ id: "123", price: 10.5 });
      sut.updateContext({ price: 20.0 });

      expect(sut.getContext()).toEqual({
        id: "123",
        price: 20.0,
      });
    });
  });

  describe("Macro Replacement", () => {
    it("replaces single macro in text", () => {
      const sut = new MacroReplacer({ id: "123" });
      const result = sut.replace("ID: ${OPENRTB_ID}");

      expect(result).toBe("ID: 123");
    });

    it('replaces macro in specified context', () => {
      const sut = new MacroReplacer();
      const result = sut.replace("ID: ${OPENRTB_ID}", { id: "12"});

      expect(result).toBe("ID: 12");
    }); 

    it("replaces multiple macros in text", () => {
      const sut = new MacroReplacer({
        id: "123",
        price: 10.5,
        currency: "USD",
      });

      const result = sut.replace(
        "ID: ${OPENRTB_ID}, Price: ${OPENRTB_PRICE} ${OPENRTB_CURRENCY}"
      );

      expect(result).toBe("ID: 123, Price: 10.5 USD");
    });

    it("replaces repeated macros consistently", () => {
      const sut = new MacroReplacer({ id: "123" });
      const result = sut.replace("${OPENRTB_ID} and ${OPENRTB_ID}");

      expect(result).toBe("123 and 123");
    });

    it("handles undefined context values as empty strings", () => {
      const sut = new MacroReplacer({ id: "123" });
      const result = sut.replace("ID: ${OPENRTB_ID}, Price: ${OPENRTB_PRICE}");

      expect(result).toBe("ID: 123, Price: ");
    });

    it("handles null context values as empty strings", () => {
      const sut = new MacroReplacer({
        id: "123",
        price: null as unknown as number,
      });
      const result = sut.replace("ID: ${OPENRTB_ID}, Price: ${OPENRTB_PRICE}");

      expect(result).toBe("ID: 123, Price: ");
    });

    it("leaves unmatched macros unchanged", () => {
      const sut = new MacroReplacer({ id: "123" });
      const result = sut.replace(
        "ID: ${OPENRTB_ID}, Unknown: ${UNKNOWN_MACRO}"
      );

      expect(result).toBe("ID: 123, Unknown: ${UNKNOWN_MACRO}");
    });
  });

  describe("Version-specific Features", () => {
    it("supports OpenRTB v3 specific macros", () => {
      const sut = new MacroReplacer({ mediaId: "media123" }, "3");
      const result = sut.replace("Media: ${OPENRTB_MEDIA_ID}");

      expect(result).toBe("Media: media123");
    });

    it("supports Auction v2 specific macros", () => {
      const sut = new MacroReplacer({ adId: "ad123" }, "2");
      const result = sut.replace("Ad: ${AUCTION_AD_ID}");

      expect(result).toBe("Ad: ad123");
    });

    it("restricts access to version specific macros", () => {
      const v3Sut = new MacroReplacer({ mediaId: "media123" }, "3");
      const v2Sut = new MacroReplacer({ adId: "ad123" }, "2");

      expect(v3Sut.replace("${AUCTION_AD_ID}")).toBe("${AUCTION_AD_ID}");
      expect(v2Sut.replace("${OPENRTB_MEDIA_ID}")).toBe("${OPENRTB_MEDIA_ID}");
    });
  });
});
