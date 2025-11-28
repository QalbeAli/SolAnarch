"use client";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import Countdown from "react-countdown";
import moment from "moment";

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

const PresaleNotActiveCard = () => {
  const FIVE_DAYS_IN_SECONDS = 5 * 24 * 60 * 60;

  const staticPhaseInfo = {
    phase: 1,
    price: 0.19999,
    soldTokens: 0,
    totalTokens: 50_000_000,
  };

  // Calculate static values
  const progressValue = 0;
  const pricePerToken = staticPhaseInfo.price;
  const soldInSol = 0;
  const totalInSol = staticPhaseInfo.totalTokens * staticPhaseInfo.price;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-white p-4 rounded-xl shadow-lg relative border border-gray-200 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            $SOLA Presale - Phase {staticPhaseInfo.phase}
          </h1>
          <p className="text-gray-600 mt-1 text-xs">
            Starting Price: <span className="font-semibold text-primary">${pricePerToken} per $SOLA</span>
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          <Countdown
            date={moment().add(FIVE_DAYS_IN_SECONDS, "seconds").toDate()}
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

        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <span>Available:</span>
          <span className="font-semibold">{staticPhaseInfo.totalTokens.toLocaleString()} $SOLA</span>
        </div>

        {/* Calculator Form */}
        <div className="bg-gray-50 rounded-lg p-3 flex-1 flex flex-col min-h-0">
          <div className="space-y-2.5 flex-1 flex flex-col">
            <div className="space-y-2">
              <div className="flex-1 w-full">
                <p className="text-gray-700 text-xs mb-1 font-medium">SOL Amount</p>
                <Input
                  type="number"
                  disabled
                  className="w-full bg-white border-b-2 border-gray-300 py-1.5 text-gray-400 text-sm"
                  placeholder="Presale not active"
                />
              </div>
              <div className="flex-1 w-full">
                <p className="text-gray-700 text-xs mb-1 font-medium">$SOLA Amount</p>
                <Input
                  type="text"
                  disabled
                  className="w-full bg-white border-b-2 border-gray-300 py-1.5 text-gray-400 text-sm"
                  placeholder="0 $SOLA"
                />
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>Max Limit:</span>
              <span className="font-semibold">20,000 $SOLA</span>
            </div>

            {/* Buy Button */}
            <div className="mt-auto pt-2">
              <Button
                type="button"
                variant="presale"
                className="w-full group text-xs py-2"
                disabled
              >
                <Sparkles
                  className="group-hover:scale-125 transition-transform"
                  size={14}
                />
                Presale Not Active
              </Button>
            </div>

            <div className="text-center mt-3 p-2.5 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-700 leading-snug">
                The presale will be activated soon. Please check back later or
                follow our social media for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleNotActiveCard;
