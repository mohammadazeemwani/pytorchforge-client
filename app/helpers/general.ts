import type { UseFormSetError } from "react-hook-form";
import * as z from 'zod/v4'

export function applyZodErrorsToForm(zodError: z.ZodError, setError: UseFormSetError<any>) {
  zodError.issues.forEach(err => {
    const field = err.path.join(".");
    setError(
      field as any, 
      { type: "manual", message: err.message, },
      { shouldFocus: true }
    );
  });
}


/**
 * Parses a comma-separated string of numbers like "123, 456, 789"
 * 
 * @param input - The input string (can have spaces, trailing commas, or be empty)
 * @returns number[] if valid, or false if invalid
 * 
 * @example
 * parseArrayOfNumbers("123, 456, 789");   // [123, 456, 789]
 * parseArrayOfNumbers("123, 456, 789, "); // [123, 456, 789]
 * parseArrayOfNumbers("   ");             // []
 * parseArrayOfNumbers("");                // []
 * parseArrayOfNumbers("123, abc");        // false
 * parseArrayOfNumbers("1, , 3");          // false

 */
export function parseArrayOfNumbers(input: string): number[] | false {
  const trimmed = input.trim();

  // Accept empty string as valid → return empty array
  if (trimmed === "") return [];

  const parts = trimmed
    .split(',')
    .map(part => part.trim())
    .filter(part => part !== '');

  // If no valid parts (just empty/trailing commas), treat as valid but empty array
  if (parts.length === 0) return [];

  // Validate and convert to numbers
  const numbers: number[] = [];

  for (const part of parts) {
    const num = Number(part);
    if (isNaN(num)) return false;
    numbers.push(num);
  }

  return numbers;
}