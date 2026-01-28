# DataPulse

## Quick Start

```bash
# Clone with submodules
git clone --recurse-submodules <repo-url>

# Or if already cloned
git submodule update --init --recursive

# Start services
docker-compose up -d
```

## Documentation

- **Project Knowledge**: [.claude-project/docs/PROJECT_KNOWLEDGE.md](.claude-project/docs/PROJECT_KNOWLEDGE.md)
- **API Reference**: [.claude-project/docs/PROJECT_API.md](.claude-project/docs/PROJECT_API.md)
- **Database Schema**: [.claude-project/docs/PROJECT_DATABASE.md](.claude-project/docs/PROJECT_DATABASE.md)
- **API Integration**: [.claude-project/docs/PROJECT_API_INTEGRATION.md](.claude-project/docs/PROJECT_API_INTEGRATION.md)
- **PRD**: [.claude-project/prd/prd.pdf](.claude-project/prd/prd.pdf)
- **HTML Prototypes**: [.claude-project/resources/HTML/](.claude-project/resources/HTML/)

## Tech Stack

- **Backend**: NestJS with TypeORM, JWT, Swagger
- **Frontend**: React 19 with TailwindCSS 4, shadcn/ui
- **Dashboards**: Admin, Operations, Analytics (React)
- **Database**: PostgreSQL
- **Deployment**: Docker Compose

## Project Structure

```
DataPulse/
├── .claude/                       # Claude Code configuration (submodule)
├── .claude-project/               # Project documentation & resources
│   ├── docs/                      # Technical documentation
│   ├── prd/                       # Product requirements (prd.pdf)
│   ├── resources/                 # HTML prototypes (45 files)
│   ├── memory/                    # Project decisions & context
│   └── status/                    # Implementation tracking
├── backend/                       # NestJS API server (pending)
├── frontend/                      # React web application (pending)
├── frontend-admin-dashboard/      # Admin dashboard (pending)
├── frontend-operations-dashboard/ # Operations dashboard (pending)
├── frontend-analytics-dashboard/  # Analytics dashboard (pending)
├── docker-compose.yml             # Container orchestration (pending)
├── .gitignore                     # Git ignore rules
├── CLAUDE.md                      # Consolidated context for Claude
└── README.md                      # This file
```

## Development

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Initial Setup

**Note**: Backend and frontend boilerplate code is not yet set up. This is a documentation-only setup. Use `/new-project` command without `--docs-only` flag to set up boilerplate code.

```bash
# Once boilerplate is set up:

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start database
docker-compose up -d postgres

# Run migrations
cd backend && npm run migration:run

# Start development servers
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Deployment

See [.claude-project/docs/PROJECT_KNOWLEDGE.md](.claude-project/docs/PROJECT_KNOWLEDGE.md) for deployment instructions.

## Contributing

1. Create a feature branch from `dev`
2. Make your changes
3. Run tests
4. Create a pull request to `dev`

## License

[Add your license here]
