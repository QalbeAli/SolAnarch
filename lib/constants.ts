import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "@/app/context/idl/idl.json";

export const PROGRAM_ID = idl.address;

export const programIdPubKey = new PublicKey(PROGRAM_ID);

export const TOKEN_MINT = new anchor.web3.PublicKey(
  "Ah1hf7NZgBhgnhFsrXLoj7czMMiVwUaCHnc5bP9wB6Ge"
);

// TODO: change to the authority of the presale
export const AUTHORITY = new anchor.web3.PublicKey(
  "94N4YzP2ihmdXNe3SgXJiBjymyBrS73VSz6QwX5QPSor"
);

export const TOKEN_DECIMALS = 9;
export const DECIMALS_MULTIPLIER = new BN(10).pow(new BN(TOKEN_DECIMALS));

export const TOKEN_AMOUNTS = {
  TOTAL_SUPPLY: new BN(1_000_000).mul(DECIMALS_MULTIPLIER),
  MAX_PER_ADDRESS: new BN(10_000).mul(DECIMALS_MULTIPLIER),

  PHASE_1_ALLOCATION: new BN(50_000).mul(DECIMALS_MULTIPLIER),
  PHASE_2_ALLOCATION: new BN(100_000).mul(DECIMALS_MULTIPLIER),
  PHASE_3_ALLOCATION: new BN(350_000).mul(DECIMALS_MULTIPLIER),
  PHASE_4_ALLOCATION: new BN(400_000).mul(DECIMALS_MULTIPLIER),
  PHASE_5_ALLOCATION: new BN(100_000).mul(DECIMALS_MULTIPLIER),
};

export const PHASE_PRICES = {
  PHASE_1: new BN(500_000), // 0.0005 SOL
  PHASE_2: new BN(1_000_000), // 0.001 SOL
  PHASE_3: new BN(1_500_000), // 0.0015 SOL
  PHASE_4: new BN(2_000_000), // 0.002 SOL
  PHASE_5: new BN(2_500_000), // 0.0025 SOL
};

export const ADMIN_PASSWORD = "zexx2025@admin"; // You can change this to any secure password
