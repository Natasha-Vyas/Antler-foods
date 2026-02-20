"use client";

import { useWatch, type Control } from "react-hook-form";
import { AddRestaurantCard, HelperCallout } from "./form-fields";
import type { NewRestaurantFormValues } from "./schema";

interface StepAdditionalRestaurantsProps {
  control: Control<NewRestaurantFormValues>;
}

export function StepAdditionalRestaurants({ control }: StepAdditionalRestaurantsProps) {
  const restaurantName = useWatch({
    control,
    name: "restaurantName",
  });

  const brandName = restaurantName?.trim() || "this brand";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-[22px] font-semibold tracking-tight text-[#111827]">
          Additional restaurants under this brand
        </h3>
        <HelperCallout>
          Are there any additional restaurants under the same brand as {brandName}? If yes, click
          &quot;Add Restaurant&quot; to include more locations under this brand. If it&apos;s the
          same owner but a different brand, do not add here. Instead, create it separately.
        </HelperCallout>
      </div>

      <div className="space-y-4">
        <h4 className="text-[20px] font-semibold text-[#111827] underline">Associated Restaurant(s)</h4>
        <AddRestaurantCard />
      </div>
    </div>
  );
}
