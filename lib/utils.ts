import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import * as z from "zod";
import { DECIMALS_MULTIPLIER } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PreSaleFormData = {
  tokenMintAddress: string;
  maxTokenAmountPerAddress: number;
  displayEndTime: number;
};

export const PreSaleSchema = z.object({
  tokenMintAddress: z.string().min(32).max(44),
  maxTokenAmountPerAddress: z
    .number()
    .or(z.string().regex(/^\d+$/).transform(Number))
    .refine((val) => val > 0, "Amount must be greater than 0"),
  displayEndTime: z
    .number()
    .or(z.string().transform((val) => new Date(val).getTime()))
    .refine((val) => {
      const minTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
      return val > minTime;
    }, "End time must be at least 1 hour in the future"),
});

export const StartPresaleSchema = z
  .object({
    startTime: z.string().refine(
      (value) => {
        const startDate = new Date(value);
        return !isNaN(startDate.getTime()) && startDate > new Date();
      },
      { message: "Start time must be a valid future date" }
    ),
    endTime: z.string().refine(
      (value) => {
        const endDate = new Date(value);
        return !isNaN(endDate.getTime());
      },
      { message: "End time must be a valid date" }
    ),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startTime);
      const endDate = new Date(data.endTime);
      return startDate < endDate;
    },
    {
      message: "Start time must be before end time",
      path: ["startTime"],
    }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startTime);
      const endDate = new Date(data.endTime);
      const diffInDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      return diffInDays <= 30; // Presale can't last more than 30 days
    },
    {
      message: "Presale duration cannot exceed 30 days",
      path: ["endTime"],
    }
  );

export const BuyTokenSchema = (
  remainingSolLimit: number,
  currentPhasePrice: number
) =>
  z.object({
    amount: z
      .string()
      .or(z.number().transform(String))
      .refine((val) => !isNaN(Number(val)), "Must be a valid number")
      .transform(Number)
      .refine((val) => val > 0, "The amount must be a positive number.")

      .refine(
        (val) => val <= remainingSolLimit,
        () => ({
          message: `Cannot exceed your maximum limit of ${remainingSolLimit.toFixed(
            4
          )} SOL (${(
            (remainingSolLimit * LAMPORTS_PER_SOL) /
            currentPhasePrice
          ).toLocaleString()} ZEXX).`,
        })
      ),
  });

export type BuyTokenFormData = z.infer<ReturnType<typeof BuyTokenSchema>>;

export type StartPresaleFormData = z.infer<typeof StartPresaleSchema>;
