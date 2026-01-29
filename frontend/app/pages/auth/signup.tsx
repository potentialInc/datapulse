import { useState, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(1, 'Company is required'),
  department: z.string().min(1, 'Please select a department'),
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

type SignupFormData = z.infer<typeof signupSchema>;

const departments = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product Management' },
  { value: 'data', label: 'Data Science' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'other', label: 'Other' },
];

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      department: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = form.watch('password');

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 0) strength = 1;
    if (password.length > 6) strength = 2;
    if (password.length > 8 && /[A-Z]/.test(password)) strength = 3;
    if (password.length > 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) strength = 4;
    return strength;
  }, [password]);

  const strengthColor = passwordStrength <= 1 ? 'bg-red-500' : passwordStrength === 2 ? 'bg-amber-500' : 'bg-emerald-500';

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Signup data:', data);
      navigate('/auth/verify-email');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] px-6 py-12 flex-1 flex flex-col justify-center">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
          <iconify-icon icon="solar:chart-square-linear" width="20"></iconify-icon>
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">DataPulse</span>
      </div>

      {/* Form Header */}
      <div className="text-center lg:text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">Create your account</h1>
        <p className="text-slate-400 text-sm">Start your 14-day free trial. No credit card required.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-medium text-slate-300 ml-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
              <iconify-icon icon="solar:user-linear" width="20"></iconify-icon>
            </div>
            <input
              type="text"
              id="name"
              {...form.register('name')}
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          {form.formState.errors.name && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-slate-300 ml-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
              <iconify-icon icon="solar:letter-linear" width="20"></iconify-icon>
            </div>
            <input
              type="email"
              id="email"
              {...form.register('email')}
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all sm:text-sm"
              placeholder="name@company.com"
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label htmlFor="company" className="block text-xs font-medium text-slate-300 ml-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
              <iconify-icon icon="solar:buildings-linear" width="20"></iconify-icon>
            </div>
            <input
              type="text"
              id="company"
              {...form.register('company')}
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all sm:text-sm"
              placeholder="Acme Inc."
            />
          </div>
          {form.formState.errors.company && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.company.message}</p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <label htmlFor="department" className="block text-xs font-medium text-slate-300 ml-1">
            Department <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
              <iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
            </div>
            <select
              id="department"
              {...form.register('department')}
              className="block w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all sm:text-sm cursor-pointer appearance-none"
            >
              <option value="" disabled className="text-slate-500">Select department</option>
              {departments.map(dept => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
              <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
            </div>
          </div>
          {form.formState.errors.department && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.department.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-medium text-slate-300 ml-1">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
              <iconify-icon icon="solar:lock-password-linear" width="20"></iconify-icon>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...form.register('password')}
              className="block w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all sm:text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <iconify-icon icon={showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'} width="20"></iconify-icon>
            </button>
          </div>
          {/* Strength Indicator */}
          <div className="flex gap-1.5 h-1 mt-2 px-1">
            {[1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={cn(
                  'h-full w-full rounded-full transition-colors duration-300',
                  passwordStrength >= level ? strengthColor : 'bg-slate-700'
                )}
              />
            ))}
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-300 ml-1">Confirm Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
              <iconify-icon icon="solar:lock-password-linear" width="20"></iconify-icon>
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...form.register('confirmPassword')}
              className="block w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all sm:text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <iconify-icon icon={showConfirmPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'} width="20"></iconify-icon>
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-start cursor-pointer group select-none">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                {...form.register('acceptTerms')}
                className="peer h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-800 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all cursor-pointer"
              />
              <iconify-icon
                icon="solar:check-read-linear"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                width="10"
              ></iconify-icon>
            </div>
            <span className="ml-2 text-xs text-slate-400 leading-relaxed">
              I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline">Privacy Policy</a>.
            </span>
          </label>
          {form.formState.errors.acceptTerms && (
            <p className="text-xs text-rose-400 ml-1 mt-1">{form.formState.errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] mt-4 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-8 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
