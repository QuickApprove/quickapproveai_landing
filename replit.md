# replit.md

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) that is a landing page for "QuickApprove" - a vendor management as a service (VMaaS) product in pre-launch phase. The application features an enhanced email signup system for users to join a waitlist, with a modern UI built using shadcn/ui components and Tailwind CSS. The landing page includes compelling storytelling about vendor approval pain points, feature demonstrations, and calls-to-action for pre-launch access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

## Key Components

### Database Schema
- **users**: Basic user table with id, username, and password fields
- **email_signups**: Enhanced email signup table for waitlist management with email (required), name (optional), company (optional), and timestamp
- **Validation**: Drizzle-zod integration for type-safe schema validation

### API Endpoints
- `POST /api/signup`: Email signup for waitlist
- `GET /api/signups`: Retrieve all signups (admin endpoint)

### Storage Layer
- **Interface**: IStorage interface for abstraction
- **Implementation**: MemStorage class for in-memory storage (development)
- **Production**: Configured for PostgreSQL with Drizzle ORM

### UI Components
- Complete shadcn/ui component library implementation
- Custom toast notifications for user feedback
- Responsive design with mobile-first approach
- Dark mode support built into the design system

## Data Flow

1. **User Signup**: User enters email on landing page
2. **Validation**: Frontend validates email format, sends to backend
3. **Backend Processing**: Server validates with Zod schema, checks for duplicates
4. **Database Storage**: Email stored in PostgreSQL via Drizzle ORM
5. **Response**: Success/error feedback displayed via toast notifications
6. **State Management**: React Query manages server state and cache invalidation

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **UI Components**: Radix UI primitives
- **Validation**: Zod schema validation
- **HTTP Client**: Fetch API with custom wrapper

### Development Tools
- **Replit Integration**: Vite plugins for Replit development environment
- **TypeScript**: Full TypeScript support across frontend and backend
- **ESLint/Prettier**: Code formatting and linting (implied by structure)

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations in `./migrations` directory

### Environment Configuration
- **Development**: NODE_ENV=development with tsx for hot reloading
- **Production**: NODE_ENV=production with compiled JavaScript
- **Database**: DATABASE_URL environment variable required

### Scripts
- `dev`: Development server with hot reloading
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema synchronization

### Architecture Decisions

1. **Monorepo Structure**: Single repository with `client/`, `server/`, and `shared/` directories for code organization
2. **TypeScript**: Full TypeScript adoption for type safety across the stack
3. **Drizzle ORM**: Chosen for type-safe database operations and excellent TypeScript integration
4. **shadcn/ui**: Provides consistent, accessible UI components with Tailwind CSS
5. **Memory Storage**: Temporary solution for development, easily replaceable with PostgreSQL implementation
6. **Zod Validation**: Ensures data integrity on both client and server sides
7. **React Query**: Handles server state management, caching, and synchronization
8. **Vite**: Fast development experience with hot module replacement

The application follows a clean architecture pattern with clear separation of concerns between presentation, business logic, and data access layers.