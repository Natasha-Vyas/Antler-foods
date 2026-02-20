import { z } from "zod";

const phoneRegex = /^\+?[0-9()\-\s]{7,20}$/;

export const stepOneSchema = z
  .object({
    ownerProfileMode: z.enum(["new", "existing"], {
      required_error: "Please select an owner profile option.",
    }),
    existingBusinessProfile: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.ownerProfileMode === "existing" && !values.existingBusinessProfile?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["existingBusinessProfile"],
        message: "Please select an existing business profile.",
      });
    }
  });

export const stepTwoSchema = z.object({
  businessType: z.string().min(1, "Business type is required."),
  restaurantName: z.string().min(1, "Restaurant name is required."),
  legalName: z.string().min(1, "Legal name is required."),
  address: z.string().min(1, "Address is required."),
  city: z.string().min(1, "City is required."),
  postalCode: z.string().min(1, "Postal code is required."),
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  contactPhone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(phoneRegex, "Enter a valid phone number."),
  contactEmail: z.string().min(1, "Email is required.").email("Enter a valid email."),
  contactPassword: z.string().min(8, "Password must be at least 8 characters."),
});

export const newRestaurantSchema = stepOneSchema.and(stepTwoSchema);

export type NewRestaurantFormValues = z.infer<typeof stepOneSchema> &
  z.infer<typeof stepTwoSchema>;

export const STEP_ONE_FIELDS = [
  "ownerProfileMode",
  "existingBusinessProfile",
] as const;

export const STEP_TWO_FIELDS = [
  "businessType",
  "restaurantName",
  "legalName",
  "address",
  "city",
  "postalCode",
  "country",
  "state",
  "contactPhone",
  "contactEmail",
  "contactPassword",
] as const;
