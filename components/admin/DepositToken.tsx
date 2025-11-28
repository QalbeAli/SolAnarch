"use client";
import { useState, useMemo, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getProvider, _depositTokens } from "@/app/context/connection";
import { TOKEN_AMOUNTS, TOKEN_MINT } from "@/lib/constants";
import Loader from "@/components/Loader/Loader";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { DECIMALS_MULTIPLIER } from "@/lib/constants";

export default function DepositToken() {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [isDepositing, setIsDepositing] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const { connection } = useConnection();
  const { toast } = useToast();

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  // Fetch token balance
  useEffect(() => {
    const getTokenBalance = async () => {
      if (!publicKey || !connection) return;

      try {
        const tokenAccount = getAssociatedTokenAddressSync(
          TOKEN_MINT,
          publicKey
        );
        const balance = await connection.getTokenAccountBalance(tokenAccount);
        setTokenBalance(Number(balance.value.amount) / DECIMALS_MULTIPLIER);
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setTokenBalance(0);
      }
    };

    getTokenBalance();
    const intervalId = setInterval(getTokenBalance, 10000);
    return () => clearInterval(intervalId);
  }, [publicKey, connection]);

  const handleDeposit = async () => {
    if (!publicKey || !program) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet to deposit tokens.",
      });
      return;
    }

    try {
      setIsDepositing(true);
      const tx = await _depositTokens(program, publicKey, toast);

      const connection = program.provider.connection;
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });

      toast({
        title: "Tokens Deposited Successfully",
        description: `${TOKEN_AMOUNTS.TOTAL_SUPPLY.toString()} tokens have been deposited to the presale contract.`,
      });
    } catch (error: any) {
      console.error("Deposit error:", error);
      toast({
        variant: "destructive",
        title: "Deposit Failed",
        description: error.message || "Failed to deposit tokens",
      });
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-secondary text-black">
      <CardHeader>
        <CardTitle>Deposit Presale Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Token Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Your Balance: {tokenBalance.toLocaleString()} ZEXX
              </p>
              <p className="text-sm">
                Amount to deposit:{" "}
                {(
                  TOKEN_AMOUNTS.TOTAL_SUPPLY / DECIMALS_MULTIPLIER
                ).toLocaleString()}{" "}
                ZEXX
              </p>
            </div>
          </div>

          <div className="text-sm space-y-1">
            <p>• Make sure you have enough tokens in your wallet</p>
            <p>• This action cannot be undone</p>
            <p>• Keep some SOL for transaction fees</p>
          </div>

          <Button
            onClick={handleDeposit}
            disabled={
              isDepositing ||
              tokenBalance < TOKEN_AMOUNTS.TOTAL_SUPPLY / DECIMALS_MULTIPLIER
            }
            className="w-full bg-black text-white hover:bg-black/90"
          >
            {isDepositing ? (
              <div className="flex items-center justify-center">
                <Loader size={18} color="#FFFFFF" />
                <span className="ml-2">Depositing Tokens...</span>
              </div>
            ) : tokenBalance <
              TOKEN_AMOUNTS.TOTAL_SUPPLY / DECIMALS_MULTIPLIER ? (
              "Insufficient Token Balance"
            ) : (
              "Deposit Tokens"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
