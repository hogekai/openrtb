import type { Bid } from "iab-openrtb/v26";
import type { BidScoringContext, BidScoringStrategy } from "../types";

type ScoreCalculator = (
  bid: Bid,
  context: BidScoringContext
) => Promise<number>;

interface ScoringConfig {
  name: string;
  weight: number;
  calculator: ScoreCalculator;
}

export class FlexibleBidScoringStrategy implements BidScoringStrategy {
  private readonly factors: ScoringConfig[];
  private readonly options: {
    normalizeScores: boolean;
    minScore?: number;
    maxScore?: number;
  };

  public constructor(
    factors: ScoringConfig[],
    options: {
      normalizeScores?: boolean;
      minScore?: number;
      maxScore?: number;
    } = {}
  ) {
    this.factors = factors;
    this.options = {
      normalizeScores: options.normalizeScores ?? true,
      minScore: options.minScore,
      maxScore: options.maxScore,
    };
  }

  public async score(bid: Bid, context: BidScoringContext): Promise<number> {
    const scorePromises = this.factors.map(async (factor) => {
      try {
        const rawScore = await factor.calculator(bid, context);
        return {
          name: factor.name,
          score: rawScore * factor.weight,
        };
      } catch (error) {
        console.error(`Error calculating score for ${factor.name}:`, error);
        return {
          name: factor.name,
          score: 0,
        };
      }
    });
    const scores = await Promise.all(scorePromises);

    let finalScore = scores.reduce((sum, { score }) => sum + score, 0);

    if (this.options.normalizeScores) {
      const totalWeight = this.factors.reduce(
        (sum, factor) => sum + factor.weight,
        0
      );
      if (totalWeight > 0) {
        finalScore /= totalWeight;
      }
    }

    if (this.options.normalizeScores) {
      const totalWeight = this.factors.reduce(
        (sum, factor) => sum + factor.weight,
        0
      );
      if (totalWeight > 0) {
        finalScore /= totalWeight;
      }
    }

    if (typeof this.options.minScore === "number") {
      finalScore = Math.max(finalScore, this.options.minScore);
    }
    if (typeof this.options.maxScore === "number") {
      finalScore = Math.min(finalScore, this.options.maxScore);
    }

    return finalScore;
  }
}
