---
frontend: "frontend-analytics-dashboard"
port: 5176
category: "data-analyst"
html_files: 5
priority: "P1"
depends_on: "00-shared-components.md"
---

# Data Analyst Screens - React Conversion

## Context

Converting 5 data analyst HTML screens to React components for the analytics dashboard application.

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS
- Code Editor: Monaco Editor (recommended) or CodeMirror

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Analyst Home

**HTML:** `data-analyst/13-analyst-home.html`
**Target Component:** `app/pages/dashboard/home.tsx`
**Route:** `/`

**API Integration:**
- `GET /queries/history`
- `GET /data-models`

**Shared Components:**
- AnalystSidebar
- PageHeader
- StatCard
- NavLink
- UserAvatar
- ActivityItem

**New Components:**
- AnalystSidebar

**Implementation Notes:**
- Quick access to recent queries
- Data model summary
- Query execution stats
- Recent activity feed
- Quick actions (new query, new model)

---

## Screen 2: Dashboard Builder

**HTML:** `data-analyst/14-dashboard-builder.html`
**Target Component:** `app/pages/builder/dashboard-builder.tsx`
**Route:** `/builder`

**API Integration:**
- `POST /dashboards`
- `PATCH /dashboards/:id`
- `POST /widgets`
- `PATCH /widgets/:id`

**Shared Components:**
- AnalystSidebar
- PageHeader
- NavLink

**New Components:**
- DashboardBuilder
- WidgetPalette
- CanvasArea
- PropertyPanel

**Implementation Notes:**
- Drag-and-drop widget placement
- Widget palette with chart types
- Canvas area for dashboard layout
- Property panel for widget configuration
- Save/publish actions
- Preview mode

**Key Libraries:**
- `react-grid-layout` for drag-and-drop grid
- `recharts` or `chart.js` for visualizations

**Component Structure:**
```tsx
export function DashboardBuilder() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [layout, setLayout] = useState<Layout[]>([]);

  return (
    <div className="flex h-screen">
      {/* Widget Palette */}
      <aside className="w-64 border-r border-slate-800 p-4">
        <WidgetPalette onAdd={(type) => addWidget(type)} />
      </aside>

      {/* Canvas */}
      <main className="flex-1 p-4">
        <CanvasArea
          widgets={widgets}
          layout={layout}
          onLayoutChange={setLayout}
          onSelect={setSelectedWidget}
        />
      </main>

      {/* Property Panel */}
      {selectedWidget && (
        <aside className="w-80 border-l border-slate-800 p-4">
          <PropertyPanel
            widget={widgets.find(w => w.id === selectedWidget)!}
            onUpdate={(updates) => updateWidget(selectedWidget, updates)}
          />
        </aside>
      )}
    </div>
  );
}
```

---

## Screen 3: Query Editor

**HTML:** `data-analyst/15-query-editor.html`
**Target Component:** `app/pages/query/editor.tsx`
**Route:** `/query`

**API Integration:**
- `POST /queries/execute`
- `POST /queries/explain`
- `GET /queries/history`
- `POST /queries/save`
- `POST /queries/export`

**Shared Components:**
- AnalystSidebar
- PageHeader
- NavLink

**New Components:**
- QueryEditor
- SchemaExplorer
- ResultsTable
- QueryHistory

**Implementation Notes:**
- Monaco Editor for SQL editing
- Schema browser sidebar
- Results table with pagination
- Query history panel
- Execute, explain, save, export actions
- Keyboard shortcuts (Cmd+Enter to execute)

**Key Libraries:**
- `@monaco-editor/react` for SQL editor
- SQL syntax highlighting

**Component Structure:**
```tsx
export function QueryEditorPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResult | null>(null);
  const executeQuery = useExecuteQuery();

  const handleExecute = async () => {
    const result = await executeQuery.mutateAsync({ sql: query });
    setResults(result);
  };

  return (
    <div className="flex h-screen">
      {/* Schema Explorer */}
      <aside className="w-64 border-r border-slate-800">
        <SchemaExplorer onTableClick={(table) => insertTableName(table)} />
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 border-b border-slate-800">
          <Button onClick={handleExecute} disabled={executeQuery.isPending}>
            <iconify-icon icon="solar:play-bold" />
            Execute
          </Button>
          <Button variant="ghost" onClick={handleExplain}>
            Explain
          </Button>
          <Button variant="ghost" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={handleExport}>
            Export
          </Button>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <MonacoEditor
            language="sql"
            value={query}
            onChange={setQuery}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
            }}
          />
        </div>

        {/* Results */}
        <div className="h-1/2 border-t border-slate-800">
          {results && <ResultsTable data={results} />}
        </div>
      </main>

      {/* Query History */}
      <aside className="w-64 border-l border-slate-800">
        <QueryHistory onSelect={(q) => setQuery(q.sql)} />
      </aside>
    </div>
  );
}
```

---

## Screen 4: Data Models List

**HTML:** `data-analyst/16-data-models.html`
**Target Component:** `app/pages/models/list.tsx`
**Route:** `/models`

**API Integration:**
- `GET /data-models`

**Shared Components:**
- AnalystSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**New Components:**
- DataModelCard

**Implementation Notes:**
- Grid or list view of data models
- Search and filter
- Status indicators (valid, invalid, draft)
- Create new model button
- Click to edit model

---

## Screen 5: Data Model Editor

**HTML:** `data-analyst/17-data-model-editor.html`
**Target Component:** `app/pages/models/editor.tsx`
**Route:** `/models/:id`

**API Integration:**
- `GET /data-models/:id`
- `PATCH /data-models/:id`
- `POST /data-models/:id/validate`
- `GET /data-models/:id/dependencies`

**Shared Components:**
- AnalystSidebar
- PageHeader
- Breadcrumb
- NavLink

**New Components:**
- DataModelEditor
- RelationshipDiagram
- FieldEditor

**Implementation Notes:**
- Visual relationship diagram
- Field definitions editor
- Calculated fields
- Validation status
- Dependencies viewer
- Save/validate actions

**Key Libraries:**
- `reactflow` for relationship diagram

**Component Structure:**
```tsx
export function DataModelEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { data: model } = useDataModel(id!);
  const updateModel = useUpdateDataModel();
  const validateModel = useValidateDataModel();

  return (
    <div className="flex h-screen">
      {/* Relationship Diagram */}
      <main className="flex-1">
        <RelationshipDiagram
          tables={model?.tables}
          relationships={model?.relationships}
          onUpdate={(updates) => updateModel.mutate({ id, ...updates })}
        />
      </main>

      {/* Field Editor Panel */}
      <aside className="w-96 border-l border-slate-800 p-4">
        <FieldEditor
          fields={model?.fields}
          onUpdate={(fields) => updateModel.mutate({ id, fields })}
        />

        <div className="mt-4 flex gap-2">
          <Button onClick={() => validateModel.mutate(id)}>
            Validate
          </Button>
          <Button onClick={() => updateModel.mutate({ id, ...model })}>
            Save
          </Button>
        </div>
      </aside>
    </div>
  );
}
```

---

## Analyst Layout

```tsx
// app/pages/layout.tsx
import { Outlet } from 'react-router';
import { AnalystSidebar } from '~/components/layout/AnalystSidebar';

export function AnalystLayout() {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="flex h-screen bg-slate-900">
      <AnalystSidebar user={user} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Implementation Checklist

- [ ] Create analyst layout component
- [ ] Install Monaco Editor: `npm install @monaco-editor/react`
- [ ] Install React Grid Layout: `npm install react-grid-layout`
- [ ] Install React Flow: `npm install reactflow`
- [ ] Convert Screen 1: Analyst home
- [ ] Convert Screen 2: Dashboard builder
- [ ] Convert Screen 3: Query editor
- [ ] Convert Screen 4: Data models list
- [ ] Convert Screen 5: Data model editor
- [ ] Set up routes
- [ ] Create TanStack Query hooks
- [ ] Test analyst-only access

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend-analytics-dashboard/app/pages/
rg "window\.location\.(href|replace)" frontend-analytics-dashboard/app/pages/
```

---
