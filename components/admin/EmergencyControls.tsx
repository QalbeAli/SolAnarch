"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { _emergencyStop, _resumePresale } from "@/app/context/connection";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { getProvider } from "@/app/context/connection";

interface EmergencyControlsProps {
  presaleInfo: any;
  onUpdate: () => void;
}

export default function EmergencyControls({
  presaleInfo,
  onUpdate,
}: EmergencyControlsProps) {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newEndTime, setNewEndTime] = useState("");
  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const handleEmergencyStop = async () => {
    if (!publicKey || !program) return;

    try {
      setIsLoading(true);
      const tx = await _emergencyStop(program, publicKey);

      toast({
        title: "Presale Stopped",
        description: "The presale has been emergency stopped.",
      });

      onUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumePresale = async () => {
    if (!publicKey || !program) return;
    if (!newEndTime) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please set a new end time",
      });
      return;
    }

    const endTimeDate = new Date(newEndTime);
    if (endTimeDate.getTime() <= Date.now() + 60 * 60 * 1000) {
      toast({
        variant: "destructive",
        title: "Invalid End Time",
        description: "End time must be at least 1 hour in the future",
      });
      return;
    }

    try {
      setIsLoading(true);
      const tx = await _resumePresale(
        program,
        publicKey,
        endTimeDate.getTime()
      );

      toast({
        title: "Presale Resumed",
        description: "The presale has been resumed with new end time.",
      });

      onUpdate();
      setNewEndTime("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-primary to-secondary text-black">
      <CardHeader>
        <CardTitle className="text-red-600">Emergency Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Presale Status</h3>
            <p className="text-sm text-gray-500">
              {presaleInfo?.isPaused ? "Paused" : "Active"}
            </p>
          </div>
          {!presaleInfo?.isPaused ? (
            <Button
              variant="outline"
              onClick={handleEmergencyStop}
              disabled={isLoading || !presaleInfo?.isActive}
            >
              Emergency Stop
            </Button>
          ) : (
            <div className="space-y-2 w-full max-w-md">
              <Input
                type="datetime-local"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                min={new Date(Date.now() + 60 * 60 * 1000)
                  .toISOString()
                  .slice(0, 16)}
                className="w-full"
              />
              <Button
                variant="outline"
                onClick={handleResumePresale}
                disabled={isLoading || !newEndTime}
                className="w-full"
              >
                Resume Presale
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
