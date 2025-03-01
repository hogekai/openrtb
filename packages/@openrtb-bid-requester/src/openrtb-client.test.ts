import { OpenRTBClient } from "./openrtb-client";
import { openrtbFaker } from "@nextad/faker";
import type { BidRequest, BidResponse } from "iab-openrtb/v26";

describe("OpenRTB Client", () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("request", () => {
    beforeEach(() => {
      fetchMock.mockImplementation(
        async () => new Response("{}", { status: 200 })
      );
    });

    it("sends request to specified endpoint", () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6");
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        "https://example.com/endpoint",
        expect.any(Object)
      );
    });

    it("sends request with specified OpenRTB version", () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6");
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "x-openrtb-version": "2.6",
          }),
        })
      );
    });

    it("includes credential field when `credentials` is specified as `include`",async () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6", {
        credentials: "include",
      });
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      await sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include'
        })
      );
    });

    it("sends request with specified data format", () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6", {
        headers: {
          "Content-Type": "application/x-protobuf",
        },
      });
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/x-protobuf",
          }),
        })
      );
    });

    it("sends request with specified accept encoding", () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6", {
        headers: {
          "Accept-Encoding": "br",
        },
      });
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Accept-Encoding": "br",
          }),
        })
      );
    });

    it("sends request with specified cache", () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6", {
        cache: "no-cache",
      });
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          cache: "no-cache",
        })
      );
    });

    it("sends request with specified headers", () => {
      const sut = new OpenRTBClient("https://example.com/endpoint", "2.6", {
        headers: {
          "X-Custom-Header": "custom-value",
        },
      });
      const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

      sut.request<BidRequest, BidResponse>(bidRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-Custom-Header": "custom-value",
          }),
        })
      );
    });

    describe("error handling", () => {
      it("throws NoBidResponse exception when status code is 204", async () => {
        fetchMock.mockImplementation(
          async () => new Response(null, { status: 204 })
        );
        const sut = new OpenRTBClient("https://example.com/endpoint", "2.6");
        const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

        await expect(
          sut.request<BidRequest, BidResponse>(bidRequest)
        ).rejects.toThrow("No bid response received from the auction.");
      });

      it("throws InvalidBidRequest exception when status code is 400", async () => {
        fetchMock.mockImplementation(
          async () => new Response("Invalid request", { status: 400 })
        );
        const sut = new OpenRTBClient("https://example.com/endpoint", "2.6");
        const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

        await expect(
          sut.request<BidRequest, BidResponse>(bidRequest)
        ).rejects.toThrow("Invalid request");
      });

      it("throws exception with default message when status code is 400 and response body is empty", async () => {
        fetchMock.mockImplementation(
          async () => new Response(null, { status: 400 })
        );
        const sut = new OpenRTBClient("https://example.com/endpoint", "2.6");
        const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

        await expect(
          sut.request<BidRequest, BidResponse>(bidRequest)
        ).rejects.toThrow("required parameters are missing or malformed.");
      });

      it("throws Unexpected exception for other status codes", async () => {
        fetchMock.mockImplementation(
          async () => new Response(null, { status: 500 })
        );
        const sut = new OpenRTBClient("https://example.com/endpoint", "2.6");
        const bidRequest = openrtbFaker.v26.bidRequest.web().addImp().make();

        await expect(
          sut.request<BidRequest, BidResponse>(bidRequest)
        ).rejects.toThrow("Unexpected HTTP response: received status code 500");
      });
    });
  });
});
