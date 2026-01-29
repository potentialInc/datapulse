import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { Button } from '~/components/ui/button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const demoCredentials = [
  { label: 'Business User', email: 'business@demo.com', password: 'demo123', color: 'text-indigo-400', route: '/dashboard' },
  { label: 'Data Analyst', email: 'analyst@demo.com', password: 'demo123', color: 'text-purple-400', route: '/dashboard' },
  { label: 'Ops Manager', email: 'ops@demo.com', password: 'demo123', color: 'text-amber-400', route: '/dashboard' },
  { label: 'System Admin', email: 'admin@demo.com', password: 'demo123', color: 'text-rose-400', route: '/dashboard' },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fillCredentials = (email: string, password: string) => {
    form.setValue('email', email);
    form.setValue('password', password);
    setError(null);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Find matching demo credential
      const credential = demoCredentials.find(
        (cred) => cred.email === data.email && cred.password === data.password
      );

      if (credential) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate(credential.route);
      } else {
        setError('Invalid credentials. Use one of the demo accounts below.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] space-y-8">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
          <iconify-icon icon="solar:chart-square-linear" width="20"></iconify-icon>
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">DataPulse</span>
      </div>

      {/* Form Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">Welcome back</h1>
        <p className="text-slate-400 text-sm">Sign in to your account to continue</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-slate-300 ml-1">
            Work Email
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

        {/* Password Input */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-medium text-slate-300 ml-1">
            Password
          </label>
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
              <iconify-icon
                icon={showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'}
                width="20"
              ></iconify-icon>
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-rose-400 ml-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="peer h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-800 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all cursor-pointer"
              />
              <iconify-icon
                icon="solar:check-read-linear"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                width="12"
              ></iconify-icon>
            </div>
            <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-400 cursor-pointer select-none">
              Remember me
            </label>
          </div>
          <div className="text-xs">
            <Link to="/auth/forgot-password" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
            <p className="text-xs text-rose-400">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-slate-900 text-slate-500">or continue with</span>
        </div>
      </div>

      {/* SSO Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex items-center justify-center py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all group"
        >
          <iconify-icon
            icon="logos:google-icon"
            width="20"
            className="grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all"
          ></iconify-icon>
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all group"
        >
          <iconify-icon
            icon="logos:okta-icon"
            width="20"
            className="grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all"
          ></iconify-icon>
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all group"
          title="SAML SSO"
        >
          <iconify-icon
            icon="solar:shield-keyhole-linear"
            width="22"
            className="text-slate-400 group-hover:text-indigo-400 transition-colors"
          ></iconify-icon>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign up
        </Link>
      </p>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
        <p className="text-xs font-medium text-slate-400 mb-3 text-center">Demo Credentials</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {demoCredentials.map((cred) => (
            <button
              key={cred.email}
              type="button"
              onClick={() => fillCredentials(cred.email, cred.password)}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition"
            >
              <span className={`${cred.color} font-medium`}>{cred.label}</span>
              <span className="block text-slate-500 text-[10px]">{cred.email}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
