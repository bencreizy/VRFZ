import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { DollarSign, TrendingUp, Users } from "lucide-react";

const presaleSchema = z.object({
  walletAddress: z.string().min(42, "Valid wallet address required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address format"),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return num >= 0.1 && num <= 100;
  }, "Amount must be between 0.1 and 100 ETH"),
});

type PresaleFormData = z.infer<typeof presaleSchema>;

interface PresaleData {
  submissions: Array<{
    id: number;
    walletAddress: string;
    amount: string;
    tokenAmount: string;
    createdAt: string;
  }>;
  stats: {
    tokensRemaining: string;
    currentPrice: string;
    totalRaised: string;
  };
}

export default function Presale() {
  const [calculatedTokens, setCalculatedTokens] = useState("0");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PresaleData>({
    queryKey: ["/api/presale"],
  });

  const form = useForm<PresaleFormData>({
    resolver: zodResolver(presaleSchema),
    defaultValues: {
      walletAddress: "",
      amount: "",
    },
  });

  const presaleMutation = useMutation({
    mutationFn: async (data: PresaleFormData) => {
      const response = await apiRequest("POST", "/api/presale", {
        walletAddress: data.walletAddress,
        amount: data.amount,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Presale Submission Successful!",
        description: "Your tokens will be distributed post-deployment.",
      });
      form.reset();
      setCalculatedTokens("0");
      queryClient.invalidateQueries({ queryKey: ["/api/presale"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please check your wallet address and try again.",
        variant: "destructive",
      });
    },
  });

  const watchAmount = form.watch("amount");

  // Calculate tokens when amount changes
  useState(() => {
    if (watchAmount && !isNaN(parseFloat(watchAmount))) {
      const tokens = (parseFloat(watchAmount) * 20000).toLocaleString();
      setCalculatedTokens(tokens);
    } else {
      setCalculatedTokens("0");
    }
  });

  const onSubmit = (data: PresaleFormData) => {
    presaleMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Token Presale</h2>
          <p className="text-gray-400 text-lg mb-12">Join the VeriFyz ecosystem and earn rewards for verified presence</p>
          
          {/* Presale Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {data?.stats?.tokensRemaining ? parseFloat(data.stats.tokensRemaining).toLocaleString() : '2,500,000'}M
                </div>
                <div className="text-gray-400">Tokens Remaining</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  ${data?.stats?.currentPrice || '0.05'}
                </div>
                <div className="text-gray-400">Current Price</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  ${data?.stats?.totalRaised ? parseFloat(data.stats.totalRaised).toLocaleString() : '875,000'}K
                </div>
                <div className="text-gray-400">Total Raised</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Presale Form */}
          <Card className="gradient-border max-w-md mx-auto">
            <div className="gradient-border-content">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center text-white">Purchase VFZ Tokens</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Wallet Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0x..." 
                              className="bg-gray-900 border-gray-700 text-white focus:border-cyan-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Amount (ETH)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0.1" 
                              max="100"
                              placeholder="0.1" 
                              className="bg-gray-900 border-gray-700 text-white focus:border-cyan-400"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value && !isNaN(parseFloat(e.target.value))) {
                                  const tokens = (parseFloat(e.target.value) * 20000).toLocaleString();
                                  setCalculatedTokens(tokens);
                                } else {
                                  setCalculatedTokens("0");
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="text-sm text-gray-400 p-4 bg-gray-900 rounded-lg">
                      <div className="flex justify-between">
                        <span>You will receive:</span>
                        <span className="text-cyan-400 font-semibold">{calculatedTokens} VFZ</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full py-4 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-colors"
                      disabled={presaleMutation.isPending}
                    >
                      {presaleMutation.isPending ? "Processing..." : "Purchase Tokens"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 text-xs text-gray-500 text-center">
                  <p>By participating you agree to the terms of the presale.</p>
                  <p>Tokens will be distributed post-deployment.</p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
