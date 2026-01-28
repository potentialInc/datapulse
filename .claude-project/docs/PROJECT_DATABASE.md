# Database Schema: DataPulse

## Overview

- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Migrations**: backend/src/migrations/

<!-- DataPulse Database Schema -->
<!-- Generated from PRD requirements -->

## Entity Relationship Diagram

### DataPulse Schema - Comprehensive ERD

```
┌──────────────────────────────────┐
│            users                 │
├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │──────┐
│   email             VARCHAR(255) │      │ 1:N (created_by)
│   password          VARCHAR(255) │      │
│   name              VARCHAR(100) │      ▼
│   role              ENUM         │  ┌──────────────────────────────────┐
│   department        VARCHAR(100) │  │         dashboards               │
│   phone             VARCHAR(50)  │  ├──────────────────────────────────┤
│   timezone          VARCHAR(50)  │  │ 🔑 id (PK)          UUID         │
│   status            ENUM         │  │ 🔗 user_id (FK)     UUID         │
│   last_login        TIMESTAMP    │  │   name              VARCHAR(255) │
│   created_at        TIMESTAMP    │  │   description       TEXT         │
│   updated_at        TIMESTAMP    │  │   layout            JSONB        │
└──────────────────────────────────┘  │   is_public         BOOLEAN      │
                │                     │   created_at        TIMESTAMP    │
                │                     │   updated_at        TIMESTAMP    │
                │ 1:N (owned_alerts)  └──────────────────────────────────┘
                │                                  │
                ▼                                  │ 1:N (has_widgets)
┌──────────────────────────────────┐              │
│           alerts                 │              ▼
├──────────────────────────────────┤  ┌──────────────────────────────────┐
│ 🔑 id (PK)          UUID         │  │          widgets                 │
│ 🔗 user_id (FK)     UUID         │  ├──────────────────────────────────┤
│ 🔗 metric_id        UUID         │  │ 🔑 id (PK)          UUID         │
│   name              VARCHAR(255) │  │ 🔗 dashboard_id(FK) UUID         │
│   threshold_type    ENUM         │  │ 🔗 data_source_id(FK) UUID      │
│   threshold_value   DECIMAL      │  │   type              ENUM         │
│   channels          JSONB        │  │   config            JSONB        │
│   frequency         ENUM         │  │   query             TEXT         │
│   status            ENUM         │  │   position          JSONB        │
│   is_active         BOOLEAN      │  │   created_at        TIMESTAMP    │
│   created_at        TIMESTAMP    │  │   updated_at        TIMESTAMP    │
│   updated_at        TIMESTAMP    │  └──────────────────────────────────┘
└──────────────────────────────────┘
                                       ┌──────────────────────────────────┐
┌──────────────────────────────────┐  │       data_sources               │
│         data_models              │  ├──────────────────────────────────┤
├──────────────────────────────────┤  │ 🔑 id (PK)          UUID         │
│ 🔑 id (PK)          UUID         │  │   name              VARCHAR(255) │
│ 🔗 created_by (FK)  UUID         │  │   type              ENUM         │
│   name              VARCHAR(255) │  │   connection_config JSONB        │
│   description       TEXT         │  │   status            ENUM         │
│   tables            JSONB        │  │   last_sync         TIMESTAMP    │
│   joins             JSONB        │  │   metadata          JSONB        │
│   calculated_fields JSONB        │  │   created_at        TIMESTAMP    │
│   created_at        TIMESTAMP    │  │   updated_at        TIMESTAMP    │
│   updated_at        TIMESTAMP    │  └──────────────────────────────────┘
└──────────────────────────────────┘
                                       ┌──────────────────────────────────┐
┌──────────────────────────────────┐  │          reports                 │
│         workflows                │  ├──────────────────────────────────┤
├──────────────────────────────────┤  │ 🔑 id (PK)          UUID         │
│ 🔑 id (PK)          UUID         │  │ 🔗 dashboard_id(FK) UUID         │
│ 🔗 requester_id(FK) UUID         │  │ 🔗 created_by (FK)  UUID         │
│ 🔗 approver_id (FK) UUID         │  │   name              VARCHAR(255) │
│   type              VARCHAR(100) │  │   schedule          JSONB        │
│   status            ENUM         │  │   recipients        JSONB        │
│   priority          ENUM         │  │   format            ENUM         │
│   details           JSONB        │  │   is_active         BOOLEAN      │
│   created_at        TIMESTAMP    │  │   last_sent         TIMESTAMP    │
│   updated_at        TIMESTAMP    │  │   created_at        TIMESTAMP    │
│   resolved_at       TIMESTAMP    │  │   updated_at        TIMESTAMP    │
└──────────────────────────────────┘  └──────────────────────────────────┘

┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│      dashboard_shares            │  │         audit_logs               │
│      (Junction Table)            │  ├──────────────────────────────────┤
├──────────────────────────────────┤  │ 🔑 id (PK)          UUID         │
│ 🔑🔗 dashboard_id(PK,FK) UUID    │  │ 🔗 user_id (FK)     UUID         │
│ 🔑🔗 user_id (PK, FK)    UUID    │  │   action            VARCHAR(100) │
│   permission        ENUM         │  │   resource_type     VARCHAR(100) │
│   shared_at         TIMESTAMP    │  │   resource_id       UUID         │
│   shared_by         UUID         │  │   ip_address        VARCHAR(50)  │
└──────────────────────────────────┘  │   user_agent        TEXT         │
                                       │   details           JSONB        │
┌──────────────────────────────────┐  │   created_at        TIMESTAMP    │
│          api_keys                │  └──────────────────────────────────┘
├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │
│ 🔗 user_id (FK)     UUID         │
│   name              VARCHAR(255) │
│   key_hash          VARCHAR(255) │
│   permissions       JSONB        │
│   expires_at        TIMESTAMP    │
│   last_used         TIMESTAMP    │
│   is_active         BOOLEAN      │
│   created_at        TIMESTAMP    │
└──────────────────────────────────┘

Legend:
🔑 Primary Key (PK)
🔗 Foreign Key (FK)
──  Relationship line
1:N One-to-Many relationship
N:N Many-to-Many relationship (requires junction table)
ENUM: Predefined set of values
JSONB: PostgreSQL JSON with indexing
```

## Entity Relationships

### One-to-Many (1:N)

| Parent | Child | Relationship | FK Column |
|--------|-------|--------------|-----------|
| users | dashboards | One user creates many dashboards | dashboards.user_id → users.id |
| users | alerts | One user creates many alerts | alerts.user_id → users.id |
| users | data_models | One user creates many data models | data_models.created_by → users.id |
| users | reports | One user creates many reports | reports.created_by → users.id |
| users | workflows | One user requests many workflows | workflows.requester_id → users.id |
| users | api_keys | One user has many API keys | api_keys.user_id → users.id |
| dashboards | widgets | One dashboard has many widgets | widgets.dashboard_id → dashboards.id |
| data_sources | widgets | One data source used by many widgets | widgets.data_source_id → data_sources.id |

### Many-to-Many (N:N)

| Entity 1 | Entity 2 | Junction Table | Columns | Description |
|----------|----------|----------------|---------|-------------|
| dashboards | users | dashboard_shares | dashboard_id, user_id | Dashboards can be shared with multiple users |

### Relationship Details

**users → dashboards (1:N)**
- Type: One-to-Many
- Constraint: dashboards.user_id NOT NULL
- On Delete: CASCADE
- Description: Each user can create multiple dashboards

**users → alerts (1:N)**
- Type: One-to-Many
- Constraint: alerts.user_id NOT NULL
- On Delete: CASCADE
- Description: Each user can configure multiple alert rules

**dashboards → widgets (1:N)**
- Type: One-to-Many
- Constraint: widgets.dashboard_id NOT NULL
- On Delete: CASCADE
- Description: Each dashboard contains multiple visualization widgets

**dashboards ↔ users (N:N)**
- Type: Many-to-Many
- Junction: dashboard_shares (dashboard_id, user_id)
- Constraint: Composite PK (dashboard_id, user_id)
- Description: Dashboards can be shared with multiple users with different permission levels

## Tables

### users

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| email | VARCHAR(255) | No | - | Unique email address |
| password | VARCHAR(255) | No | - | Hashed password (bcrypt) |
| name | VARCHAR(100) | No | - | Full name |
| role | ENUM | No | 'business_user' | business_user, analyst, ops_manager, admin |
| department | VARCHAR(100) | Yes | NULL | Department name |
| phone | VARCHAR(50) | Yes | NULL | Phone number |
| timezone | VARCHAR(50) | Yes | 'UTC' | User timezone |
| status | ENUM | No | 'pending' | active, inactive, pending |
| last_login | TIMESTAMP | Yes | NULL | Last login timestamp |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- UNIQUE (email)
- CHECK (role IN ('business_user', 'analyst', 'ops_manager', 'admin'))
- CHECK (status IN ('active', 'inactive', 'pending'))

### dashboards

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | No | - | FK to users.id (creator) |
| name | VARCHAR(255) | No | - | Dashboard name |
| description | TEXT | Yes | NULL | Dashboard description |
| layout | JSONB | No | '{}' | Widget layout configuration |
| is_public | BOOLEAN | No | false | Public access flag |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

### widgets

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| dashboard_id | UUID | No | - | FK to dashboards.id |
| data_source_id | UUID | Yes | NULL | FK to data_sources.id |
| type | ENUM | No | - | line_chart, bar_chart, pie_chart, table, metric_card |
| config | JSONB | No | '{}' | Visualization configuration |
| query | TEXT | Yes | NULL | SQL query or data config |
| position | JSONB | No | '{}' | Position and size on canvas |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE
- FOREIGN KEY (data_source_id) REFERENCES data_sources(id) ON DELETE SET NULL
- CHECK (type IN ('line_chart', 'bar_chart', 'pie_chart', 'area_chart', 'table', 'metric_card', 'text', 'image'))

### alerts

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | No | - | FK to users.id (creator) |
| metric_id | UUID | Yes | NULL | Reference to monitored metric |
| name | VARCHAR(255) | No | - | Alert name |
| threshold_type | ENUM | No | - | above, below, change_percent |
| threshold_value | DECIMAL(15,2) | No | - | Threshold value |
| channels | JSONB | No | '[]' | Notification channels (email, slack, sms) |
| frequency | ENUM | No | 'immediate' | immediate, digest |
| status | ENUM | No | 'inactive' | active, triggered, snoozed, resolved, inactive |
| is_active | BOOLEAN | No | true | Active status |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- CHECK (threshold_type IN ('above', 'below', 'change_percent'))
- CHECK (frequency IN ('immediate', 'digest'))
- CHECK (status IN ('active', 'triggered', 'snoozed', 'resolved', 'inactive'))

### data_sources

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| name | VARCHAR(255) | No | - | Connection name |
| type | ENUM | No | - | postgresql, mysql, rest_api, csv |
| connection_config | JSONB | No | '{}' | Connection credentials and config |
| status | ENUM | No | 'disconnected' | connected, error, disconnected, pending |
| last_sync | TIMESTAMP | Yes | NULL | Last sync timestamp |
| metadata | JSONB | No | '{}' | Tables, schemas, endpoints |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- UNIQUE (name)
- CHECK (type IN ('postgresql', 'mysql', 'rest_api', 'csv'))
- CHECK (status IN ('connected', 'error', 'disconnected', 'pending'))

### reports

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| dashboard_id | UUID | No | - | FK to dashboards.id |
| created_by | UUID | No | - | FK to users.id |
| name | VARCHAR(255) | No | - | Report name |
| schedule | JSONB | No | '{}' | Schedule configuration (frequency, time, days) |
| recipients | JSONB | No | '[]' | Email addresses |
| format | ENUM | No | 'pdf' | pdf, excel, csv |
| is_active | BOOLEAN | No | true | Active status |
| last_sent | TIMESTAMP | Yes | NULL | Last delivery timestamp |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE
- FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
- CHECK (format IN ('pdf', 'excel', 'csv'))

### data_models

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| created_by | UUID | No | - | FK to users.id |
| name | VARCHAR(255) | No | - | Model name |
| description | TEXT | Yes | NULL | Model description |
| tables | JSONB | No | '[]' | Table definitions |
| joins | JSONB | No | '[]' | Join configurations |
| calculated_fields | JSONB | No | '[]' | Calculated field definitions |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE

### workflows

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| requester_id | UUID | No | - | FK to users.id |
| approver_id | UUID | Yes | NULL | FK to users.id |
| type | VARCHAR(100) | No | - | Workflow type |
| status | ENUM | No | 'pending' | pending, approved, rejected, completed |
| priority | ENUM | No | 'normal' | low, normal, high, critical |
| details | JSONB | No | '{}' | Workflow details |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |
| resolved_at | TIMESTAMP | Yes | NULL | Resolution timestamp |

**Constraints:**
- FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE
- FOREIGN KEY (approver_id) REFERENCES users(id) ON DELETE SET NULL
- CHECK (status IN ('pending', 'approved', 'rejected', 'completed'))
- CHECK (priority IN ('low', 'normal', 'high', 'critical'))

### audit_logs

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | Yes | NULL | FK to users.id |
| action | VARCHAR(100) | No | - | Action performed |
| resource_type | VARCHAR(100) | No | - | Resource type (dashboard, user, etc.) |
| resource_id | UUID | Yes | NULL | Resource identifier |
| ip_address | VARCHAR(50) | Yes | NULL | User IP address |
| user_agent | TEXT | Yes | NULL | Browser user agent |
| details | JSONB | No | '{}' | Additional details |
| created_at | TIMESTAMP | No | NOW() | Action timestamp |

**Constraints:**
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL

### api_keys

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | No | - | FK to users.id |
| name | VARCHAR(255) | No | - | Key name/description |
| key_hash | VARCHAR(255) | No | - | Hashed API key |
| permissions | JSONB | No | '[]' | Permission scopes |
| expires_at | TIMESTAMP | Yes | NULL | Expiration timestamp |
| last_used | TIMESTAMP | Yes | NULL | Last usage timestamp |
| is_active | BOOLEAN | No | true | Active status |
| created_at | TIMESTAMP | No | NOW() | Creation time |

**Constraints:**
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- UNIQUE (key_hash)

## Junction Tables (Many-to-Many)

Junction tables implement many-to-many relationships between two entities. They use composite primary keys consisting of both foreign keys.

### dashboard_shares (Dashboards ↔ Users)

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| dashboard_id | UUID | No | - | FK to dashboards.id |
| user_id | UUID | No | - | FK to users.id |
| permission | ENUM | No | 'view' | view, edit |
| shared_at | TIMESTAMP | No | NOW() | When dashboard was shared |
| shared_by | UUID | Yes | NULL | FK to users.id (who shared) |

**Constraints:**
- Primary Key: (dashboard_id, user_id)
- Foreign Key: dashboard_id REFERENCES dashboards(id) ON DELETE CASCADE
- Foreign Key: user_id REFERENCES users(id) ON DELETE CASCADE
- Foreign Key: shared_by REFERENCES users(id) ON DELETE SET NULL
- CHECK (permission IN ('view', 'edit'))

**Purpose:** Allows dashboards to be shared with multiple users with different permission levels.

## Indexes

### Primary Tables

| Table | Index | Columns | Type | Purpose |
|-------|-------|---------|------|---------|
| users | users_email_idx | email | UNIQUE | Fast email lookup for login |
| users | users_role_idx | role | BTREE | Filter users by role |
| users | users_department_idx | department | BTREE | Filter users by department |
| users | users_status_idx | status | BTREE | Filter by account status |
| dashboards | dashboards_user_id_idx | user_id | BTREE | Find all dashboards by user |
| dashboards | dashboards_created_at_idx | created_at | BTREE | Sort by creation date |
| widgets | widgets_dashboard_id_idx | dashboard_id | BTREE | Find all widgets for a dashboard |
| widgets | widgets_data_source_id_idx | data_source_id | BTREE | Find widgets by data source |
| alerts | alerts_user_id_idx | user_id | BTREE | Find all alerts by user |
| alerts | alerts_status_idx | status | BTREE | Filter alerts by status |
| alerts | alerts_is_active_idx | is_active | BTREE | Find active alerts |
| data_sources | data_sources_name_idx | name | UNIQUE | Ensure unique connection names |
| data_sources | data_sources_status_idx | status | BTREE | Filter by connection status |
| reports | reports_dashboard_id_idx | dashboard_id | BTREE | Find reports for a dashboard |
| reports | reports_created_by_idx | created_by | BTREE | Find reports by creator |
| reports | reports_is_active_idx | is_active | BTREE | Find active scheduled reports |
| data_models | data_models_created_by_idx | created_by | BTREE | Find models by creator |
| workflows | workflows_requester_id_idx | requester_id | BTREE | Find workflows by requester |
| workflows | workflows_approver_id_idx | approver_id | BTREE | Find workflows by approver |
| workflows | workflows_status_idx | status | BTREE | Filter workflows by status |
| audit_logs | audit_logs_user_id_idx | user_id | BTREE | Find logs by user |
| audit_logs | audit_logs_resource_idx | (resource_type, resource_id) | BTREE | Find logs by resource |
| audit_logs | audit_logs_created_at_idx | created_at | BTREE | Sort logs by timestamp |
| api_keys | api_keys_user_id_idx | user_id | BTREE | Find keys by user |
| api_keys | api_keys_key_hash_idx | key_hash | UNIQUE | Fast key validation |

### Junction Tables

Junction tables have composite primary keys that automatically serve as indexes for their constituent columns.

| Table | Composite PK | Serves As Index For |
|-------|--------------|---------------------|
| dashboard_shares | (dashboard_id, user_id) | Fast lookup of dashboard shares |

**Additional Indexes:**
- dashboard_shares: user_id index (for reverse lookup: "which dashboards are shared with this user?")

## Migrations

```bash
# Generate migration
npm run migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```
