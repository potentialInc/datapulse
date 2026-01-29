---
frontend: "frontend"
port: 5173
category: "auth"
html_files: 6
priority: "P1"
depends_on: "00-shared-components.md"
---

# Auth Screens - React Conversion

## Context

Converting 6 authentication HTML screens to React components for the main frontend application.

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit (auth slice)
- Forms: React Hook Form + Zod
- UI: Tailwind CSS

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`
- Architecture: `.claude-project/docs/PROJECT_KNOWLEDGE.md`

---

## Screen 1: Landing Page

**HTML:** `auth/01-landing.html`
**Target Component:** `app/pages/public/landing.tsx`
**Route:** `/`

**Shared Components:**
- PageHeader

**New Components:**
- LandingHero
- FeatureSection
- CTASection

**Implementation Notes:**
- Public page, no authentication required
- Marketing page with hero, features, and CTA sections
- Links to login/signup pages

---

## Screen 2: Login

**HTML:** `auth/02-login.html`
**Target Component:** `app/pages/auth/login.tsx`
**Route:** `/auth/login`

**API Integration:**
- `POST /auth/login` - Email/password login
- `POST /auth/login/google` - Google OAuth
- `POST /auth/login/okta` - Okta SSO

**New Components:**
- LoginForm

**Event Handlers to Convert:**

| HTML Function | React Implementation |
|---------------|---------------------|
| `togglePassword()` | `useState<boolean>` for showPassword |
| `fillCredentials(email, password)` | `form.setValue()` from React Hook Form |
| Form `onsubmit` | `useForm()` + `onSubmit` handler + `useNavigate()` |

**Event Conversion Checklist:**
- [ ] Form uses React Hook Form with Zod validation
- [ ] Password input is controlled with visibility toggle state
- [ ] Navigation uses `useNavigate()` hook
- [ ] Auth state stored in Redux (no sessionStorage)
- [ ] Error handling uses toast or error state

**Zod Schema:**
```typescript
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
```

**Form Implementation:**
```tsx
const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
});
const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
const dispatch = useAppDispatch();

const onSubmit = async (data: LoginForm) => {
  try {
    const result = await authService.login(data);
    dispatch(setUser(result.user));
    // Navigate based on user role
    navigate('/dashboard');
  } catch (error) {
    toast.error('Invalid credentials');
  }
};
```

---

## Screen 3: Signup

**HTML:** `auth/03-signup.html`
**Target Component:** `app/pages/auth/signup.tsx`
**Route:** `/auth/signup`

**API Integration:**
- `POST /auth/register`

**New Components:**
- SignupForm
- PasswordStrengthIndicator

**Event Handlers to Convert:**

| HTML Function | React Implementation |
|---------------|---------------------|
| `togglePassword(inputId, iconId)` | `useState<Record<string, boolean>>` for multiple password fields |
| `checkStrength(password)` | Computed value from password state with useMemo |

**Zod Schema:**
```typescript
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(1, 'Company is required'),
  role: z.enum(['business', 'analyst', 'admin']),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

---

## Screen 4: Forgot Password

**HTML:** `auth/04-forgot-password.html`
**Target Component:** `app/pages/auth/forgot-password.tsx`
**Route:** `/auth/forgot-password`

**API Integration:**
- `POST /auth/forgot-password`

**New Components:**
- ForgotPasswordForm

**Implementation Notes:**
- Simple form with email input
- Success state shows confirmation message
- Link back to login page

---

## Screen 5: Reset Password

**HTML:** `auth/05-reset-password.html`
**Target Component:** `app/pages/auth/reset-password.tsx`
**Route:** `/auth/reset-password`

**API Integration:**
- `POST /auth/reset-password`

**New Components:**
- ResetPasswordForm

**Implementation Notes:**
- Token from URL query parameter
- Password + confirm password fields
- Password strength indicator
- Redirect to login on success

---

## Screen 6: Email Verification

**HTML:** `auth/06-email-verification.html`
**Target Component:** `app/pages/auth/verify-email.tsx`
**Route:** `/auth/verify-email`

**API Integration:**
- `POST /auth/verify-email`

**New Components:**
- EmailVerification

**Implementation Notes:**
- Token from URL query parameter
- Auto-verify on mount with useEffect
- Loading, success, and error states
- Link to login on success

---

## Implementation Checklist

- [ ] Install required dependencies (react-hook-form, @hookform/resolvers, zod)
- [ ] Create auth layout component (`app/pages/auth/layout.tsx`)
- [ ] Convert Screen 1: Landing page
- [ ] Convert Screen 2: Login
- [ ] Convert Screen 3: Signup with password strength
- [ ] Convert Screen 4: Forgot password
- [ ] Convert Screen 5: Reset password
- [ ] Convert Screen 6: Email verification
- [ ] Set up auth routes in router config
- [ ] Create Redux auth slice
- [ ] Test all form validations
- [ ] Test navigation flows

## Post-Conversion Validation

**Run these commands after conversion (should return 0 results):**

```bash
rg "document\.(getElementById|querySelector)" frontend/app/pages/auth/
rg "window\.location\.(href|replace)" frontend/app/pages/auth/
rg "classList\.(add|remove|toggle)" frontend/app/pages/auth/
rg "innerHTML\s*=" frontend/app/pages/auth/
rg "sessionStorage" frontend/app/pages/auth/
```

**Verify React patterns are present:**

```bash
rg "useForm|useNavigate|useState" frontend/app/pages/auth/
```

---
