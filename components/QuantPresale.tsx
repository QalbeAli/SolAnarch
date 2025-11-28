"use client";
import { useState, useEffect, useMemo } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Controller } from "react-hook-form";
import useTokenPurchaseForm from "@/hooks/useTokenPurchaseForm";
import { PresaleInfo } from "@/lib/interface";
import {
  fetchPresaleInfo,
  getReadonlyProvider,
} from "@/app/context/connection";
import Countdown from "react-countdown";
import moment from "moment";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import PresaleNotActiveCard from "./PresaleNotActiveCard";

type PaymentMethod = "SOL" | "ETH" | "BNB" | "USDT" | "USDC" | "CREDIT_CARD";

const CountdownRenderer = ({ days, hours, minutes, seconds }: any) => (
  <>
    {[
      { fullLabel: "Days", shortLabel: "D", value: days },
      { fullLabel: "Hours", shortLabel: "H", value: hours },
      { fullLabel: "Minutes", shortLabel: "M", value: minutes },
      { fullLabel: "Seconds", shortLabel: "S", value: seconds },
    ].map(({ fullLabel, shortLabel, value }) => (
      <div
        key={fullLabel}
        className="text-center border border-gray-300 rounded-lg"
      >
        <div className="bg-gray-50 rounded-lg shadow-sm p-2">
          <div className="text-lg font-bold text-primary">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-600 font-medium uppercase">
            {shortLabel}
          </div>
        </div>
      </div>
    ))}
  </>
);

const QuantPresale = () => {
  const [presaleInfo, setPresaleInfo] = useState<PresaleInfo | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const programReadOnly = useMemo(() => getReadonlyProvider(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("SOL");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const { publicKey, connected, connect } = useWallet();
  const { connection } = useConnection();

  const paymentMethods: { value: PaymentMethod; label: string; icon?: string }[] = [
    { value: "SOL", label: "SOL (Solana)" },
    { value: "ETH", label: "ETH (Ethereum)" },
    { value: "BNB", label: "BNB (BSC)" },
    { value: "USDT", label: "USDT" },
    { value: "USDC", label: "USDC" },
    { value: "CREDIT_CARD", label: "Credit Card" },
  ];

  const {
    control,
    handleSubmit,
    errors,
    isValid,
    calculateQuantTokenAmount,
    onSubmit,
    setMaxBuyAmount,
    userTokensBought,
    remainingTokens,
    remainingSolLimit,
    isPurchasing,
    userInfo,
  } = useTokenPurchaseForm(presaleInfo, () => setPurchaseSuccess(true));

  // Fetch wallet balance
  useEffect(() => {
    const getBalance = async () => {
      if (publicKey && connection) {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      }
    };
    getBalance();
  }, [publicKey, connection]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { presaleInfo: info } = await fetchPresaleInfo(programReadOnly);
        setPresaleInfo(info);
      } catch (error: any) {
        setError(error.message || "Failed to fetch presale information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [programReadOnly, purchaseSuccess]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!presaleInfo) return <PresaleNotActiveCard />;

  const currentPhaseInfo = presaleInfo.phases[presaleInfo.currentPhase - 1];
  const displayPresaleTime = presaleInfo.displayEndTime;

  // Calculate progress value
  const progressValue = currentPhaseInfo
    ? (currentPhaseInfo.tokensSold.toNumber() /
      currentPhaseInfo.amount.toNumber()) *
    100
    : 0;

  // Calculate SOL values for progress display
  const pricePerToken =
    Number(currentPhaseInfo?.price.toString()) / LAMPORTS_PER_SOL;
  const soldTokens =
    Number(currentPhaseInfo?.tokensSold.toString()) / LAMPORTS_PER_SOL;
  const totalTokens =
    Number(currentPhaseInfo?.amount.toString()) / LAMPORTS_PER_SOL;

  // Calculate SOL values
  const soldInSol = soldTokens * pricePerToken;
  const totalInSol = totalTokens * pricePerToken;

  const phaseAvailableTokens = currentPhaseInfo.tokensAvailable.toNumber();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-white p-4 rounded-xl shadow-lg relative border border-gray-200 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            $SOLA CLAIM AND TOKEN NOW LIVE!
          </h1>
          <p className="text-gray-600 mt-1 text-xs">
            ${pricePerToken.toFixed(6)} per $SOLA • Phase {presaleInfo.currentPhase}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          <Countdown
            date={moment.unix(displayPresaleTime).toDate()}
            renderer={CountdownRenderer}
          />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <Progress value={progressValue} className="h-1.5" />
          <div className="flex justify-between mt-1.5 text-xs text-gray-600">
            <span>Progress: <span className="font-semibold text-primary">{progressValue.toFixed(2)}%</span></span>
            <span className="font-semibold text-primary">{soldInSol.toFixed(2)} / {totalInSol.toFixed(2)} SOL</span>
          </div>
        </div>

        {currentPhaseInfo.tokensAvailable.toNumber() > 0 && (
          <div className="flex justify-between text-xs text-gray-600 mb-3">
            <span>Available:</span>
            <span className="font-semibold">{(phaseAvailableTokens / LAMPORTS_PER_SOL).toFixed(0)} $SOLA</span>
          </div>
        )}

        {/* Payment Method Selector */}
        <div className="mb-3 relative">
          <label className="text-xs text-gray-700 mb-1.5 block font-medium">Payment Method</label>
          <button
            type="button"
            onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-300 hover:border-primary transition-colors"
          >
            <span className="text-gray-900 text-xs font-semibold">
              {paymentMethods.find(m => m.value === paymentMethod)?.label}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${showPaymentDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showPaymentDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method.value);
                    setShowPaymentDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${paymentMethod === method.value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-900"
                    }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Calculator Form */}
        <div className="bg-gray-50 rounded-lg p-3 flex-1 flex flex-col min-h-0">
          {connected && paymentMethod === "SOL" && (
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Balance:</span>
                <span className="font-semibold">{balance.toFixed(4)} SOL</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 flex-1 flex flex-col min-h-0">
            <div className="space-y-2">
              <div className="flex-1 w-full">
                <p className="text-gray-700 text-xs mb-1 font-medium">
                  {paymentMethod === "CREDIT_CARD" ? "USD Amount" : `${paymentMethod} Amount`}
                </p>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        step="0.000000001"
                        className="w-full bg-white border-b-2 border-primary py-1.5 focus:outline-none focus:border-primary transition-colors text-gray-900 placeholder-gray-400 text-sm"
                        placeholder={`Enter ${paymentMethod === "CREDIT_CARD" ? "USD" : paymentMethod} amount`}
                      />
                      {paymentMethod === "SOL" && (
                        <button
                          type="button"
                          onClick={setMaxBuyAmount}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xs hover:underline font-semibold"
                        >
                          Max
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex-1 w-full">
                <p className="text-gray-700 text-xs mb-1 font-medium">$SOLA Amount</p>
                <Input
                  type="text"
                  value={calculateQuantTokenAmount()}
                  readOnly
                  className="w-full bg-white border-b-2 border-primary py-1.5 focus:outline-none focus:border-primary transition-colors text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="$SOLA Amount"
                />
              </div>
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount.message}</p>
            )}
            <div className="flex justify-between text-xs text-gray-600">
              <span>Max Limit:</span>
              <span className="font-semibold">
                {remainingTokens?.toLocaleString() || 0} $SOLA
              </span>
            </div>

            {/* Buy Button */}
            <div className="mt-auto pt-2">
              {connected || paymentMethod === "CREDIT_CARD" ? (
                <Button
                  type="submit"
                  variant="presale"
                  className="w-full group disabled:opacity-50 text-xs py-2"
                  disabled={!isValid || isLoading || isPurchasing}
                >
                  <Sparkles
                    className="group-hover:scale-125 transition-transform"
                    size={14}
                  />
                  {isPurchasing ? "Purchasing..." : `Buy $SOLA`}
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={async () => await connect()}
                  className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </form>

          {userInfo && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center text-xs text-gray-600 mb-1.5">
                <span>Purchased:</span>
                <span className="text-primary font-semibold">{userTokensBought.toLocaleString()} $SOLA</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                <span>Stakeable:</span>
                <span className="text-secondary font-semibold">{userTokensBought.toLocaleString()} $SOLA</span>
              </div>
              <Link href="/user-dashboard" className="block">
                <Button size="sm" variant="default" className="w-full text-xs py-1.5">
                  View Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuantPresale;
