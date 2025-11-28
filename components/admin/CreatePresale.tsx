"use client";
import { JSX, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWallet } from "@solana/wallet-adapter-react";
import { PreSaleFormData, PreSaleSchema } from "@/lib/utils";
import { _createPresale, getProvider } from "@/app/context/connection";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOKEN_MINT } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function PreSaleCreationForm(): JSX.Element {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PreSaleFormData>({
    resolver: zodResolver(PreSaleSchema),
    defaultValues: {
      tokenMintAddress: TOKEN_MINT.toBase58(),
      maxTokenAmountPerAddress: 20_000,
      displayEndTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // Default to 7 days from now
    },
  });

  const onSubmit = async (data: PreSaleFormData) => {
    if (!publicKey || !program) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet to create the presale.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const tx = await _createPresale(data, publicKey, program);

      const connection = program.provider.connection;
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });

      toast({
        title: "Presale created successfully!",
        description: "The presale has been initialized and is now active.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating presale",
        description: error.message || "Failed to create presale",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-secondary text-black">
      <CardHeader>
        <CardTitle>Create ZEXXCOIN Presale</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Token Mint Address
              </label>
              <Controller
                name="tokenMintAddress"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-2 border rounded bg-gray-100"
                    value={TOKEN_MINT.toBase58()}
                    readOnly
                  />
                )}
              />
              {errors.tokenMintAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.tokenMintAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Max Tokens Per Address
              </label>
              <Controller
                name="maxTokenAmountPerAddress"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    {...field}
                    type="number"
                    className={`w-full p-2 border rounded ${
                      errors.maxTokenAmountPerAddress ? "border-red-500" : ""
                    }`}
                    placeholder="Enter max tokens per address"
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) : 0;
                      onChange(val);
                    }}
                  />
                )}
              />
              {errors.maxTokenAmountPerAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxTokenAmountPerAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">End Time</label>
              <Controller
                name="displayEndTime"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div>
                    <input
                      {...field}
                      type="datetime-local"
                      className={`w-full p-2 border rounded ${
                        errors.displayEndTime ? "border-red-500" : ""
                      }`}
                      min={new Date(Date.now() + 60 * 60 * 1000)
                        .toISOString()
                        .slice(0, 16)}
                      value={new Date(value).toISOString().slice(0, 16)}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (isNaN(date.getTime())) {
                          toast({
                            title: "Invalid Date",
                            description: "Please enter a valid date and time",
                            variant: "destructive",
                          });
                          return;
                        }
                        onChange(date.getTime());
                      }}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Must be at least 1 hour from now
                    </p>
                  </div>
                )}
              />
              {errors.displayEndTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.displayEndTime.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
            className="w-full bg-black text-white hover:bg-black/90 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader size={18} color="#FFFFFF" />
                <span className="ml-2">Creating...</span>
              </div>
            ) : (
              "Create Presale"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
