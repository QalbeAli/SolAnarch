import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import idl from "@/app/context/idl/idl.json";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { ZexxcoinPresale } from "./idl/type";

import moment from "moment";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PresaleInfo, UserInfo } from "@/lib/interface";
import {
  derivePresaleAddress,
  derivePresaleVaultAddress,
  solToLamports,
} from "@/lib/helper";
import { deriveUserInfoAddress } from "@/lib/helper";

import {
  BuyTokenFormData,
  PreSaleFormData,
  StartPresaleFormData,
} from "@/lib/utils";
import {
  AUTHORITY,
  DECIMALS_MULTIPLIER,
  TOKEN_AMOUNTS,
  TOKEN_MINT,
} from "@/lib/constants";
import { formatTokenAmount } from "@/lib/format";
export const getProvider = (
  publicKey: PublicKey | null,
  signTransaction: any,
  sendTransaction: any
): anchor.Program<ZexxcoinPresale> | null => {
  if (!publicKey) {
    console.log("Wallet not connected");
    return null;
  }

  if (!signTransaction) {
    console.log("Sign transaction method not available");
    return null;
  }
  try {
    const connection = new Connection(
      anchor.web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const provider = new AnchorProvider(
      connection,
      { publicKey, signTransaction, sendTransaction } as unknown as Wallet,
      { commitment: "processed" }
    );

    return new Program<ZexxcoinPresale>(idl as any, provider);
  } catch (error) {
    console.error("Error creating provider:", error);
    return null;
  }
};

export const getReadonlyProvider = (): Program<ZexxcoinPresale> => {
  const connection = new Connection(
    anchor.web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  // Use a dummy wallet for read-only operations
  const dummyWallet = {
    publicKey: PublicKey.default,
    signTransaction: async () => {
      throw new Error("Read-only provider cannot sign transactions.");
    },
    signAllTransactions: async () => {
      throw new Error("Read-only provider cannot sign transactions.");
    },
  };

  const provider = new AnchorProvider(connection, dummyWallet as any, {
    commitment: "processed",
  });

  return new Program<ZexxcoinPresale>(idl as any, provider);
};

export const fetchPresaleInfo = async (
  program: Program<ZexxcoinPresale>
): Promise<{ presaleInfo: PresaleInfo; presaleInfoAddress: PublicKey }> => {
  const presales = await program.account.presaleInfo.all();
  const presaleInfo = presales[0]?.account;
  const presaleInfoAddress = presales[0]?.publicKey;
  return { presaleInfo, presaleInfoAddress };
};

export const fetchUserInfo = async (
  program: Program<ZexxcoinPresale>,
  userPublicKey: PublicKey
): Promise<UserInfo> => {
  const userInfoAddress = await deriveUserInfoAddress(userPublicKey, AUTHORITY);
  const user = await program.account.userInfo.fetch(userInfoAddress);
  return user;
};

export const _createPresale = async (
  data: PreSaleFormData,
  publicKey: PublicKey,
  program: Program<ZexxcoinPresale>
): Promise<string> => {
  try {
    const { presaleAddress } = await derivePresaleAddress(publicKey);

    // Convert the number to proper decimals before creating BN
    const maxTokenAmount = new anchor.BN(
      (
        data.maxTokenAmountPerAddress * DECIMALS_MULTIPLIER.toNumber()
      ).toString()
    );

    // Convert timestamp to seconds for on-chain storage
    const displayEndTime = new anchor.BN(
      Math.floor(data.displayEndTime / 1000)
    );

    const tx = await program.methods
      .createPresale(
        new PublicKey(data.tokenMintAddress),
        maxTokenAmount,
        displayEndTime
      )
      .accounts({
        // @ts-ignore
        presaleInfo: presaleAddress,
        authority: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    console.error("Error in _createPresale:", error);
    throw new Error(error.message || "Failed to create presale");
  }
};

export const _buyToken = async (
  data: { tokenAmount: number; solAmount: number },
  buyerPublicKey: PublicKey,
  program: Program<ZexxcoinPresale>
): Promise<string> => {
  const { presaleAddress } = await derivePresaleAddress(AUTHORITY);
  const { presaleVault } = await derivePresaleVaultAddress();
  const userInfoAddress = await deriveUserInfoAddress(
    buyerPublicKey,
    AUTHORITY
  );

  // Convert token amount to BN with decimals
  const tokenAmount = new anchor.BN(data.tokenAmount.toString());

  // Get or create buyer's token account
  const buyerTokenAccount = await getAssociatedTokenAddressSync(
    TOKEN_MINT,
    buyerPublicKey
  );

  try {
    const acctInfo = await program.provider.connection.getAccountInfo(
      buyerTokenAccount
    );
    if (!acctInfo) {
      console.log("Creating buyer's token account...");
      const ix = createAssociatedTokenAccountInstruction(
        buyerPublicKey,
        buyerTokenAccount,
        buyerPublicKey,
        TOKEN_MINT
      );
      await program.provider.sendAndConfirm!(
        new anchor.web3.Transaction().add(ix),
        []
      );
      console.log("Created buyer's token account");
    }
  } catch (e) {
    console.log("Error checking/creating token account:", e);
  }

  // Get presale token account
  const presaleTokenAccount = await getAssociatedTokenAddressSync(
    TOKEN_MINT,
    presaleAddress,
    true // allow owner off curve
  );

  try {
    const tx = await program.methods
      .buyToken(tokenAmount)
      .accounts({
        // @ts-ignore
        presaleInfo: presaleAddress,
        userInfo: userInfoAddress,
        presaleVault,
        buyer: buyerPublicKey,
        buyerTokenAccount,
        presaleTokenAccount,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to buyToken!");
  }
};

export const _claimToken = async (
  program: Program<ZexxcoinPresale>,
  userPublicKey: PublicKey,
  phaseNumber: number
) => {
  // Derive necessary addresses
  const [presaleAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("presale"), AUTHORITY.toBuffer()],
    program.programId
  );

  const [userInfoAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), presaleAddress.toBuffer(), userPublicKey.toBuffer()],
    program.programId
  );

  // Get token accounts
  const tokenAccount = await getAssociatedTokenAddress(
    TOKEN_MINT,
    userPublicKey
  );

  const presaleTokenAccount = await getAssociatedTokenAddress(
    TOKEN_MINT,
    presaleAddress,
    true // allowOwnerOffCurve = true for PDA
  );

  // Send transaction
  const tx = await program.methods
    .claimToken(phaseNumber)
    .accounts({
      tokenMint: TOKEN_MINT,
      // @ts-ignore
      tokenAccount,
      presaleAssociatedTokenAccount: presaleTokenAccount,
      userInfo: userInfoAddress,
      presaleInfo: presaleAddress,
      buyer: userPublicKey,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .rpc();

  return tx;
};

export const _depositTokens = async (
  program: Program<ZexxcoinPresale>,
  userPublicKey: PublicKey,
  toast: any
): Promise<string> => {
  try {
    const depositAmount = TOKEN_AMOUNTS.TOTAL_SUPPLY;
    const { presaleAddress } = await derivePresaleAddress(AUTHORITY);
    const { presaleVault } = await derivePresaleVaultAddress();

    // Get token accounts
    const adminTokenAccount = await getAssociatedTokenAddressSync(
      TOKEN_MINT,
      userPublicKey
    );

    const presaleTokenAccount = await getAssociatedTokenAddressSync(
      TOKEN_MINT,
      presaleAddress,
      true // allow owner off curve
    );

    // Verify token balance
    const tokenBalance =
      await program.provider.connection.getTokenAccountBalance(
        adminTokenAccount
      );

    if (new anchor.BN(tokenBalance.value.amount).lt(depositAmount)) {
      toast({
        title: "Insufficient token balance",
        description: `Required: ${formatTokenAmount(
          depositAmount
        )}, Available: ${formatTokenAmount(tokenBalance.value.amount)}`,
      });

      throw new Error(
        `Insufficient token balance. Required: ${formatTokenAmount(
          depositAmount
        )}, Available: ${formatTokenAmount(tokenBalance.value.amount)}`
      );
    }

    const tx = await program.methods
      .depositToken(depositAmount)
      .accounts({
        mintAccount: TOKEN_MINT,
        // @ts-ignore
        tokenAccount: adminTokenAccount,
        admin: userPublicKey,
        toAssociatedTokenAccount: presaleTokenAccount,
        presaleVault,
        presaleInfo: presaleAddress,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    console.error("Error depositing tokens:", error);
    throw new Error(error.message || "Failed to deposit tokens!");
  }
};

export const _withdrawSol = async (
  program: Program<ZexxcoinPresale>,
  userPublicKey: PublicKey
): Promise<string> => {
  try {
    // Derive necessary PDAs
    const { presaleAddress } = await derivePresaleAddress(AUTHORITY);
    const { presaleVault, vaultBump } = await derivePresaleVaultAddress();

    // Send transaction with the vault bump
    const tx = await program.methods
      .withdrawSol(vaultBump)
      .accounts({
        // @ts-ignore
        presaleInfo: presaleAddress,
        presaleVault,
        admin: userPublicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    // Handle specific error cases
    if (error.message?.includes("EmptyVault")) {
      throw new Error("The vault is empty. No SOL to withdraw.");
    }
    if (error.message?.includes("InvalidAuthority")) {
      throw new Error("Only the presale authority can withdraw SOL.");
    }

    console.error("Error withdrawing SOL:", error);
    throw new Error(error.message || "Failed to withdraw SOL!");
  }
};

export const getPresaleVaultBalance = async (
  program: Program<ZexxcoinPresale>
): Promise<number> => {
  try {
    const { presaleVault } = await derivePresaleVaultAddress();
    const balance = await program.provider.connection.getBalance(presaleVault);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error("Error fetching vault balance:", error);
    return 0;
  }
};

export const _emergencyStop = async (
  program: Program<ZexxcoinPresale>,
  authority: PublicKey
): Promise<string> => {
  try {
    const { presaleAddress } = await derivePresaleAddress(AUTHORITY);

    const tx = await program.methods
      .emergencyStop()
      .accounts({
        // @ts-ignore
        presaleInfo: presaleAddress,
        authority: authority,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    console.error("Error in emergency stop:", error);
    throw new Error(error.message || "Failed to stop presale");
  }
};

export const _resumePresale = async (
  program: Program<ZexxcoinPresale>,
  authority: PublicKey,
  displayEndTime: number
): Promise<string> => {
  try {
    const { presaleAddress } = await derivePresaleAddress(AUTHORITY);

    // Convert timestamp to seconds for on-chain storage
    const endTime = new anchor.BN(Math.floor(displayEndTime / 1000));

    const tx = await program.methods
      .resumePresale(endTime)
      .accounts({
        // @ts-ignore
        presaleInfo: presaleAddress,
        authority: authority,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    console.error("Error in resume presale:", error);
    throw new Error(error.message || "Failed to resume presale");
  }
};

// user_info. Error Code: ConstraintSeeds. Error Number: 2006. Error Message: A seeds constraint was violated.
// Program log: Left:
// Program log: 59saaRc3UWS5GkJ5iVQb2KDoccaaNG8fxSjmRtcMsbAu
// Program log: Right:
// Program log: 9tuJjLomf5iBdJ2WmiiXYfvY6vjuHuUwQbstBfpm9JTp
//     at _buyToken (connection.ts:220:11)
