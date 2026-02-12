// lib/ai/legal.ts

export type LegalRisk = {
    level: "low" | "medium" | "high";
    message: string;
  };
  
  export type LegalAnalysisResult = {
    risks: LegalRisk[];
    summary: string;
  };
  
  /**
   * ⚖️ Basic Legal Intelligence Engine
   * Later this can be connected to OpenAI or real registry data
   */
  export function analyzeLegalRisk(input: {
    hasCFO: boolean;
    isOccupied: boolean;
    hasCharges: boolean;
    isTouristic: boolean;
  }): LegalAnalysisResult {
  
    const risks: LegalRisk[] = [];
  
    if (!input.hasCFO) {
      risks.push({
        level: "high",
        message: "The property does not have a Certificate of Final Work (CFO)."
      });
    }
  
    if (input.isOccupied) {
      risks.push({
        level: "high",
        message: "The property appears to be occupied."
      });
    }
  
    if (input.hasCharges) {
      risks.push({
        level: "medium",
        message: "The property has registered charges."
      });
    }
  
    if (input.isTouristic) {
      risks.push({
        level: "medium",
        message: "Touristic license restrictions may apply."
      });
    }
  
    return {
      risks,
      summary:
        risks.length === 0
          ? "No significant legal risks detected."
          : `Detected ${risks.length} potential legal risk(s).`
    };
  }