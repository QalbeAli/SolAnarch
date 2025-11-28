"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ADMIN_PASSWORD, AUTHORITY } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { publicKey, connected } = useWallet();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    if (!connected || !publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      setIsChecking(false);
      return;
    }

    // Check both wallet and password
    if (publicKey.toString() !== AUTHORITY.toString()) {
      toast({
        title: "Access Denied",
        description: "This wallet is not authorized for admin access",
        variant: "destructive",
      });
      setIsChecking(false);
      return;
    }

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuthenticated", "true");
      localStorage.setItem("adminWallet", publicKey.toString());
      onAuthenticated();
      toast({
        title: "Success",
        description: "Admin access granted",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive",
      });
    }
    setIsChecking(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-auto mt-40 ">
        <CardHeader>
          <CardTitle>Admin Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="text-center text-red-500 mb-4">
              Please connect your wallet first
            </div>
          ) : publicKey?.toString() !== AUTHORITY.toString() ? (
            <div className="text-center text-red-500 mb-4">
              Connected wallet is not authorized for admin access
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-500 mb-2">
                  Connected as: {publicKey?.toString().slice(0, 4)}...
                  {publicKey?.toString().slice(-4)}
                </div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isChecking || !password}
              >
                {isChecking ? "Verifying..." : "Access Admin Panel"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
