import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { appConfig } from "@/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ====================================================
 * Logs an error message to the browser console
 * @param message - The error message to log
 *  =====================================================
 */
export function browserConsoleError(message: string) {
  console.log(
    `%c${message}`,
    "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;"
  );
}

/** ====================================================
 * Validates email format using a simple regex
 * @param email - Email address to validate
 * @returns {boolean} indicating if email format is valid
 *  =====================================================
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** ====================================================
 * Formats a date to a string in the format of "Month Day, Year"
 * @param input - Date to format
 * @returns {string} formatted date, or an empty string if the input is not a valid date
 *  =====================================================
 */
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });
}

/** ====================================================
 * Checks if a user is on a trial period
 * @param createdAt - Date the user was created
 * @returns {boolean} indicating if the user is on a trial period
 *  =====================================================
 */
export function isTrialPeriod(createdAt: Date): boolean {
  const now = new Date();
  const trialEndDate = new Date(createdAt.getTime() + appConfig.stripe.trailPeriod);

  return now < trialEndDate;
}

/** ====================================================
 * Creates a slug from a title
 * @param title - Title to create a slug from
 * @returns {string} slugified title
 *  =====================================================
 */
export function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-");
}

export function getReadingTime(content: string, wordsPerMinute = 200) {
  const textOnly = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  const wordCount = textOnly.split(/\s+/).filter((word) => word.length > 0).length;

  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (minutes <= 1) return "1 min read";
  if (minutes < 60) return `${minutes} mins read`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 1 && remainingMinutes === 0) return "1 hour read";
  if (remainingMinutes === 0) return `${hours} hours read`;
  return `${hours}h ${remainingMinutes}m read`;
}
