import * as z from "zod";

// User Profile Update
export const generalSettingsSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 50 characters long" })
    .max(50, { message: "Name cannot exceed 100 characters" }),
  email: z.string().email().optional().readonly(),
  image: z.string().optional()
});

export type GeneralSettingsSchema = z.infer<typeof generalSettingsSchema>;

// Authentication Forms
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"]
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required" })
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your new password" })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"]
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// Contact Form
export const contactSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters long" }),
  message: z.string().min(2, { message: "Message must be at least 2 characters long" })
});

export type ContactSchema = z.infer<typeof contactSchema>;

// Subscription Plan Form
export const planFormSchema = z
  .object({
    title: z.string().nonempty({ message: "Title is required" }),
    description: z.string().optional(),
    mode: z.enum(["SUBSCRIPTION", "ONE_TIME_PAYMENT"], { message: "Payment mode is required" }),
    // for one time payment mode
    price: z.string().optional(),
    priceId: z.string().optional(),
    // for subscription mode
    monthlyCredits: z.string().optional(),
    yearlyCredits: z.string().optional(),
    annualPrice: z.string().optional(),
    monthlyPrice: z.string().optional(),
    yearlyPriceId: z.string().optional(),
    monthlyPriceId: z.string().optional(),
    isActive: z.boolean().optional()
  })
  .refine((data) => data.mode !== "SUBSCRIPTION" || !!data.monthlyCredits, {
    message: "Monthly credits is required!",
    path: ["monthlyCredits"]
  })
  .refine((data) => data.mode !== "SUBSCRIPTION" || !!data.yearlyCredits, {
    message: "Yearly credits is required!",
    path: ["yearlyCredits"]
  })
  .refine((data) => data.mode !== "SUBSCRIPTION" || !!data.annualPrice, {
    message: "Annual price is required!",
    path: ["annualPrice"]
  })
  .refine((data) => data.mode !== "SUBSCRIPTION" || !!data.monthlyPrice, {
    message: "Monthly price is required!",
    path: ["monthlyPrice"]
  })
  .refine((data) => data.mode !== "SUBSCRIPTION" || !!data.yearlyPriceId, {
    message: "Yearly price ID is required!",
    path: ["yearlyPriceId"]
  })
  .refine((data) => data.mode !== "SUBSCRIPTION" || !!data.monthlyPriceId, {
    message: "Monthly price ID is required!",
    path: ["monthlyPriceId"]
  })

  .refine((data) => data.mode !== "ONE_TIME_PAYMENT" || !!data.price, {
    message: "Plan price is required!",
    path: ["price"]
  })
  .refine((data) => data.mode !== "ONE_TIME_PAYMENT" || !!data.priceId, {
    message: "Price ID is required!",
    path: ["priceId"]
  });

export type PlanFormSchema = z.infer<typeof planFormSchema>;

// Blog Form
export const blogFormSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  content: z.string().nonempty({ message: "Content is required" }),
  image: z.string().nonempty({ message: "Image is required" }),
  tags: z.string().optional(),
  isPublished: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional()
});

export type BlogFormSchema = z.infer<typeof blogFormSchema>;
