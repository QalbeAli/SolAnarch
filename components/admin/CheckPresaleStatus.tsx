"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import PreSaleCreationForm from "./CreatePresale";
import {
  fetchPresaleInfo,
  getReadonlyProvider,
  _withdrawSol,
  getPresaleVaultBalance,
  getProvider,
} from "@/app/context/connection";
import { lamportToSOL, shortenAddress } from "@/lib/helper";
import { PresaleInfo } from "@/lib/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DECIMALS_MULTIPLIER } from "@/lib/constants";
import DepositToken from "./DepositToken";

export default function PresalePage(): React.JSX.Element {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const programReadOnly = useMemo(() => getReadonlyProvider(), []);
  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );
  const [presaleInfo, setPresaleInfo] = useState<PresaleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { connection } = useConnection();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const { toast } = useToast();
  const [vaultBalance, setVaultBalance] = useState<number>(0);

  const fetchData = async () => {
    try {
      if (!programReadOnly) {
        setError("Unable to create read-only provider");
        setIsLoading(false);
        return;
      }

      const { presaleInfo } = await fetchPresaleInfo(programReadOnly);
      setPresaleInfo(presaleInfo);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Fetch data error:", error);
        setError(error.message || "An error occurred while fetching data.");
      } else {
        console.error("Fetch data error:", error);
        setError("An unknown error occurred while fetching data.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!programReadOnly) return;
    fetchData();
  }, [programReadOnly]);

  useEffect(() => {
    const getBalance = async () => {
      if (!publicKey) return;
      try {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    getBalance();
    const intervalId = setInterval(getBalance, 10000);
    return () => clearInterval(intervalId);
  }, [publicKey, connection]);

  useEffect(() => {
    const getVaultBalance = async () => {
      if (!programReadOnly) return;
      try {
        const balance = await getPresaleVaultBalance(programReadOnly);
        setVaultBalance(balance);
      } catch (error) {
        console.error("Error fetching vault balance:", error);
      }
    };

    getVaultBalance();
    const intervalId = setInterval(getVaultBalance, 10000);
    return () => clearInterval(intervalId);
  }, [programReadOnly]);

  const handleWithdraw = async () => {
    if (!publicKey || !program) {
      toast({
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsWithdrawing(true);
      const tx = await _withdrawSol(program, publicKey);

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });

      toast({
        title: "Withdrawal Successful",
        description: `${vaultBalance.toFixed(
          4
        )} SOL has been withdrawn to your wallet`,
        variant: "default",
      });

      const newWalletBalance = await connection.getBalance(publicKey);
      setWalletBalance(newWalletBalance / LAMPORTS_PER_SOL);

      const newVaultBalance = await getPresaleVaultBalance(programReadOnly);
      setVaultBalance(newVaultBalance);
    } catch (error: any) {
      let errorMessage = "Failed to withdraw SOL";

      if (error.message?.includes("EmptyVault")) {
        errorMessage = "The vault is empty. No SOL to withdraw.";
      } else if (error.message?.includes("InvalidAuthority")) {
        errorMessage = "Only the presale authority can withdraw SOL.";
      } else if (error.message?.includes("cannot sign")) {
        errorMessage = "Please connect a wallet with signing capabilities.";
      }

      console.error("Withdrawal error:", error);
      toast({
        title: "Withdrawal Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="text-center mt-10">
        <p className="text-3xl font-bold">
          Please connect your wallet to proceed
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto p-6 space-y-6 ">
      {presaleInfo ? (
        presaleInfo.isActive ? (
          <div className="grid gap-6">
            <Card className="bg-gradient-to-r from-primary to-secondary text-black">
              <CardHeader>
                <CardTitle>General Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm">Token Mint:</p>
                    <p className="font-medium">
                      {shortenAddress(presaleInfo.tokenMintAddress.toBase58())}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Total Supply:</p>
                    <p className="font-medium">
                      {lamportToSOL(presaleInfo.totalTokenSupply, false)} ZEXX
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Current Phase:</p>
                    <p className="font-medium">{presaleInfo.currentPhase}</p>
                  </div>
                  <div>
                    <p className="text-sm">Max Per Address:</p>
                    <p className="font-medium">
                      {lamportToSOL(
                        presaleInfo.maxTokenAmountPerAddress,
                        false
                      )}{" "}
                      ZEXX
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary to-secondary text-black">
              <CardHeader>
                <CardTitle>Phase Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phase</TableHead>
                      <TableHead>Price (SOL)</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Sold</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {presaleInfo.phases.map((phase, index) => {
                      return (
                        <TableRow
                          key={index}
                          className={
                            index + 1 === presaleInfo.currentPhase
                              ? "bg-green-500"
                              : ""
                          }
                        >
                          <TableCell>Phase {index + 1}</TableCell>
                          <TableCell>
                            {phase.price.toNumber() / LAMPORTS_PER_SOL}
                          </TableCell>
                          <TableCell>
                            {(
                              phase.tokensAvailable.toNumber() /
                              DECIMALS_MULTIPLIER
                            ).toFixed(4)}{" "}
                            ZEXX
                          </TableCell>
                          <TableCell>
                            {(
                              phase.tokensSold.toNumber() / DECIMALS_MULTIPLIER
                            ).toFixed(4)}{" "}
                            ZEXX
                          </TableCell>
                          <TableCell>
                            {index + 1 === presaleInfo.currentPhase
                              ? "Active"
                              : index + 1 < presaleInfo.currentPhase
                              ? "Completed"
                              : "Upcoming"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary to-secondary text-black">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm">Total Tokens Sold:</p>
                    <p className="font-medium">
                      {lamportToSOL(presaleInfo.totalTokensSold, false)} ZEXX
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Total Tokens Deposited:</p>
                    <p className="font-medium">
                      {lamportToSOL(presaleInfo.totalTokensDeposited, false)}{" "}
                      ZEXX
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Status:</p>
                    <p className="font-medium">
                      {presaleInfo.isEnded ? "Ended" : "Active"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {presaleInfo?.isActive && (
              <Card className="bg-gradient-to-r from-primary to-secondary text-black">
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          My Wallet Balance
                        </h3>
                        <p className="text-2xl font-bold">
                          {walletBalance.toFixed(4)} SOL
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Presale Vault Balance
                        </h3>
                        <p className="text-2xl font-bold text-gray-600">
                          {vaultBalance.toFixed(4)} SOL
                        </p>
                        <p className="text-sm text-gray-600">
                          Total funds raised
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end gap-4">
                      <div className="text-sm space-y-1">
                        <p>
                          • You can withdraw {vaultBalance.toFixed(4)} SOL from
                          presale vault
                        </p>
                        <p>• Make sure to keep some SOL for transaction fees</p>
                      </div>
                      <Button
                        onClick={handleWithdraw}
                        disabled={isWithdrawing || vaultBalance === 0}
                        className="w-full bg-black text-white hover:bg-black/90"
                      >
                        {isWithdrawing ? (
                          <div className="flex items-center justify-center">
                            <span className="mr-2">Withdrawing...</span>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"></div>
                          </div>
                        ) : (
                          `Withdraw ${vaultBalance.toFixed(4)} SOL`
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {presaleInfo?.isActive &&
              !presaleInfo.totalTokensDeposited.toNumber() && <DepositToken />}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-primary mb-2">
                Presale is not Live!
              </p>
              <p className="text-gray-500">
                Please start the presale to proceed
              </p>
            </CardContent>
          </Card>
        )
      ) : (
        <div>
          <Card className="mb-6 bg-white text-">
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Presale is not Active!
              </p>
              <p className="text-gray-500">
                Please create and start the presale to proceed
              </p>
            </CardContent>
          </Card>
          <PreSaleCreationForm />
        </div>
      )}
    </div>
  );
}
