# VeriFyz Protocol - Biometric Verification Platform

## Overview

VeriFyz Protocol is a cutting-edge blockchain-based application that revolutionizes presence verification through biometric authentication. The platform enables users to verify their physical presence at specific locations using fingerprint scanning, QR codes, or NFC technology, earning cryptocurrency rewards (VFZ tokens) for successful verifications. The application features a modern cyberpunk-themed interface with a comprehensive dashboard, presale functionality, and administrative controls.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Custom components built on Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with custom cyberpunk theme (dark mode with cyan accents)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Four main tables (users, presale_submissions, verifications, settings)
- **In-Memory Storage**: MemStorage class for development/testing (can be replaced with database implementation)

## Key Components

### Authentication and Authorization
- Mock user authentication system (userId: 1 for development)
- Session-based authentication planned (express-session with connect-pg-simple)
- Role-based access control for admin functionality

### Verification System
- **Biometric Methods**: Fingerprint scanning (primary), QR code, NFC
- **Location Tracking**: GPS coordinates for presence verification
- **Reward System**: Automatic VFZ token distribution for successful verifications
- **Real-time Updates**: Immediate UI updates using React Query mutations

### Presale Platform
- **Token Economics**: 1 ETH = 20,000 VFZ tokens exchange rate
- **Wallet Integration**: Ethereum wallet address validation
- **Transaction Tracking**: Support for transaction hash recording
- **Investment Limits**: 0.1 to 100 ETH per transaction

### Admin Dashboard
- **Analytics**: Real-time statistics for users, revenue, and activity
- **User Management**: View and manage user accounts
- **Transaction Monitoring**: Track presale submissions and verifications
- **System Controls**: Administrative functions for platform management

## Data Flow

1. **User Verification Flow**:
   - User initiates verification through fingerprint button
   - Client sends verification request with location and method
   - Server validates request and calculates reward
   - Database stores verification record
   - Client receives confirmation and updates UI

2. **Presale Flow**:
   - User enters wallet address and ETH amount
   - Client validates input using Zod schema
   - Server calculates token amount and creates submission
   - Database stores presale record
   - Client displays confirmation with transaction details

3. **Dashboard Data Flow**:
   - Client requests dashboard data on page load
   - Server aggregates user data, verifications, and statistics
   - Database queries for recent activity and analytics
   - Client displays real-time dashboard with charts and metrics

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database client
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management and caching
- **zod**: TypeScript-first schema validation
- **wouter**: Lightweight React routing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives (40+ components)
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **react-icons**: Additional icon sets for social media
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and developer experience
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon serverless PostgreSQL instance
- **Environment Variables**: DATABASE_URL for database connection
- **Build Process**: TypeScript compilation with Vite bundling

### Production Deployment
- **Build Command**: `npm run build` creates optimized production bundle
- **Server Bundle**: esbuild creates Node.js server bundle in `/dist`
- **Static Assets**: Vite builds client assets to `/dist/public`
- **Start Command**: `npm start` runs production server

### Database Management
- **Schema Migrations**: Drizzle Kit for database schema management
- **Push Command**: `npm run db:push` applies schema changes
- **Connection**: Serverless PostgreSQL with connection pooling

## Changelog

Changelog:
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.