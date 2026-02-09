type PlanMode = "SUBSCRIPTION" | "ONE_TIME_PAYMENT";

export interface Plan {
  id: string;
  slug: string;
  title: string;
  mode: PlanMode;
  yearlyPrice: number;
  monthlyPrice: number;
  yearlyCredits: number;
  monthlyCredits: number;
  price: number | null;
  priceId: string | null;
  description: string | null;
  yearlyPriceId: string | null;
  monthlyPriceId: string | null;
  isActive: boolean;
  canBeDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
