"use client";

import { useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import {
  AddRestaurantCard,
  FormRadioOption,
  FormSelectInput,
  HelperCallout,
} from "./form-fields";
import type { NewRestaurantFormValues } from "./schema";

interface StepRestaurantInfoProps {
  control: Control<NewRestaurantFormValues>;
  register: UseFormRegister<NewRestaurantFormValues>;
  errors: FieldErrors<NewRestaurantFormValues>;
}

const EXISTING_BUSINESS_OPTIONS = [
  { value: "luis-pizza", label: "Luis Pizza GmbH" },
  { value: "sunset-kitchen", label: "Sunset Kitchen Group" },
  { value: "urban-bites", label: "Urban Bites Co." },
];

export function StepRestaurantInfo({ control, register, errors }: StepRestaurantInfoProps) {
  const ownerMode = useWatch({
    control,
    name: "ownerProfileMode",
  });

  const selectedOwnerMode = ownerMode ?? "new";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-[22px] font-semibold tracking-tight text-[#111827]">Who is the owner?</h3>
        <HelperCallout>
          Does this restaurant belong to an owner/company that already exists in our system? If
          yes, select that existing owner/company profile. Otherwise, create a new owner/company
          profile.
        </HelperCallout>
      </div>

      <div className="space-y-3">
        <FormRadioOption
          name="ownerProfileMode"
          value="new"
          register={register}
          checked={selectedOwnerMode === "new"}
          label="Create new owner/company business profile"
          suffix={<InfoIcon />}
        />
        <FormRadioOption
          name="ownerProfileMode"
          value="existing"
          register={register}
          checked={selectedOwnerMode === "existing"}
          label="Use existing owner/company business profile"
          suffix={<InfoIcon />}
        />

        {selectedOwnerMode === "existing" ? (
          <div className="max-w-sm">
            <FormSelectInput
              label=""
              name="existingBusinessProfile"
              register={register}
              errors={errors}
              placeholder="Search business..."
              options={EXISTING_BUSINESS_OPTIONS}
            />
          </div>
        ) : null}
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-[20px] font-semibold text-[#111827] underline">
          Associated Restaurant(s)
        </h4>
        <AddRestaurantCard />
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#111827] text-[10px] font-semibold text-[#111827]">
      i
    </span>
  );
}
