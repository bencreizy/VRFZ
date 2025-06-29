export interface User {
  id: number;
  username: string;
  walletAddress?: string;
  balance: string;
  verificationCount: number;
  lastActivity?: Date;
  createdAt?: Date;
}

export interface Verification {
  id: number;
  userId: number;
  location: string;
  method: string;
  reward: string;
  createdAt?: Date;
}

export interface PresaleSubmission {
  id: number;
  walletAddress: string;
  amount: string;
  tokenAmount: string;
  status: string;
  txHash?: string;
  createdAt?: Date;
}

export interface Settings {
  id: number;
  userId: number;
  verificationMethod: string;
  autoCheckin: boolean;
  rewardNotifications: boolean;
  locationReminders: boolean;
  weeklySummary: boolean;
  anonymousMode: boolean;
  dataSharing: boolean;
}
