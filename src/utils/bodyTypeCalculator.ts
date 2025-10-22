export interface BodyMeasurements {
  chest: number;
  waist: number;
  hips: number;
  height: number;
}

export type BodyType = "hourglass" | "pear" | "apple" | "rectangle" | "inverted-triangle";

export interface BodyTypeResult {
  type: BodyType;
  description: string;
  recommendations: string[];
}

export function calculateBodyType(measurements: BodyMeasurements): BodyTypeResult {
  const { chest, waist, hips } = measurements;

  // Calculate ratios
  const chestToWaist = chest / waist;
  const hipsToWaist = hips / waist;
  const chestToHips = chest / hips;
  
  // Calculate differences
  const chestHipDiff = Math.abs(chest - hips);
  const waistDiff = Math.min(waist - chest, waist - hips);

  // Hourglass: chest and hips are similar, waist is significantly smaller
  if (chestHipDiff <= 3 && hipsToWaist >= 1.25 && chestToWaist >= 1.25) {
    return {
      type: "hourglass",
      description: "Balanced proportions with a defined waist. Your bust and hips are nearly equal in size.",
      recommendations: [
        "Wrap dresses and tops",
        "Fitted blazers",
        "High-waisted bottoms",
        "Belted styles",
        "V-neck and sweetheart necklines"
      ]
    };
  }

  // Pear: hips significantly larger than chest
  if (hips > chest + 2 && hipsToWaist > chestToWaist) {
    return {
      type: "pear",
      description: "Hip measurement is larger than your bust. Your lower body is proportionally larger than your upper body.",
      recommendations: [
        "A-line skirts and dresses",
        "Boat neck and off-shoulder tops",
        "Structured jackets",
        "Dark-colored bottoms",
        "Statement accessories on top"
      ]
    };
  }

  // Apple: chest significantly larger than hips, waist not well-defined
  if (chest > hips + 2 && chestToWaist < 1.25) {
    return {
      type: "apple",
      description: "Your bust is larger than your hips with less waist definition. You carry weight around your midsection.",
      recommendations: [
        "Empire waist dresses",
        "V-neck tops",
        "Flowy fabrics",
        "Bootcut or wide-leg pants",
        "Monochromatic outfits"
      ]
    };
  }

  // Inverted Triangle: chest significantly larger than hips, defined waist
  if (chest > hips + 2 && chestToWaist >= 1.25) {
    return {
      type: "inverted-triangle",
      description: "Broad shoulders and chest with narrower hips. Your upper body is proportionally larger than your lower body.",
      recommendations: [
        "A-line skirts",
        "Wide-leg pants",
        "Scoop and V-necklines",
        "Structured bottoms",
        "Minimize shoulder details"
      ]
    };
  }

  // Rectangle: all measurements are similar
  return {
    type: "rectangle",
    description: "Balanced proportions with minimal waist definition. Your bust, waist, and hips are fairly aligned.",
    recommendations: [
      "Peplum tops",
      "Belted styles",
      "Layered looks",
      "Ruffles and embellishments",
      "Color blocking"
    ]
  };
}
