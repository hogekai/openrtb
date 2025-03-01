import type { ExceptionType } from "./types";

export class BidRequesterException extends Error {
  public type: ExceptionType;

  public constructor(message?: string, type: ExceptionType = "Unexpected") {
    super(message);
    this.type = type;
  }
}
