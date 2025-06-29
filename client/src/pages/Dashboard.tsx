import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fingerprint, QrCode, Wifi, TrendingUp, DollarSign, Activity } from "lucide-react";

interface DashboardData {
  user: {
    balance: string;
    verificationCount: number;
  };
  recentActivity: Array<{
    id: number;
    location: string;
    method: string;
    reward: string;
    createdAt: string;
  }>;
  stats: {
    checkins: number;
    weeklyRewards: string;
    streak: number;
  };
}

export default function Dashboard() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "fingerprint":
        return <Fingerprint className="h-5 w-5 text-cyan-400" />;
      case "qr":
        return <QrCode className="h-5 w-5 text-cyan-400" />;
      case "nfc":
        return <Wifi className="h-5 w-5 text-cyan-400" />;
      default:
        return <Activity className="h-5 w-5 text-cyan-400" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Dashboard</h2>
          <p className="text-gray-400 text-lg">Presence logs, scans, and upcoming rewards</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center text-white">
                  <Activity className="mr-3 text-cyan-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recentActivity?.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center mr-4">
                          {getMethodIcon(activity.method)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{activity.location}</div>
                          <div className="text-gray-400 text-sm">{formatTimeAgo(activity.createdAt)}</div>
                        </div>
                      </div>
                      <div className="text-cyan-400 font-semibold">+{parseFloat(activity.reward).toFixed(0)} VFZ</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold mb-2 text-white">Current Balance</h4>
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {data?.user?.balance ? parseFloat(data.user.balance).toFixed(0) : '0'} VFZ
                </div>
                <div className="text-gray-400 text-sm">
                  ≈ ${data?.user?.balance ? (parseFloat(data.user.balance) * 0.5).toFixed(2) : '0.00'} USD
                </div>
              </CardContent>
            </Card>
            
            {/* Weekly Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Check-ins</span>
                    <span className="font-semibold text-white">{data?.stats?.checkins || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rewards</span>
                    <span className="font-semibold text-cyan-400">{data?.stats?.weeklyRewards || '0'} VFZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Streak</span>
                    <span className="font-semibold text-white">{data?.stats?.streak || 0} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Next Reward */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold mb-2 text-white">Next Reward</h4>
                <div className="text-cyan-400 mb-2">12 hours</div>
                <div className="text-gray-400 text-sm">Daily bonus available</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
