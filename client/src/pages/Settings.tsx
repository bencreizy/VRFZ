import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Settings as SettingsIcon, Shield, Bell, Download, RotateCcw, Trash2 } from "lucide-react";

interface SettingsData {
  verificationMethod: string;
  autoCheckin: boolean;
  rewardNotifications: boolean;
  locationReminders: boolean;
  weeklySummary: boolean;
  anonymousMode: boolean;
  dataSharing: boolean;
}

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<SettingsData>({
    queryKey: ["/api/settings"],
  });

  const form = useForm<SettingsData>({
    defaultValues: data,
  });

  const settingsMutation = useMutation({
    mutationFn: async (data: SettingsData) => {
      const response = await apiRequest("POST", "/api/settings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveSettings = () => {
    const formData = form.getValues();
    settingsMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verification Preferences */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center">
                    <SettingsIcon className="mr-3 text-cyan-400" />
                    Verification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-400 mb-3 block">Preferred Method</Label>
                    <RadioGroup 
                      value={form.watch("verificationMethod")} 
                      onValueChange={(value) => form.setValue("verificationMethod", value)}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fingerprint" id="fingerprint" />
                        <Label htmlFor="fingerprint" className="text-white">Fingerprint Scanner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="qr" id="qr" />
                        <Label htmlFor="qr" className="text-white">QR Code</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nfc" id="nfc" />
                        <Label htmlFor="nfc" className="text-white">NFC Tag</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Auto Check-in</div>
                      <div className="text-sm text-gray-400">Automatically verify when near recognized locations</div>
                    </div>
                    <Switch 
                      checked={form.watch("autoCheckin")}
                      onCheckedChange={(checked) => form.setValue("autoCheckin", checked)}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>
            
            {/* Notifications */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center">
                    <Bell className="mr-3 text-cyan-400" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Reward Notifications</div>
                      <div className="text-sm text-gray-400">Get notified when you earn rewards</div>
                    </div>
                    <Switch 
                      checked={form.watch("rewardNotifications")}
                      onCheckedChange={(checked) => form.setValue("rewardNotifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Location Reminders</div>
                      <div className="text-sm text-gray-400">Remind me to check-in at saved locations</div>
                    </div>
                    <Switch 
                      checked={form.watch("locationReminders")}
                      onCheckedChange={(checked) => form.setValue("locationReminders", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Weekly Summary</div>
                      <div className="text-sm text-gray-400">Weekly activity and earnings report</div>
                    </div>
                    <Switch 
                      checked={form.watch("weeklySummary")}
                      onCheckedChange={(checked) => form.setValue("weeklySummary", checked)}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>
            
            {/* Privacy Settings */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center">
                    <Shield className="mr-3 text-cyan-400" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Anonymous Mode</div>
                      <div className="text-sm text-gray-400">Hide your presence from public leaderboards</div>
                    </div>
                    <Switch 
                      checked={form.watch("anonymousMode")}
                      onCheckedChange={(checked) => form.setValue("anonymousMode", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Data Sharing</div>
                      <div className="text-sm text-gray-400">Share anonymized data for ecosystem improvement</div>
                    </div>
                    <Switch 
                      checked={form.watch("dataSharing")}
                      onCheckedChange={(checked) => form.setValue("dataSharing", checked)}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>
            
            {/* Account Management */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white">Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                  >
                    <Download className="mr-3 h-4 w-4 text-cyan-400" />
                    <div className="text-left">
                      <div className="font-medium">Export Data</div>
                      <div className="text-sm text-gray-400">Download your verification history</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                  >
                    <RotateCcw className="mr-3 h-4 w-4 text-cyan-400" />
                    <div className="text-left">
                      <div className="font-medium">Reset Biometric Data</div>
                      <div className="text-sm text-gray-400">Clear stored fingerprint templates</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-red-900/20 border-red-700 hover:border-red-500 text-white"
                  >
                    <Trash2 className="mr-3 h-4 w-4 text-red-400" />
                    <div className="text-left">
                      <div className="font-medium text-red-400">Delete Account</div>
                      <div className="text-sm text-gray-400">Permanently remove your account</div>
                    </div>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
          
          {/* Save Button */}
          <div className="text-center mt-12">
            <Button 
              onClick={handleSaveSettings}
              disabled={settingsMutation.isPending}
              className="py-4 px-12 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-colors"
            >
              {settingsMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
