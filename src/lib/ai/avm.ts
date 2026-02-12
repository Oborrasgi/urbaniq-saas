

/**
 * UrbanIQ – AVM (Automated Valuation Model)
 * ------------------------------------------
 * Basic deterministic valuation engine (MVP version)
 * - Calculates estimated value
 * - Returns confidence score
 * - Provides explainability factors
 */

export interface AVMInput {
  surface: number; // m²
  pricePerM2: number; // €/m² reference market value
  locationScore: number; // 0–1 (micro-location quality)
  conditionScore: number; // 0–1 (property condition)
  marketTrend: number; // -1 to 1 (market momentum)
}

export interface AVMResult {
  estimatedValue: number;
  confidence: number; // 0–1
  explanation: string[];
}

/**
 * Run Automated Valuation Model
 */
export function runAVM(input: AVMInput): AVMResult {
  const {
    surface,
    pricePerM2,
    locationScore,
    conditionScore,
    marketTrend
  } = input;

  // 1️⃣ Base market value
  const baseValue = surface * pricePerM2;

  // 2️⃣ Adjustments
  const locationAdjustment = 1 + (locationScore - 0.5) * 0.2;
  const conditionAdjustment = 1 + (conditionScore - 0.5) * 0.15;
  const trendAdjustment = 1 + marketTrend * 0.1;

  const estimatedValue =
    baseValue *
    locationAdjustment *
    conditionAdjustment *
    trendAdjustment;

  // 3️⃣ Confidence scoring
  const confidence =
    0.6 +
    locationScore * 0.15 +
    conditionScore * 0.15 +
    (1 - Math.abs(marketTrend)) * 0.1;

  // Clamp confidence between 0 and 1
  const finalConfidence = Math.min(Math.max(confidence, 0), 1);

  // 4️⃣ Explainability
  const explanation: string[] = [
    `Base market value calculated from ${surface}m² at €${pricePerM2}/m².`,
    `Location quality adjustment applied (${(locationScore * 100).toFixed(
      0
    )}% score).`,
    `Property condition adjustment applied (${(
      conditionScore * 100
    ).toFixed(0)}% score).`,
    `Market trend impact included (${(marketTrend * 100).toFixed(
      0
    )}% momentum).`
  ];

  return {
    estimatedValue: Math.round(estimatedValue),
    confidence: Number(finalConfidence.toFixed(2)),
    explanation
  };
}