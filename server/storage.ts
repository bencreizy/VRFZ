import { 
  users, 
  presaleSubmissions, 
  verifications, 
  settings,
  type User, 
  type InsertUser,
  type PresaleSubmission,
  type InsertPresaleSubmission,
  type Verification,
  type InsertVerification,
  type Settings,
  type InsertSettings
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Presale methods
  createPresaleSubmission(submission: InsertPresaleSubmission): Promise<PresaleSubmission>;
  getPresaleSubmissions(): Promise<PresaleSubmission[]>;
  getPresaleSubmissionsByWallet(walletAddress: string): Promise<PresaleSubmission[]>;

  // Verification methods
  createVerification(verification: InsertVerification): Promise<Verification>;
  getVerificationsByUserId(userId: number): Promise<Verification[]>;
  
  // Settings methods
  getUserSettings(userId: number): Promise<Settings | undefined>;
  updateSettings(userId: number, settings: Partial<InsertSettings>): Promise<Settings>;

  // Analytics methods
  getTotalUsers(): Promise<number>;
  getTotalPresaleRevenue(): Promise<string>;
  getActiveUsersToday(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private presaleSubmissions: Map<number, PresaleSubmission>;
  private verifications: Map<number, Verification>;
  private settings: Map<number, Settings>;
  private currentUserId: number;
  private currentPresaleId: number;
  private currentVerificationId: number;
  private currentSettingsId: number;

  constructor() {
    this.users = new Map();
    this.presaleSubmissions = new Map();
    this.verifications = new Map();
    this.settings = new Map();
    this.currentUserId = 1;
    this.currentPresaleId = 1;
    this.currentVerificationId = 1;
    this.currentSettingsId = 1;

    // Add some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample user
    const sampleUser: User = {
      id: 1,
      username: "admin",
      password: "admin123",
      walletAddress: "0x742d35cc6fc9b981c0b72ac085cf1e9c4c9a1f9",
      balance: "847.50000000",
      verificationCount: 23,
      lastActivity: new Date(),
      createdAt: new Date(),
    };
    this.users.set(1, sampleUser);
    this.currentUserId = 2;

    // Add sample verifications
    const sampleVerifications = [
      {
        id: 1,
        userId: 1,
        location: "Downtown Starbucks",
        method: "fingerprint",
        reward: "5.00000000",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: 2,
        userId: 1,
        location: "Metro Station Check-in",
        method: "qr",
        reward: "3.00000000",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
      {
        id: 3,
        userId: 1,
        location: "Office Building NFC",
        method: "nfc",
        reward: "8.00000000",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      },
    ];
    sampleVerifications.forEach(v => this.verifications.set(v.id, v));
    this.currentVerificationId = 4;

    // Add sample presale submissions
    const sampleSubmissions = [
      {
        id: 1,
        walletAddress: "0x742d35cc6fc9b981c0b72ac085cf1e9c4c9a1f9",
        amount: "2.50000000",
        tokenAmount: "50000.00000000",
        status: "confirmed",
        txHash: "0xabc123...",
        createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      },
      {
        id: 2,
        walletAddress: "0x8a3b45cc6fc9b981c0b72ac085cf1e9c4c9c7e2",
        amount: "1.00000000",
        tokenAmount: "20000.00000000",
        status: "confirmed",
        txHash: "0xdef456...",
        createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
      },
    ];
    sampleSubmissions.forEach(s => this.presaleSubmissions.set(s.id, s));
    this.currentPresaleId = 3;

    // Add default settings
    const defaultSettings: Settings = {
      id: 1,
      userId: 1,
      verificationMethod: "fingerprint",
      autoCheckin: false,
      rewardNotifications: true,
      locationReminders: false,
      weeklySummary: true,
      anonymousMode: false,
      dataSharing: true,
    };
    this.settings.set(1, defaultSettings);
    this.currentSettingsId = 2;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      walletAddress: insertUser.walletAddress || null,
      balance: "0",
      verificationCount: 0,
      lastActivity: new Date(),
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createPresaleSubmission(submission: InsertPresaleSubmission): Promise<PresaleSubmission> {
    const id = this.currentPresaleId++;
    const presaleSubmission: PresaleSubmission = {
      ...submission,
      id,
      status: "pending",
      txHash: null,
      createdAt: new Date(),
    };
    this.presaleSubmissions.set(id, presaleSubmission);
    return presaleSubmission;
  }

  async getPresaleSubmissions(): Promise<PresaleSubmission[]> {
    return Array.from(this.presaleSubmissions.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getPresaleSubmissionsByWallet(walletAddress: string): Promise<PresaleSubmission[]> {
    return Array.from(this.presaleSubmissions.values())
      .filter(s => s.walletAddress === walletAddress)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createVerification(verification: InsertVerification): Promise<Verification> {
    const id = this.currentVerificationId++;
    const newVerification: Verification = {
      ...verification,
      id,
      userId: verification.userId || null,
      createdAt: new Date(),
    };
    this.verifications.set(id, newVerification);
    return newVerification;
  }

  async getVerificationsByUserId(userId: number): Promise<Verification[]> {
    return Array.from(this.verifications.values())
      .filter(v => v.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getUserSettings(userId: number): Promise<Settings | undefined> {
    return Array.from(this.settings.values()).find(s => s.userId === userId);
  }

  async updateSettings(userId: number, settingsUpdate: Partial<InsertSettings>): Promise<Settings> {
    let userSettings = await this.getUserSettings(userId);
    
    if (!userSettings) {
      const id = this.currentSettingsId++;
      userSettings = {
        id,
        userId,
        verificationMethod: "fingerprint",
        autoCheckin: false,
        rewardNotifications: true,
        locationReminders: false,
        weeklySummary: true,
        anonymousMode: false,
        dataSharing: true,
        ...settingsUpdate,
      };
    } else {
      userSettings = { ...userSettings, ...settingsUpdate };
    }
    
    this.settings.set(userSettings.id, userSettings);
    return userSettings;
  }

  async getTotalUsers(): Promise<number> {
    return this.users.size;
  }

  async getTotalPresaleRevenue(): Promise<string> {
    const total = Array.from(this.presaleSubmissions.values())
      .filter(s => s.status === "confirmed")
      .reduce((sum, s) => sum + parseFloat(s.amount), 0);
    return total.toFixed(8);
  }

  async getActiveUsersToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return Array.from(this.users.values())
      .filter(u => u.lastActivity && u.lastActivity >= today)
      .length;
  }
}

export const storage = new MemStorage();
