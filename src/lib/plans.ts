import { Plan } from "@/types/plan";
import { prisma } from "./prisma";

export async function getPlans(): Promise<Plan[]> {
  const plans = await prisma.plan.findMany({
    orderBy: { createdAt: "desc" }
  });

  return plans;
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  const plan = await prisma.plan.findUnique({
    where: { slug }
  });

  return plan;
}
