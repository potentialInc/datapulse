# DataPulse - Claude Context

## Stack
nestjs + react + PostgreSQL | Docker

## Architecture
```
backend/                           # NestJS API (port 3000)
frontend/                          # React Web (port 5173)
frontend-admin-dashboard/          # Admin Dashboard (port 5174)
frontend-operations-dashboard/     # Operations Dashboard (port 5175)
frontend-analytics-dashboard/      # Analytics Dashboard (port 5176)
```

---

## Core BASH Tools (NO EXCEPTIONS)

```bash
# Pattern Search - USE 'rg' ONLY
rg -n "pattern" --glob '!node_modules/*'
rg -l "pattern"              # List matching files
rg -t py "pattern"           # Search Python files only

# File Finding - USE 'fd' ONLY
fd filename                  # Find by name
fd -e py                     # Find Python files
fd -H .env                   # Include hidden

# Bulk Operations - ONE command > many edits
rg -l "old" | xargs sed -i '' 's/old/new/g'

# Preview - USE 'bat'
bat -n filepath              # With line numbers
bat -r 10:50 file            # Lines 10-50

# JSON - USE 'jq'
jq '.dependencies | keys[]' package.json
```

---

## Commands (/slash)

| Category | Command | Purpose |
|----------|---------|---------|
| **Git** | /commit | Commit main project, create PR to dev |
| | /commit-all | Commit all including submodules |
| | /pull | Pull latest from dev |
| **Dev** | /new-project | Create new project with boilerplate |
| | /fix-ticket | Analyze and fix Notion ticket |
| | /fullstack | Run autonomous dev loops |
| | /html-to-react | Convert HTML prototypes to React components |
| **Design** | /prd-to-design-prompts | Convert PRD to Aura prompts |
| | /prompts-to-aura | Execute prompts on Aura.build |

---

## Agents

| Agent | Location | Trigger |
|-------|----------|---------|
| backend-developer | .claude/nestjs/agents/ | backend/ changes |
| frontend-developer | .claude/react/agents/ | frontend/ changes |
| design-qa-agent | .claude/react/agents/ | UI component work |

---

## Docs Reference

| Doc | Path |
|-----|------|
| Knowledge | .claude-project/docs/PROJECT_KNOWLEDGE.md |
| API | .claude-project/docs/PROJECT_API.md |
| Database | .claude-project/docs/PROJECT_DATABASE.md |
| Integration | .claude-project/docs/PROJECT_API_INTEGRATION.md |
| PRD | .claude-project/prd/prd.pdf |
| HTML Screens | .claude-project/resources/HTML/ |

---

## Framework Guides

| Framework | Path | Count |
|-----------|------|-------|
| NestJS | .claude/nestjs/guides/ | 20+ guides |
| React | .claude/react/guides/ | 22 guides |
