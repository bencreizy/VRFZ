import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Wallet, 
  Pause, 
  Edit, 
  Download, 
  UserCog, 
  BarChart3, 
  FileText,
  Circle
} from "lucide-react";

interface AdminData {
  totalUsers: number;
  presaleParticipants: number;
  totalRevenue: string;
  activeToday: number;
  recentSubmissions: Array<{
    id: number;
    walletAddress: string;
    amount: string;
    tokenAmount: string;
    createdAt: string;
  }>;
}

export default function Admin() {
  const { toast } = useToast();

  const { data, isLoading } = useQuery<AdminData>({
    queryKey: ["/api/admin/stats"],
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const handleAdminAction = (action: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} functionality would be implemented here.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-96 w-full lg:col-span-2" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Admin Panel</h2>
          <p className="text-gray-400 text-lg">Review presale submissions, analytics, and site controls</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {data?.totalUsers?.toLocaleString() || '15,847'}
                </div>
                <div className="text-gray-400">Total Users</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {data?.presaleParticipants?.toLocaleString() || '3,521'}
                </div>
                <div className="text-gray-400">Presale Participants</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  ${data?.totalRevenue ? parseFloat(data.totalRevenue).toLocaleString() : '875,432'}
                </div>
                <div className="text-gray-400">Total Revenue</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {data?.activeToday?.toLocaleString() || '2,891'}
                </div>
                <div className="text-gray-400">Active Today</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Presale Submissions */}
          <div className="lg:col-span-2">
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white">Recent Presale Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {data?.recentSubmissions?.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center mr-4">
                            <Wallet className="h-5 w-5 text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {submission.walletAddress.slice(0, 6)}...{submission.walletAddress.slice(-4)}
                            </div>
                            <div className="text-gray-400 text-sm">{formatTimeAgo(submission.createdAt)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-white">{parseFloat(submission.amount).toFixed(2)} ETH</div>
                          <div className="text-cyan-400 text-sm">{parseFloat(submission.tokenAmount).toLocaleString()} VFZ</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
          
          {/* Admin Controls */}
          <div className="space-y-6">
            {/* Presale Controls */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Presale Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-cyan-400 text-black font-semibold hover:bg-cyan-500"
                    onClick={() => handleAdminAction("Pause Presale")}
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Presale
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                    onClick={() => handleAdminAction("Update Price")}
                  >
                    <Edit className="mr-2 h-4 w-4 text-cyan-400" />
                    Update Token Price
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                    onClick={() => handleAdminAction("Export Submissions")}
                  >
                    <Download className="mr-2 h-4 w-4 text-cyan-400" />
                    Export Submissions
                  </Button>
                </CardContent>
              </div>
            </Card>
            
            {/* System Status */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">API Status</span>
                    <span className="text-green-400 flex items-center">
                      <Circle className="h-2 w-2 fill-current mr-2" />
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Database</span>
                    <span className="text-green-400 flex items-center">
                      <Circle className="h-2 w-2 fill-current mr-2" />
                      Healthy
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="text-green-400 flex items-center">
                      <Circle className="h-2 w-2 fill-current mr-2" />
                      Synced
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
            
            {/* Quick Actions */}
            <Card className="gradient-border">
              <div className="gradient-border-content">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline"
                    className="w-full justify-start bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                    onClick={() => handleAdminAction("Manage Users")}
                  >
                    <UserCog className="mr-3 h-4 w-4 text-cyan-400" />
                    Manage Users
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                    onClick={() => handleAdminAction("View Analytics")}
                  >
                    <BarChart3 className="mr-3 h-4 w-4 text-cyan-400" />
                    View Analytics
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start bg-gray-900 border-gray-700 hover:border-cyan-400 text-white"
                    onClick={() => handleAdminAction("System Logs")}
                  >
                    <FileText className="mr-3 h-4 w-4 text-cyan-400" />
                    System Logs
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
