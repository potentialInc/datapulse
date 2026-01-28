# Database Schema: DataPulse

## Overview

- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Migrations**: `backend/src/database/migrations/`

## Entity Relationship Diagram

### DataPulse Platform ERD

This ERD shows the complete DataPulse data model with all entities, relationships, and attributes.

```
┌──────────────────────────────────┐              ┌──────────────────────────────────┐
│            users                 │              │         departments              │
├──────────────────────────────────┤              ├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │──────N:1─────│ 🔑 id (PK)          UUID         │
│   email             VARCHAR(255) │              │   name              VARCHAR(100) │
│   password          VARCHAR(255) │              │   description       TEXT         │
│   name              VARCHAR(100) │              │   created_at        TIMESTAMP    │
│   role              ENUM         │              │   updated_at        TIMESTAMP    │
│ 🔗 department_id    UUID         │              └──────────────────────────────────┘
│   created_at        TIMESTAMP    │
│   updated_at        TIMESTAMP    │
└──────────────────────────────────┘
                │
                │ 1:N (ownership)
                │
                ▼
┌──────────────────────────────────┐              ┌──────────────────────────────────┐
│          dashboards              │              │           widgets                │
├──────────────────────────────────┤              ├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │──────1:N─────│ 🔑 id (PK)          UUID         │
│ 🔗 owner_id (FK)    UUID         │              │ 🔗 dashboard_id (FK) UUID        │
│   name              VARCHAR(255) │              │   type              VARCHAR(50)  │
│   description       TEXT         │              │   config            JSONB        │
│   created_at        TIMESTAMP    │              │   position          JSONB        │
│   updated_at        TIMESTAMP    │              │   created_at        TIMESTAMP    │
└──────────────────────────────────┘              │   updated_at        TIMESTAMP    │
                │                                  └──────────────────────────────────┘
                │
                │ N:N (sharing)
                │
                ▼
┌──────────────────────────────────┐
│       dashboard_shares           │
│      (Junction Table)            │
├──────────────────────────────────┤
│ 🔑🔗 dashboard_id (PK, FK) UUID  │
│ 🔑🔗 user_id (PK, FK)     UUID  │
│   permission_level    VARCHAR(20)│
│   shared_at           TIMESTAMP  │
└──────────────────────────────────┘


┌──────────────────────────────────┐              ┌──────────────────────────────────┐
│            alerts                │              │     alert_notifications          │
├──────────────────────────────────┤              ├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │──────1:N─────│ 🔑 id (PK)          UUID         │
│ 🔗 user_id (FK)     UUID         │              │ 🔗 alert_id (FK)    UUID         │
│   metric            VARCHAR(100) │              │ 🔗 user_id (FK)     UUID         │
│   threshold_type    ENUM         │              │   sent_at           TIMESTAMP    │
│   threshold_value   NUMERIC      │              │   acknowledged_at   TIMESTAMP    │
│   channels          JSONB        │              │   resolved_at       TIMESTAMP    │
│   status            ENUM         │              └──────────────────────────────────┘
│   created_at        TIMESTAMP    │
│   updated_at        TIMESTAMP    │
└──────────────────────────────────┘


┌──────────────────────────────────┐              ┌──────────────────────────────────┐
│           reports                │              │        data_sources              │
├──────────────────────────────────┤              ├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │              │ 🔑 id (PK)          UUID         │
│ 🔗 dashboard_id (FK) UUID        │              │   name              VARCHAR(100) │
│   schedule          VARCHAR(50)  │              │   type              VARCHAR(50)  │
│   recipients        JSONB        │              │   config            JSONB        │
│   format            VARCHAR(20)  │              │   status            ENUM         │
│   created_at        TIMESTAMP    │              │   last_sync         TIMESTAMP    │
│   updated_at        TIMESTAMP    │              │   created_at        TIMESTAMP    │
└──────────────────────────────────┘              │   updated_at        TIMESTAMP    │
                                                   └──────────────────────────────────┘


┌──────────────────────────────────┐              ┌──────────────────────────────────┐
│            queries               │              │         data_models              │
├──────────────────────────────────┤              ├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │              │ 🔑 id (PK)          UUID         │
│ 🔗 user_id (FK)     UUID         │              │ 🔗 user_id (FK)     UUID         │
│   name              VARCHAR(255) │              │   name              VARCHAR(255) │
│   sql               TEXT         │              │   config            JSONB        │
│   created_at        TIMESTAMP    │              │   created_at        TIMESTAMP    │
│   updated_at        TIMESTAMP    │              │   updated_at        TIMESTAMP    │
└──────────────────────────────────┘              └──────────────────────────────────┘


┌──────────────────────────────────┐
│          workflows               │
├──────────────────────────────────┤
│ 🔑 id (PK)          UUID         │
│ 🔗 requester_id (FK) UUID        │
│ 🔗 approver_id (FK)  UUID        │
│   type              VARCHAR(50)  │
│   status            ENUM         │
│   data              JSONB        │
│   created_at        TIMESTAMP    │
│   updated_at        TIMESTAMP    │
└──────────────────────────────────┘

Legend:
🔑 Primary Key (PK)
🔗 Foreign Key (FK)
──  Relationship line
1:N One-to-Many relationship (one parent entity, many child entities)
N:1 Many-to-One relationship (many child entities, one parent entity)
N:N Many-to-Many relationship (requires junction table with composite PK)
```

## Entity Relationships

### One-to-Many (1:N)

| Parent | Child | Relationship | FK Column |
|--------|-------|--------------|-----------|
| users | dashboards | One user owns many dashboards | dashboards.owner_id → users.id |
| users | alerts | One user has many alerts | alerts.user_id → users.id |
| users | queries | One user has many saved queries | queries.user_id → users.id |
| users | data_models | One user creates many data models | data_models.user_id → users.id |
| dashboards | widgets | One dashboard has many widgets | widgets.dashboard_id → dashboards.id |
| dashboards | reports | One dashboard has many scheduled reports | reports.dashboard_id → dashboards.id |
| alerts | alert_notifications | One alert triggers many notifications | alert_notifications.alert_id → alerts.id |
| departments | users | One department has many users | users.department_id → departments.id |

### Many-to-One (N:1)

| Child | Parent | Relationship | FK Column |
|-------|--------|--------------|-----------|
| users | departments | Many users belong to one department | users.department_id → departments.id |
| dashboards | users | Many dashboards owned by one user | dashboards.owner_id → users.id |

### Many-to-Many (N:N)

| Entity 1 | Entity 2 | Junction Table | Columns | Description |
|----------|----------|----------------|---------|-------------|
| dashboards | users | dashboard_shares | dashboard_id, user_id, permission_level | Users can view/edit multiple shared dashboards |

### Relationship Details

**users → dashboards (1:N)**
- Type: One-to-Many
- Constraint: dashboards.owner_id NOT NULL
- On Delete: CASCADE
- Description: Each user can own multiple dashboards

**dashboards → widgets (1:N)**
- Type: One-to-Many
- Constraint: widgets.dashboard_id NOT NULL
- On Delete: CASCADE
- Description: Each dashboard contains multiple visualization widgets

**dashboards ← → users (N:N via dashboard_shares)**
- Type: Many-to-Many
- Junction: dashboard_shares (dashboard_id, user_id, permission_level)
- Constraint: Composite PK (dashboard_id, user_id)
- Description: Dashboards can be shared with multiple users with different permission levels

**users → alerts (1:N)**
- Type: One-to-Many
- Constraint: alerts.user_id NOT NULL
- On Delete: CASCADE
- Description: Each user can configure multiple alert rules

**alerts → alert_notifications (1:N)**
- Type: One-to-Many
- Constraint: alert_notifications.alert_id NOT NULL
- On Delete: CASCADE
- Description: Each alert generates notification history

## Tables

### users

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | SERIAL | No | auto | Primary key |
| email | VARCHAR(255) | No | - | Unique email |
| password | VARCHAR(255) | No | - | Hashed password |
| name | VARCHAR(100) | Yes | NULL | Display name |
| role | ENUM | No | 'user' | user/admin |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

### profiles

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | No | - | FK to users.id (UNIQUE) |
| avatar | VARCHAR(255) | Yes | NULL | Avatar URL |
| bio | TEXT | Yes | NULL | User bio |
| phone | VARCHAR(50) | Yes | NULL | Phone number |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- UNIQUE (user_id)
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

### posts

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | No | - | FK to users.id |
| title | VARCHAR(255) | No | - | Post title |
| content | TEXT | No | - | Post content |
| status | ENUM | No | 'draft' | draft, published, archived |
| published_at | TIMESTAMP | Yes | NULL | Publication timestamp |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

### comments

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| post_id | UUID | No | - | FK to posts.id |
| user_id | UUID | No | - | FK to users.id |
| content | TEXT | No | - | Comment content |
| status | ENUM | No | 'active' | active, hidden, deleted |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |

**Constraints:**
- FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

### roles

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| name | VARCHAR(50) | No | - | Role name (e.g., admin, editor, viewer) |
| description | TEXT | Yes | NULL | Role description |
| permissions | JSONB | No | '[]' | Permission array |
| created_at | TIMESTAMP | No | NOW() | Creation time |

**Constraints:**
- UNIQUE (name)

### tags

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| name | VARCHAR(50) | No | - | Tag name |
| slug | VARCHAR(50) | No | - | URL-friendly slug |
| color | VARCHAR(7) | Yes | '#000000' | Hex color code |
| created_at | TIMESTAMP | No | NOW() | Creation time |

**Constraints:**
- UNIQUE (name)
- UNIQUE (slug)

## Junction Tables (Many-to-Many)

Junction tables implement many-to-many relationships between two entities. They use composite primary keys consisting of both foreign keys.

### user_roles (Users ↔ Roles)

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| user_id | UUID | No | - | FK to users.id |
| role_id | UUID | No | - | FK to roles.id |
| assigned_at | TIMESTAMP | No | NOW() | When role was assigned |
| assigned_by | UUID | Yes | NULL | FK to users.id (who assigned) |

**Constraints:**
- Primary Key: (user_id, role_id)
- Foreign Key: user_id REFERENCES users(id) ON DELETE CASCADE
- Foreign Key: role_id REFERENCES roles(id) ON DELETE CASCADE
- Foreign Key: assigned_by REFERENCES users(id) ON DELETE SET NULL
- Unique: (user_id, role_id)

**Purpose:** Allows users to have multiple roles (e.g., a user can be both an editor and a moderator).

### post_tags (Posts ↔ Tags)

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| post_id | UUID | No | - | FK to posts.id |
| tag_id | UUID | No | - | FK to tags.id |
| created_at | TIMESTAMP | No | NOW() | When tag was added |

**Constraints:**
- Primary Key: (post_id, tag_id)
- Foreign Key: post_id REFERENCES posts(id) ON DELETE CASCADE
- Foreign Key: tag_id REFERENCES tags(id) ON DELETE CASCADE
- Unique: (post_id, tag_id)

**Purpose:** Allows posts to have multiple tags and tags to be associated with multiple posts.

## Indexes

### Primary Tables

| Table | Index | Columns | Type | Purpose |
|-------|-------|---------|------|---------|
| users | users_email_idx | email | UNIQUE | Fast email lookup for login |
| users | users_role_idx | role | BTREE | Filter users by role |
| profiles | profiles_user_id_idx | user_id | UNIQUE | Enforce 1:1 with users |
| posts | posts_user_id_idx | user_id | BTREE | Find all posts by user |
| posts | posts_status_idx | status | BTREE | Filter posts by status |
| posts | posts_published_at_idx | published_at | BTREE | Sort by publish date |
| comments | comments_post_id_idx | post_id | BTREE | Find all comments for a post |
| comments | comments_user_id_idx | user_id | BTREE | Find all comments by user |
| comments | comments_post_user_idx | (post_id, user_id) | BTREE | Find user's comments on a post |
| roles | roles_name_idx | name | UNIQUE | Ensure unique role names |
| tags | tags_name_idx | name | UNIQUE | Ensure unique tag names |
| tags | tags_slug_idx | slug | UNIQUE | URL-friendly tag lookup |

### Junction Tables

Junction tables have composite primary keys that automatically serve as indexes for their constituent columns.

| Table | Composite PK | Serves As Index For |
|-------|--------------|---------------------|
| user_roles | (user_id, role_id) | Fast lookup of user's roles and role's users |
| post_tags | (post_id, tag_id) | Fast lookup of post's tags and tag's posts |

**Additional Indexes:**
- user_roles: role_id index (for reverse lookup: "which users have this role?")
- post_tags: tag_id index (for reverse lookup: "which posts have this tag?")

## Migrations

```bash
# Generate migration
npm run migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```
