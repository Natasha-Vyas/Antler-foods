"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useWatch,
  type FieldPath,
} from "react-hook-form";
import { StepAdditionalRestaurants } from "./step-additional-restaurants";
import { StepBusinessInfo } from "./step-business-info";
import { StepRestaurantInfo } from "./step-restaurant-info";
import {
  STEP_ONE_FIELDS,
  STEP_TWO_FIELDS,
  newRestaurantSchema,
  stepOneSchema,
  stepTwoSchema,
  type NewRestaurantFormValues,
} from "./schema";
import { Stepper } from "./stepper";

type WizardStep = 1 | 2 | 3;

export function NewRestaurantWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    setError,
    setFocus,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewRestaurantFormValues>({
    resolver: zodResolver(newRestaurantSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      ownerProfileMode: "new",
      existingBusinessProfile: "",
      businessType: "",
      restaurantName: "",
      legalName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      state: "",
      contactPhone: "",
      contactEmail: "",
      contactPassword: "",
    },
  });

  const watchedValues = useWatch({ control });
  const isStepOneComplete = useMemo(
    () => stepOneSchema.safeParse(watchedValues).success,
    [watchedValues],
  );
  const isStepTwoComplete = useMemo(
    () => stepTwoSchema.safeParse(watchedValues).success,
    [watchedValues],
  );

  const setStepErrors = (
    fieldNames: readonly string[],
    issues: Array<{ path: (string | number)[]; message: string }>,
  ) => {
    const availableFields = new Set(fieldNames);
    let firstInvalidField: FieldPath<NewRestaurantFormValues> | null = null;

    issues.forEach((issue) => {
      const firstPathSegment = issue.path[0];

      if (typeof firstPathSegment !== "string" || !availableFields.has(firstPathSegment)) {
        return;
      }

      const field = firstPathSegment as FieldPath<NewRestaurantFormValues>;

      if (!firstInvalidField) {
        firstInvalidField = field;
      }

      setError(field, { type: "manual", message: issue.message });
    });

    if (firstInvalidField) {
      setFocus(firstInvalidField);
    }
  };

  const validateStep = async (step: Exclude<WizardStep, 3>) => {
    const fields = step === 1 ? STEP_ONE_FIELDS : STEP_TWO_FIELDS;
    clearErrors([...fields]);

    const values = getValues();
    const result = (step === 1 ? stepOneSchema : stepTwoSchema).safeParse(values);

    if (result.success) {
      return true;
    }

    setStepErrors(fields, result.error.issues);
    return false;
  };

  const onContinue = async () => {
    setSuccessMessage(null);

    if (currentStep === 1) {
      const isValid = await validateStep(1);

      if (isValid) {
        setCurrentStep(2);
      }

      return;
    }

    if (currentStep === 2) {
      const isValid = await validateStep(2);

      if (isValid) {
        setCurrentStep(3);
      }
    }
  };

  const onStepSelect = async (nextStep: WizardStep) => {
    setSuccessMessage(null);

    if (nextStep === currentStep) {
      return;
    }

    if (nextStep < currentStep) {
      setCurrentStep(nextStep);
      return;
    }

    for (let step = currentStep; step < nextStep; step += 1) {
      const stepToValidate = step as Exclude<WizardStep, 3>;
      const isValid = await validateStep(stepToValidate);

      if (!isValid) {
        if (currentStep !== stepToValidate) {
          setCurrentStep(stepToValidate);
        }

        return;
      }
    }

    setCurrentStep(nextStep);
  };

  const onBack = () => {
    setSuccessMessage(null);
    setCurrentStep((step) => (step > 1 ? ((step - 1) as WizardStep) : step));
  };

  const onCreateRestaurant = handleSubmit((values) => {
    console.log("New restaurant payload:", values);
    setSuccessMessage("Restaurant draft captured successfully.");
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-[#d7e2e6] bg-white">
      <div className="border-b border-[#d8e3e7] px-8 py-5">
        <h2 className="text-[28px] font-semibold text-[#111827]">New restaurant</h2>
      </div>

      <div className="space-y-6 p-8">
        <Stepper
          currentStep={currentStep}
          isStepOneComplete={isStepOneComplete}
          isStepTwoComplete={isStepTwoComplete}
          onStepSelect={onStepSelect}
        />

        {successMessage ? (
          <div className="rounded-xl border border-[#bce4cb] bg-[#ebf9ef] px-4 py-3 text-sm text-[#2b7a45]">
            {successMessage}
          </div>
        ) : null}

        {currentStep === 1 ? (
          <StepRestaurantInfo control={control} register={register} errors={errors} />
        ) : null}

        {currentStep === 2 ? (
          <StepBusinessInfo register={register} errors={errors} />
        ) : null}

        {currentStep === 3 ? <StepAdditionalRestaurants control={control} /> : null}
      </div>

      <div className="flex justify-end border-t border-[#d8e3e7] bg-[#f3f7f9] px-8 py-5">
        <div className="flex items-center gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-[#d2dee4] bg-white px-5 py-2 text-[18px] font-medium text-[#111827] transition hover:bg-[#f7fafc]"
            >
              Back
            </button>
          ) : null}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={onContinue}
              className="rounded-xl bg-[#60c783] px-6 py-2 text-[18px] font-semibold text-white transition hover:bg-[#55bb77]"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={onCreateRestaurant}
              disabled={!isStepOneComplete || !isStepTwoComplete || isSubmitting}
              className="rounded-xl bg-[#60c783] px-6 py-2 text-[18px] font-semibold text-white transition hover:bg-[#55bb77] disabled:cursor-not-allowed disabled:bg-[#c7d8ce] disabled:text-[#f4f7f5]"
            >
              {isSubmitting ? "Creating..." : "Create restaurant"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
