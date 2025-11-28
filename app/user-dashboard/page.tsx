"use client";
import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  fetchPresaleInfo,
  fetchUserInfo,
  _claimToken,
  getProvider,
} from "@/app/context/connection";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SolanaExplorerLink } from "@/components/ui/SolanaExplorerLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DECIMALS_MULTIPLIER } from "@/lib/constants";
import { PhaseStatus, Phase } from "@/lib/interface";

export default function UserDashboard() {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [presaleInfo, setPresaleInfo] = useState<any>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const { toast } = useToast();

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!publicKey || !program) return;
      try {
        const { presaleInfo: info } = await fetchPresaleInfo(program);
        const userInfo = await fetchUserInfo(program, publicKey);
        setPresaleInfo(info);
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [publicKey, program]);

  const handleClaim = async (index: number) => {
    if (!publicKey || !program) {
      toast({
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsClaiming(true);
      // Note: phase numbers in the contract are 1-based, so we add 1 to the index
      const tx = await _claimToken(program, publicKey, index + 1);
      toast({
        title: "Claim Started",
        description: "Your tokens are being claimed",
        variant: "default",
        action: <SolanaExplorerLink tx={tx} />,
      });

      // Refresh user data after successful claim
      const userInfo = await fetchUserInfo(program, publicKey);
      setUserInfo(userInfo);
    } catch (error: any) {
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim tokens",
        variant: "destructive",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  // Add helper function to get status display
  const getPhaseStatusDisplay = (phase: Phase) => {
    if (phase.status.active) {
      return <span className="text-blue-500 font-medium">Active</span>;
    } else if (phase.status.ended) {
      return <span className="text-gray-500 font-medium">Ended</span>;
    } else if (phase.status.upcoming) {
      return <span className="text-yellow-500 font-medium">Upcoming</span>;
    }
    return <span className="text-gray-400">Unknown</span>;
  };

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please Connect Your Wallet
          </h1>
          <p className="text-gray-500">
            Connect your wallet to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20  mt-20">
      <h1 className="text-2xl font-bold mb-4">Your ZEXXCOIN Dashboard</h1>
      <div className="bg-card rounded-lg p-6 mb-8 bg-gradient-to-r from-primary to-secondary text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm text-white">Total Tokens Bought</h3>
            <p className="text-2xl font-bold">
              {userInfo
                ? (
                    Number(userInfo.tokensBought) / LAMPORTS_PER_SOL
                  ).toLocaleString()
                : "0"}{" "}
              ZEXX
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm text-white">Total Amount Paid</h3>
            <p className="text-2xl font-bold">
              {userInfo
                ? (
                    Number(userInfo.totalPaid) / LAMPORTS_PER_SOL
                  ).toLocaleString()
                : "0"}{" "}
              SOL
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm text-white">Claim Status</h3>
            <p className="text-2xl font-bold">
              {userInfo?.phaseClaims.every((claimed: boolean) => claimed)
                ? "All Claimed"
                : `${
                    userInfo?.phaseClaims.filter((c: boolean) => c).length || 0
                  }/${userInfo?.phaseClaims.length} Phases Claimed`}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phase</TableHead>
                <TableHead>Tokens Purchased</TableHead>
                <TableHead>Price per Token</TableHead>
                <TableHead>Total Paid</TableHead>
                <TableHead> Claim Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInfo?.phasePurchases.map((amount: any, index: number) => {
                const phase = presaleInfo?.phases[index];
                const tokenAmount = amount.toNumber() / DECIMALS_MULTIPLIER;
                const pricePerToken =
                  phase?.price.toNumber() / LAMPORTS_PER_SOL;
                const totalPaid = tokenAmount * pricePerToken;
                const isClaimed = userInfo.phaseClaims[index];

                // Only show status if there was a purchase in this phase
                const hadPurchase = amount.toNumber() > 0;

                return (
                  <TableRow key={index}>
                    <TableCell>
                      Phase {index + 1}
                      <span className="ml-2 text-xs">
                        {getPhaseStatusDisplay(phase)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {hadPurchase
                        ? `${tokenAmount.toLocaleString()} ZEXX`
                        : "-"}
                    </TableCell>
                    <TableCell>{pricePerToken.toFixed(6)} SOL</TableCell>
                    <TableCell>
                      {hadPurchase ? `${totalPaid.toFixed(4)} SOL` : "-"}
                    </TableCell>
                    <TableCell>
                      {hadPurchase ? (
                        isClaimed ? (
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 font-medium">
                              Claimed
                            </span>
                            <span className="text-sm text-gray-400">
                              ({tokenAmount.toLocaleString()} ZEXX)
                            </span>
                          </div>
                        ) : phase.status.ended ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleClaim(index)}
                            disabled={isClaiming || !phase.status.ended}
                          >
                            {isClaiming ? "Claiming..." : "Claim"}
                          </Button>
                        ) : (
                          <span className="text-yellow-500">
                            {phase.status.active
                              ? "Waiting for phase to end"
                              : phase.status.upcoming
                              ? "Phase not started"
                              : "Status unknown"}
                          </span>
                        )
                      ) : (
                        <span className="text-gray-500">No Purchase</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
