import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// import { createPlanAction, updatePlanAction } from "@/actions/plan-actions";
import { planFormSchema, type PlanFormSchema } from "@/lib/zod-schemas";

interface UsePlanFormOptions {
  defaultValues: PlanFormSchema;
  isEdit: boolean;
  slug?: string;
}
export function usePlanForm({ defaultValues, isEdit, slug }: UsePlanFormOptions) {
  const form = useForm<PlanFormSchema>({
    resolver: zodResolver(planFormSchema),
    defaultValues
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    resetField,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isEdit && slug) {
        // TODO: Remove this
        throw new Error("Demo website, so you can't edit the plan");

        // TODO: Uncomment this if you want to update the plan
        // await updatePlanAction(slug, data);
        // toast.success("Plan updated successfully");
        // return;
      }

      // TODO: Remove this
      throw new Error("Demo website, so you can't create the plan");

      // TODO: Uncomment this if you want to create the plan
      // await createPlanAction(data);
      // toast.success("Plan created successfully");
      // reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      console.error("Error submitting plan form:", error);
      toast.error(errorMessage);
    }
  });

  const monthlyPrice = watch("monthlyPrice");
  const isSubscriptionMode = watch("mode") === "SUBSCRIPTION";

  useEffect(() => {
    if (monthlyPrice) {
      const numericPrice = Number(monthlyPrice);
      if (!isNaN(numericPrice) && numericPrice > 0) {
        setValue("annualPrice", String(numericPrice * 12));
      }
    }
  }, [monthlyPrice, setValue]);

  useEffect(() => {
    if (isSubscriptionMode) {
      resetField("price");
      resetField("priceId");
    } else {
      resetField("monthlyCredits");
      resetField("yearlyCredits");
      resetField("annualPrice");
      resetField("monthlyPrice");
      resetField("yearlyPriceId");
      resetField("monthlyPriceId");
    }
  }, [isSubscriptionMode, resetField]);

  return {
    form,
    onSubmit,
    isSubmitting,
    isSubscriptionMode
  };
}
