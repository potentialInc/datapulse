---
frontend: "frontend"
port: 5173
category: "modals"
html_files: 2
priority: "P2"
depends_on: "00-shared-components.md"
---

# Modal Screens - React Conversion

## Context

Converting 2 modal HTML screens to React modal components. These are used within the main frontend application.

**Architecture:**
- React 19
- Forms: React Hook Form + Zod
- UI: Tailwind CSS + Modal component

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Create Alert Modal

**HTML:** `modals/modal-create-alert.html`
**Target Component:** `app/components/modals/CreateAlertModal.tsx`
**Route:** N/A (modal component)

**API Integration:**
- `POST /alerts`

**Shared Components:**
- Modal

**New Components:**
- CreateAlertForm
- MetricPreview

**Event Handlers to Convert:**

| HTML Function | React Implementation |
|---------------|---------------------|
| `updateMetricPreview()` | `useState` for selected metric + conditional rendering |
| `createAlert()` | Form submission handler + `useMutation` + toast |

**Form Schema:**
```typescript
const createAlertSchema = z.object({
  name: z.string().min(1, 'Alert name is required'),
  metric: z.string().min(1, 'Select a metric'),
  condition: z.enum(['above', 'below', 'equals', 'changes']),
  threshold: z.number().min(0, 'Threshold must be positive'),
  severity: z.enum(['critical', 'warning', 'info']),
  channels: z.array(z.enum(['email', 'slack', 'sms'])).min(1, 'Select at least one channel'),
});
```

**Component Implementation:**
```tsx
interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (alert: Alert) => void;
}

export function CreateAlertModal({ isOpen, onClose, onSuccess }: CreateAlertModalProps) {
  const createAlert = useCreateAlert();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const form = useForm<CreateAlertForm>({
    resolver: zodResolver(createAlertSchema),
  });

  const onSubmit = async (data: CreateAlertForm) => {
    const result = await createAlert.mutateAsync(data);
    toast.success('Alert created successfully');
    onSuccess?.(result);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Alert">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Alert Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., High CPU Usage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Metric Selection */}
          <FormField
            control={form.control}
            name="metric"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metric</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedMetric(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Metric Preview - Conditional Rendering */}
          {selectedMetric && (
            <MetricPreview metricId={selectedMetric} />
          )}

          {/* Condition & Threshold */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="changes">Changes by</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threshold</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Severity */}
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                  <RadioGroupItem value="info" label="Info" />
                  <RadioGroupItem value="warning" label="Warning" />
                  <RadioGroupItem value="critical" label="Critical" />
                </RadioGroup>
              </FormItem>
            )}
          />

          {/* Notification Channels */}
          <FormField
            control={form.control}
            name="channels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Channels</FormLabel>
                <div className="flex gap-4">
                  {['email', 'slack', 'sms'].map(channel => (
                    <label key={channel} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(channel)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...(field.value || []), channel]
                            : field.value?.filter(c => c !== channel) || [];
                          field.onChange(updated);
                        }}
                      />
                      <span className="capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Modal Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={createAlert.isPending}>
          {createAlert.isPending ? 'Creating...' : 'Create Alert'}
        </Button>
      </div>
    </Modal>
  );
}
```

---

## Screen 2: Schedule Report Modal

**HTML:** `modals/modal-schedule-report.html`
**Target Component:** `app/components/modals/ScheduleReportModal.tsx`
**Route:** N/A (modal component)

**API Integration:**
- `POST /reports`

**Shared Components:**
- Modal

**New Components:**
- ScheduleReportForm

**Form Schema:**
```typescript
const scheduleReportSchema = z.object({
  name: z.string().min(1, 'Report name is required'),
  dashboard: z.string().min(1, 'Select a dashboard'),
  format: z.enum(['pdf', 'csv', 'excel']),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  dayOfWeek: z.number().min(0).max(6).optional(),
  dayOfMonth: z.number().min(1).max(31).optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  recipients: z.array(z.string().email()).min(1, 'Add at least one recipient'),
});
```

**Component Implementation:**
```tsx
interface ScheduleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (report: Report) => void;
}

export function ScheduleReportModal({ isOpen, onClose, onSuccess }: ScheduleReportModalProps) {
  const scheduleReport = useScheduleReport();
  const { data: dashboards } = useDashboards();

  const form = useForm<ScheduleReportForm>({
    resolver: zodResolver(scheduleReportSchema),
    defaultValues: {
      frequency: 'weekly',
      format: 'pdf',
      recipients: [],
    },
  });

  const frequency = form.watch('frequency');

  const onSubmit = async (data: ScheduleReportForm) => {
    const result = await scheduleReport.mutateAsync(data);
    toast.success('Report scheduled successfully');
    onSuccess?.(result);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Report">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Report Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Weekly Sales Report" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dashboard Selection */}
          <FormField
            control={form.control}
            name="dashboard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dashboard</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a dashboard" />
                  </SelectTrigger>
                  <SelectContent>
                    {dashboards?.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Format & Frequency */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* Conditional: Day of Week (for weekly) */}
          {frequency === 'weekly' && (
            <FormField
              control={form.control}
              name="dayOfWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day of Week</FormLabel>
                  <Select onValueChange={(v) => field.onChange(+v)} value={String(field.value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => (
                        <SelectItem key={i} value={String(i)}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}

          {/* Time */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Recipients */}
          <FormField
            control={form.control}
            name="recipients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipients</FormLabel>
                <RecipientInput
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Modal Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={scheduleReport.isPending}>
          {scheduleReport.isPending ? 'Scheduling...' : 'Schedule Report'}
        </Button>
      </div>
    </Modal>
  );
}
```

---

## Implementation Checklist

- [ ] Ensure Modal shared component is created
- [ ] Convert Screen 1: Create Alert Modal
- [ ] Create MetricPreview component
- [ ] Convert Screen 2: Schedule Report Modal
- [ ] Create RecipientInput component
- [ ] Create mutation hooks (useCreateAlert, useScheduleReport)
- [ ] Test form validations
- [ ] Test modal open/close behavior
- [ ] Test keyboard navigation (Escape to close)

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend/app/components/modals/
rg "window\.location\.(href|replace)" frontend/app/components/modals/
rg "classList\.(add|remove|toggle)" frontend/app/components/modals/
```

---
