import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { PresaleInfo, UserInfo } from "./interface";
import { PROGRAM_ID, programIdPubKey } from "./constants";

const LAMPORTS_PER_SOL_BIGINT = BigInt(LAMPORTS_PER_SOL);

export const shortenAddress = (address: string): string =>
  address.slice(0, 4) + "..." + address.slice(-5);

export const derivePresaleAddress = async (authorityPubKey: PublicKey) => {
  const [presaleAddress, bump] = await PublicKey.findProgramAddressSync(
    [Buffer.from("presale"), authorityPubKey.toBuffer()],
    programIdPubKey
  );

  return { presaleAddress, bump };
};

export const derivePresaleVaultAddress = async () => {
  const seed = Buffer.from("vault");
  const [presaleVault, vaultBump] = await PublicKey.findProgramAddressSync(
    [seed], // Unique seed for the vault
    programIdPubKey // Presale program ID
  );

  return { presaleVault, vaultBump };
};

// 4. Get or create user info account
export const deriveUserInfoAddress = async (
  buyer: PublicKey,
  authority: PublicKey
) => {
  const { presaleAddress } = await derivePresaleAddress(authority);
  const [userInfoAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), presaleAddress.toBuffer(), buyer.toBuffer()],
    programIdPubKey
  );

  return userInfoAddress;
};

export const solToLamports = (solAmount: number): BN => {
  return new BN(solAmount * LAMPORTS_PER_SOL);
};

function validateInput(value: bigint | string): bigint {
  if (value === null || value === undefined) {
    throw new Error("Input cannot be null or undefined");
  }

  try {
    if (typeof value === "bigint") {
      return value;
    }

    // Handle number type
    if (typeof value === "number") {
      return BigInt(value);
    }

    if (typeof value === "string") {
      const cleanedValue = value.trim().replace(/,/g, "");

      if (!/^-?\d+(\.\d+)?$/.test(cleanedValue)) {
        throw new Error(`Invalid number format: ${value}`);
      }

      return BigInt(cleanedValue);
    }

    throw new Error(`Unsupported input type: ${typeof value}`);
  } catch (error) {
    throw new Error(
      `Invalid input: ${value} - ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

function getAbsoluteValue(value: bigint): {
  isNegative: boolean;
  absValue: bigint;
} {
  const isNegative = value < BigInt(0);
  const absValue = isNegative ? -value : value;
  return { isNegative, absValue };
}

function validateDecimalPlaces(decimalPlaces: number): void {
  if (decimalPlaces < 0 || decimalPlaces > 10) {
    throw new Error(`Decimal places must be between 0 and 10`);
  }
}

export function formatWithPrecision(
  value: bigint | string,
  divisor: bigint,
  decimalPlaces: number,
  showLabel: boolean = false
): string {
  const validatedValue = validateInput(value);
  validateDecimalPlaces(decimalPlaces);

  if (divisor === 0n) {
    throw new Error("Division by zero is not allowed");
  }

  if (validatedValue === 0n) {
    return showLabel ? `0 SOL` : "0";
  }

  const { isNegative, absValue } = getAbsoluteValue(validatedValue);

  // Using absValue, simplifies mathematical operations (division, remainder)
  // by working with positive numbers. This prevents issues that can arise
  // from operating on negative numbers. We reintroduce the sign later to
  // ensure the output accurately reflects the original value without
  // risking output like "-1.-1 SOL". etc

  const integerPart = absValue / divisor;
  const remainder = absValue % divisor;

  const decimalMultiplier = BigInt(10 ** decimalPlaces);
  const decimalPart = (remainder * decimalMultiplier) / divisor;

  const formattedDecimalPart = decimalPart
    .toString()
    .padStart(decimalPlaces, "0")
    .replace(/0+$/, ""); // remove trailing zeros eg *.003001200 -> *.0030012 etc

  return `${isNegative ? "-" : ""}${integerPart}${
    formattedDecimalPart ? "." + formattedDecimalPart : ""
  }${showLabel ? ` SOL` : ""}`.trim();
}

export function formatSolBalance(
  value: bigint | string,
  showLabel: boolean = false
): string {
  return formatWithPrecision(value, LAMPORTS_PER_SOL_BIGINT, 2, showLabel);
}

export function lamportToSOL(
  balance: any, // Changed to any to handle more input types
  showSolLabel: boolean = true
): string {
  try {
    // Handle different input types
    if (balance === null || balance === undefined) {
      return showSolLabel ? "0 SOL" : "0";
    }

    // Handle BN from bn.js
    if (balance && typeof balance === "object" && balance.toString) {
      balance = balance.toString();
    }

    return formatSolBalance(balance, showSolLabel);
  } catch (error) {
    console.error("Error converting lamports to SOL:", error);
    return showSolLabel ? "0 SOL" : "0";
  }
}
