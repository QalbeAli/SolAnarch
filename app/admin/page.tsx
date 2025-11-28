"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import AdminAuth from "@/components/admin/AdminAuth";
import CheckPresaleStatus from "@/components/admin/CheckPresaleStatus";
import { useWallet } from "@solana/wallet-adapter-react";
import { AUTHORITY } from "@/lib/constants";
import EmergencyControls from "@/components/admin/EmergencyControls";
import {
  fetchPresaleInfo,
  getProvider,
  getReadonlyProvider,
} from "@/app/context/connection";
import { PresaleInfo } from "@/lib/interface";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { publicKey, connected, signTransaction, sendTransaction } =
    useWallet();
  const [presaleInfo, setPresaleInfo] = useState<PresaleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const programReadOnly = useMemo(() => getReadonlyProvider(), []);

  const fetchData = async () => {
    try {
      if (!programReadOnly) {
        setError("Unable to create read-only provider");
        setIsLoading(false);
        return;
      }

      const { presaleInfo: info } = await fetchPresaleInfo(programReadOnly);
      setPresaleInfo(info);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred while fetching data.");
      } else {
        setError("An unknown error occurred while fetching data.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check both authentication and wallet
    const authState = localStorage.getItem("adminAuthenticated");
    const storedWallet = localStorage.getItem("adminWallet");

    if (
      authState === "true" &&
      connected &&
      publicKey &&
      publicKey.toString() === AUTHORITY.toString() &&
      storedWallet === publicKey.toString()
    ) {
      setIsAuthenticated(true);
    } else {
      // Clear auth if wallet doesn't match
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminWallet");
      setIsAuthenticated(false);
    }
  }, [publicKey, connected]);

  useEffect(() => {
    if (!programReadOnly) return;
    fetchData();
  }, [programReadOnly]);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminWallet");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center mt-10">Loading presale information...</div>
    );
  }

  return (
    <div className="w-full max-w-7xl mt-40 mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Admin: {publicKey?.toString().slice(0, 4)}...
            {publicKey?.toString().slice(-4)}
          </span>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {presaleInfo && (
        <div className="space-y-6">
          <CheckPresaleStatus />
          <EmergencyControls presaleInfo={presaleInfo} onUpdate={fetchData} />
        </div>
      )}
    </div>
  );
}
