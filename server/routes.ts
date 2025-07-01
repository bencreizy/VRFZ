import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPresaleSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint - explicit handler
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
    return;
  });

  // API router to group all API routes
  const apiRouter = app;

  // Get dashboard data
  app.get("/api/dashboard", async (req, res) => {
    try {
      const userId = 1; // Mock user ID - in real app this would come from auth
      
      const user = await storage.getUser(userId);
      const verifications = await storage.getVerificationsByUserId(userId);
      const recentActivity = verifications.slice(0, 10);
      
      // Calculate weekly stats
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const weeklyVerifications = verifications.filter(v => v.createdAt! >= weekAgo);
      const weeklyRewards = weeklyVerifications.reduce((sum, v) => sum + parseFloat(v.reward), 0);
      
      res.json({
        user,
        recentActivity,
        stats: {
          checkins: weeklyVerifications.length,
          weeklyRewards: weeklyRewards.toFixed(2),
          streak: 7, // Mock streak
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Submit presale
  app.post("/api/presale", async (req, res) => {
    try {
      const validatedData = insertPresaleSubmissionSchema.parse(req.body);
      
      // Calculate token amount (mock rate: 1 ETH = 20,000 VFZ)
      const tokenAmount = (parseFloat(validatedData.amount) * 20000).toFixed(8);
      
      const submission = await storage.createPresaleSubmission({
        ...validatedData,
        tokenAmount,
      });
      
      res.json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid submission data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit presale" });
      }
    }
  });

  // Get presale data
  app.get("/api/presale", async (req, res) => {
    try {
      const submissions = await storage.getPresaleSubmissions();
      const totalRevenue = await storage.getTotalPresaleRevenue();
      
      res.json({
        submissions: submissions.slice(0, 20), // Recent 20 submissions
        stats: {
          tokensRemaining: "2500000",
          currentPrice: "0.05",
          totalRaised: (parseFloat(totalRevenue) * 2000).toFixed(0), // Convert ETH to USD estimate
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch presale data" });
    }
  });

  // Get user settings
  app.get("/api/settings", async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const settings = await storage.getUserSettings(userId);
      
      if (!settings) {
        // Return default settings
        res.json({
          verificationMethod: "fingerprint",
          autoCheckin: false,
          rewardNotifications: true,
          locationReminders: false,
          weeklySummary: true,
          anonymousMode: false,
          dataSharing: true,
        });
      } else {
        res.json(settings);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Update settings
  app.post("/api/settings", async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const settings = await storage.updateSettings(userId, req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  // Admin statistics
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const totalUsers = await storage.getTotalUsers();
      const presaleSubmissions = await storage.getPresaleSubmissions();
      const totalRevenue = await storage.getTotalPresaleRevenue();
      const activeToday = await storage.getActiveUsersToday();
      
      res.json({
        totalUsers,
        presaleParticipants: presaleSubmissions.length,
        totalRevenue: (parseFloat(totalRevenue) * 2000).toFixed(0), // Convert to USD estimate
        activeToday,
        recentSubmissions: presaleSubmissions.slice(0, 10),
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // Fingerprint verification simulation
  app.post("/api/verify", async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const { location = "Unknown Location", method = "fingerprint" } = req.body;
      
      // Simulate verification reward (random between 2-10 VFZ)
      const reward = (Math.random() * 8 + 2).toFixed(8);
      
      const verification = await storage.createVerification({
        userId,
        location,
        method,
        reward,
      });
      
      // Update user balance
      const user = await storage.getUser(userId);
      if (user) {
        const newBalance = (parseFloat(user.balance || "0") + parseFloat(reward)).toFixed(8);
        await storage.updateUser(userId, {
          balance: newBalance,
          verificationCount: (user.verificationCount || 0) + 1,
          lastActivity: new Date(),
        });
      }
      
      res.json({
        success: true,
        verification,
        reward: parseFloat(reward),
      });
    } catch (error) {
      res.status(500).json({ message: "Verification failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
