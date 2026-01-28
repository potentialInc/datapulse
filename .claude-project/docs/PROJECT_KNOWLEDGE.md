# Project Knowledge: DataPulse

## Overview

DataPulse is a unified multi-dashboard platform that combines business intelligence, operations monitoring, and analytics in a single interface. The platform enables real-time data synchronization across dashboards with AI-powered anomaly detection and smart alerting capabilities.

### Goals

1. Provide a unified platform for business intelligence, operations monitoring, and analytics
2. Enable real-time data visualization with customizable dashboard widgets
3. Support cross-department data sharing with granular permission controls
4. Deliver AI-powered anomaly detection and smart alerting system

## Tech Stack

- **Backend**: NestJS with TypeORM, JWT, Swagger
- **Frontend**: React 19 with TailwindCSS 4, shadcn/ui
- **Dashboards**: Admin Dashboard, Operations Dashboard, Analytics Dashboard (React)
- **Database**: PostgreSQL
- **Deployment**: Docker Compose

## Architecture

### Project Structure

```
DataPulse/
├── backend/                       # nestjs API server
├── frontend/                      # React web application
├── frontend-admin-dashboard/      # Admin dashboard (if applicable)
├── frontend-operations-dashboard/ # Operations dashboard (if applicable)
├── frontend-analytics-dashboard/  # Analytics dashboard (if applicable)
├── mobile/                        # React Native mobile app (if applicable)
└── docker-compose.yml             # Container orchestration
```

### Backend Architecture (nestjs)

<!-- NestJS Backend Architecture -->
<!-- Include this section if nestjs = "nestjs" -->

#### NestJS Four-Layer Architecture

```
backend/src/
├── core/                          # Framework-level code
│   ├── base/                      # Base classes (extend these)
│   │   ├── base.entity.ts         # UUID, timestamps, soft delete
│   │   ├── base.repository.ts     # CRUD operations
│   │   ├── base.service.ts        # Business logic methods
│   │   └── base.controller.ts     # HTTP endpoints
│   ├── decorators/                # Custom decorators
│   │   ├── current-user.decorator.ts  # @CurrentUser()
│   │   ├── public.decorator.ts        # @Public()
│   │   ├── roles.decorator.ts         # @Roles('admin')
│   │   └── api-swagger.decorator.ts   # @ApiSwagger()
│   ├── filters/                   # Exception filters
│   │   └── http-exception.filter.ts
│   ├── guards/                    # Guards (auth, roles)
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/              # Interceptors
│   │   ├── transform.interceptor.ts
│   │   └── logging.interceptor.ts
│   └── pipes/                     # Pipes (validation)
│       └── validation.pipe.ts
│
├── modules/                       # Feature modules
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── dtos/
│   │       ├── login.dto.ts
│   │       ├── register.dto.ts
│   │       └── auth-response.dto.ts
│   ├── users/
│   │   ├── user.entity.ts
│   │   ├── user.repository.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   └── dtos/
│   │       ├── create-user.dto.ts
│   │       ├── update-user.dto.ts
│   │       └── user-response.dto.ts
│   └── [feature]/                 # Feature modules follow same pattern
│       ├── [feature].entity.ts
│       ├── [feature].repository.ts
│       ├── [feature].service.ts
│       ├── [feature].controller.ts
│       ├── [feature].module.ts
│       └── dtos/
│
├── infrastructure/                # External services
│   ├── mail/
│   │   ├── mail.service.ts
│   │   └── mail.module.ts
│   ├── s3/
│   │   ├── s3.service.ts
│   │   └── s3.module.ts
│   └── logging/
│       └── winston.logger.ts
│
├── main.ts                        # Application entry point
└── app.module.ts                  # Root module
```

**Request Lifecycle:**
1. HTTP Request → NestJS Router
2. Guards execute (JwtAuthGuard, RolesGuard)
3. Interceptors (before) execute
4. Pipes validate DTOs with class-validator
5. Controller delegates to Service
6. Service executes business logic
7. Repository performs database operations
8. Response flows back through interceptors

**Key Patterns:**
- **Four-layer architecture**: Controller → Service → Repository → Entity
- **Dependency injection**: Via NestJS modules and constructor injection
- **Base classes**: Provide CRUD automatically (~90% boilerplate reduction)
- **TypeORM**: For database operations, entities, migrations
- **Module organization**: Each feature is self-contained NestJS module

**Separation of Concerns:**
- **Controller**: Route definitions, HTTP decorators (@Get, @Post, etc.), delegate to service
- **Service**: Business logic, orchestration, transaction management
- **Repository**: TypeORM operations, custom queries, data access
- **Entity**: Database schema, columns, relationships (@Column, @ManyToOne, etc.)
- **DTOs**: Input validation with class-validator, data transfer objects

**Detailed Guides:** `.claude/nestjs/guides/` - architecture-overview, routing-and-controllers, services-and-repositories, database-patterns, authentication, validation, testing

<!-- End NestJS section -->


### Frontend Architecture (React)

<!-- React Web Architecture -->
<!-- Include this section if react contains "react" -->

```
frontend/app/
├── components/                    # Reusable components
│   ├── ui/                        # Shadcn/UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── form.tsx
│   └── layout/                    # Layout components
│       ├── header.tsx
│       └── footer.tsx
├── hooks/                         # Custom React hooks
│   └── providers/                 # Context providers
│       └── providers.tsx          # Redux provider setup
├── lib/                           # Utility libraries
│   └── utils.ts                   # cn() utility
├── pages/                         # Page components
│   ├── layout.tsx                 # Main layout
│   ├── auth/                      # Authentication pages
│   │   ├── layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── public/                    # Public pages
│       ├── home.tsx
│       └── about.tsx
├── redux/                         # State management
│   ├── features/                  # Redux slices
│   │   └── userSlice.ts
│   └── store/                     # Store configuration
│       ├── store.ts
│       ├── rootReducer.ts
│       └── hooks.ts               # useAppDispatch, useAppSelector
├── routes/                        # Route definitions
│   ├── public.routes.ts
│   └── auth.routes.ts
├── services/                      # API services
│   ├── httpService.ts             # Axios orchestrator
│   ├── httpMethods/               # HTTP method factories
│   │   ├── index.ts               # Export all methods
│   │   ├── get.ts                 # GET factory
│   │   ├── post.ts                # POST factory
│   │   ├── put.ts                 # PUT factory
│   │   ├── delete.ts              # DELETE factory
│   │   ├── patch.ts               # PATCH factory
│   │   ├── requestInterceptor.ts  # Request interceptor
│   │   └── responseInterceptor.ts # Response interceptor
│   └── httpServices/              # Domain-specific services
│       ├── queries/               # TanStack Query hooks (PUBLIC PAGES ONLY)
│       │   ├── index.ts
│       │   └── usePublicCategories.ts
│       ├── authService.ts
│       ├── userService.ts
│       └── [feature]Service.ts
├── styles/                        # CSS files
│   └── app.css                    # Tailwind + theme variables
├── types/                         # TypeScript types
│   ├── user.d.ts
│   └── httpService.d.ts
├── utils/                         # Utility functions
│   ├── errorHandler.ts
│   ├── actions/                   # Server actions
│   └── validations/               # Zod schemas
│       └── auth.ts
├── root.tsx                       # Root component
└── routes.ts                      # Main route config
```

**Service Layer Architecture:**

The frontend uses a three-tier service layer:

1. **httpService.ts** - Axios orchestrator with interceptors
2. **httpMethods/** - Factory functions for GET, POST, PUT, DELETE, PATCH
3. **httpServices/** - Domain-specific services using method factories
4. **httpServices/queries/** - TanStack Query hooks (PUBLIC PAGES ONLY)

**Request Flow:**
Component → Service Method → HTTP Method Factory → Axios Interceptors → Backend API

**Import Alias Patterns:**
- Alias: `~/` → `/app/`
- Use for all imports from app directory
- Avoids relative path hell (`../../../components`)

**Examples:**
```typescript
// ✅ Correct - using alias
import { Button } from '~/components/ui/button';
import { useAppDispatch } from '~/redux/store/hooks';
import type { User } from '~/types/user';

// ❌ Avoid - relative paths
import { Button } from '../../../components/ui/button';
```

**State Management:**
- **Redux**: Global state (user auth, app settings)
- **TanStack Query**: Server state (API data, caching)
- **React Hook Form**: Form state
- **Context API**: Component-level shared state

**When to Use What:**
- Redux: Cross-cutting concerns (auth, theme, app-wide settings)
- TanStack Query: API data fetching, caching, synchronization
- React Hook Form: Form validation and submission
- Local State: Component-specific state (useState, useReducer)

**Key Patterns:**
- React 19 with React Router
- Redux Toolkit for global state
- TanStack Query for server state
- Shadcn/UI + TailwindCSS 4
- Zod for validation
- TypeScript for type safety

**Detailed Guides:** `.claude/react/guides/` - file-organization, component-patterns, data-fetching, routing-guide, api-integration, state-management, form-handling

<!-- End React section -->

### Mobile Architecture (React Native)


## User Types & Permissions

| Role | Permissions |
|------|-------------|
| **Business User** | View dashboards, create custom reports, export data, set personal alerts, bookmark favorites, comment on dashboard items |
| **Data Analyst** | All Business User permissions + SQL query access, create/edit data models, build custom visualizations, set up data pipelines, create shareable templates |
| **Operations Manager** | View operations dashboard, manage team members, approve workflows, handle escalations, monitor SLAs, view team activity logs |
| **System Admin** | Full system access including user management, integration settings, audit logs, system configuration, backup/restore, white-label branding |

## Terminology

| Term | Definition |
|------|------------|
| **Widget** | A single visualization component on a dashboard (chart, metric, table) |
| **Data Model** | A structured representation of data relationships and calculations |
| **KPI** | Key Performance Indicator - a measurable value showing goal progress |
| **Pipeline** | Automated data transformation and processing workflow |
| **Threshold** | A defined value that triggers an alert when crossed |
| **Connector** | Integration component that links external data sources |
| **SLA** | Service Level Agreement - performance commitment metrics |
| **Drill-down** | Action to view more detailed data within a visualization |
| **Time Series** | Data points indexed in chronological order |
| **Aggregation** | Combining multiple data points into summary statistics |

## Key Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| [Decision 1] | [Why this choice was made] | YYYY-MM-DD |

## Development Setup

```bash
# Clone with submodules
git clone --recurse-submodules <repo-url>

# Start services
docker-compose up -d
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `OKTA_DOMAIN` | Okta domain for SSO | Yes |
| `OKTA_CLIENT_ID` | Okta client ID | Yes |
| `AWS_ACCESS_KEY_ID` | AWS S3 access key | Yes |
| `AWS_SECRET_ACCESS_KEY` | AWS S3 secret key | Yes |
| `AWS_S3_BUCKET` | S3 bucket name for file storage | Yes |
| `SENDGRID_API_KEY` | SendGrid API key for emails | Yes |
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID for SMS | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key for billing | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |

## External Services

| Service | Purpose | Documentation |
|---------|---------|---------------|
| **Google OAuth** | SSO authentication | [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2) |
| **Okta** | Enterprise SSO integration | [Okta Developer](https://developer.okta.com/) |
| **AWS S3** | File storage for exports and backups | [AWS S3 Docs](https://docs.aws.amazon.com/s3/) |
| **SendGrid** | Email notifications and scheduled reports | [SendGrid API](https://docs.sendgrid.com/) |
| **Slack** | Alert notifications and report delivery | [Slack API](https://api.slack.com/) |
| **Twilio** | SMS alerts for critical notifications | [Twilio Docs](https://www.twilio.com/docs) |
| **Stripe** | Subscription billing management | [Stripe API](https://stripe.com/docs/api) |
