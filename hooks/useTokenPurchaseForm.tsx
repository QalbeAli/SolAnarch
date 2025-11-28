import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolanaExplorerLink } from "@/components/ui/SolanaExplorerLink";
import { useToast } from "./use-toast";
import {
  _buyToken,
  getProvider,
  fetchUserInfo,
} from "@/app/context/connection";
import { PresaleInfo, UserInfo } from "@/lib/interface";
import { lamportToSOL } from "@/lib/helper";
import { BuyTokenFormData, BuyTokenSchema } from "@/lib/utils";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { DECIMALS_MULTIPLIER } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const useTokenPurchaseForm = (
  presaleInfo: PresaleInfo | null,
  onPurchaseSuccess: () => void
) => {
  const { toast } = useToast();
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  // Get current phase info
  const currentPhase = presaleInfo?.phases[presaleInfo.currentPhase - 1];

  // Calculate max tokens per address from presale info
  const maxTokenPerAddress = presaleInfo
    ? +lamportToSOL(presaleInfo.maxTokenAmountPerAddress, false)
    : 0;

  // Calculate user limits
  const userTokensBought = useMemo(() => {
    if (!userInfo || !currentPhase) return 0;
    const phaseIndex = currentPhase.phaseNumber - 1;
    return (
      Number(userInfo.phasePurchases[phaseIndex].toString()) / LAMPORTS_PER_SOL
    );
  }, [userInfo, currentPhase]);

  const remainingTokens = useMemo(() => {
    return maxTokenPerAddress - userTokensBought;
  }, [maxTokenPerAddress, userTokensBought]);

  const avaliableTokensInPhase = useMemo(() => {
    return currentPhase?.tokensAvailable / LAMPORTS_PER_SOL;
  }, [currentPhase]);

  const remainingSolLimit = useMemo(() => {
    if (!currentPhase) return 0;
    const pricePerToken =
      Number(currentPhase.price.toString()) / LAMPORTS_PER_SOL;
    return remainingTokens * pricePerToken;
  }, [currentPhase, remainingTokens]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    trigger,
    setValue,
  } = useForm<BuyTokenFormData>({
    resolver: zodResolver(
      BuyTokenSchema(remainingSolLimit, currentPhase?.price)
    ),
    defaultValues: {
      amount: 0,
    },
    mode: "onChange",
  });

  const solAmount = watch("amount");

  const calculateQuantTokenAmount = () => {
    const solAmount = parseFloat(watch("amount")?.toString() || "0");
    if (!currentPhase || isNaN(solAmount) || solAmount <= 0) return "0";

    const pricePerTokenInSol =
      Number(currentPhase.price.toString()) / LAMPORTS_PER_SOL;
    if (pricePerTokenInSol <= 0) return "0";

    // Calculate tokens user would receive for their SOL
    const tokensReceived = Math.min(
      solAmount / pricePerTokenInSol,
      remainingTokens // Ensure we don't exceed remaining token limit
    );

    return tokensReceived.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  };

  // Fetch user info
  useEffect(() => {
    const getUserInfo = async () => {
      if (!publicKey || !program) return;
      try {
        const info = await fetchUserInfo(program, publicKey);
        setUserInfo(info);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUserInfo();
  }, [publicKey, program, onPurchaseSuccess]);

  const setMaxBuyAmount = () => {
    if (!currentPhase) return;
    setValue("amount", remainingSolLimit);
    trigger("amount");
  };

  useEffect(() => {
    trigger();
  }, [presaleInfo, trigger]);

  const onSubmit = async (data: BuyTokenFormData) => {
    if (!publicKey || !program || !currentPhase) {
      toast({
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      const solAmount = data.amount;
      const pricePerToken = currentPhase.price.toString();

      // Calculate tokens with decimals (multiply by DECIMALS_MULTIPLIER)
      const tokensToReceive =
        Math.floor((solAmount * LAMPORTS_PER_SOL) / Number(pricePerToken)) *
        DECIMALS_MULTIPLIER;

      if (tokensToReceive / DECIMALS_MULTIPLIER > avaliableTokensInPhase) {
        toast({
          description: (
            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs">
                <span className="font-bold">
                  Current Phase: {` ${currentPhase.phaseNumber} `}
                </span>
                Only {avaliableTokensInPhase} ZEXX (≈{" "}
                {(avaliableTokensInPhase * pricePerToken) / LAMPORTS_PER_SOL}{" "}
                SOL) are available to buy.
              </p>
              <Button
                size={"sm"}
                variant={"outline"}
                className="text-xs whitespace-nowrap w-20 mt-2 border-2 border-border"
                onClick={() => {
                  const pricePerTokenInSol =
                    Number(currentPhase.price.toString()) / LAMPORTS_PER_SOL;
                  const solAmountForAvailableTokens =
                    avaliableTokensInPhase * pricePerTokenInSol;
                  setValue("amount", solAmountForAvailableTokens);
                  trigger("amount");
                }}
              >
                Set Max to{" "}
                {(avaliableTokensInPhase * pricePerToken) / LAMPORTS_PER_SOL}{" "}
              </Button>
            </div>
          ),
          variant: "info",
        });
        return;
      }

      setIsPurchasing(true);

      const tx = await _buyToken(
        {
          tokenAmount: tokensToReceive,
          solAmount: solAmount,
        },
        publicKey,
        program
      );

      toast({
        title: "Token Purchase Started",
        description: `Purchasing ${(
          tokensToReceive / DECIMALS_MULTIPLIER
        ).toLocaleString()} ZEXX tokens for ${solAmount} SOL`,
        variant: "default",
        action: <SolanaExplorerLink tx={tx} />,
      });

      reset();
      setIsPurchasing(false);
      onPurchaseSuccess();
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message || "Failed to purchase tokens",
        variant: "destructive",
      });
      setIsPurchasing(false);
      console.error("Token purchase error:", error);
    }
  };

  return {
    userInfo,
    control,
    handleSubmit,
    errors,
    isValid,
    calculateQuantTokenAmount,
    onSubmit,
    setMaxBuyAmount,
    solAmount,
    maxTokenPerAddress,
    currentPhase,
    userTokensBought,
    remainingTokens,
    remainingSolLimit,
    isPurchasing,
  };
};

export default useTokenPurchaseForm;
