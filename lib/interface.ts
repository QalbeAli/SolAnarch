import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

// Update PhaseStatus to match contract structure
export interface PhaseStatus {
  active?: {};
  ended?: {};
  upcoming?: {};
}

export interface Phase {
  phaseNumber: number;
  amount: BN;
  price: BN;
  percentage: number;
  tokensSold: BN;
  tokensAvailable: BN;
  status: PhaseStatus;
  softcap: BN;
  hardcap: BN;
}

export interface PresaleInfo {
  tokenMintAddress: PublicKey;
  totalTokenSupply: BN;
  remainingTokens: BN;
  currentPhase: number;
  phases: Phase[];
  totalTokensSold: BN;
  totalTokensDeposited: BN;
  maxTokenAmountPerAddress: BN;
  authority: PublicKey;
  isInitialized: boolean;
  isActive: boolean;
  isEnded: boolean;
  isPaused: boolean;
  displayEndTime: BN;
}

export interface UserInfo {
  tokensBought: BN;
  phasePurchases: BN[];
  lastPurchaseTime: BN;
  phaseClaims: boolean[];
  wallet: PublicKey;
  totalPaid: BN;
}
