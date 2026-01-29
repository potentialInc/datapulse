import { useState, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
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

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Reset password with token:', token, data);
      setIsSuccess(true);
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-[400px] space-y-8 text-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <iconify-icon icon="solar:check-circle-bold" width="32" className="text-emerald-500"></iconify-icon>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Password reset successful</h1>
          <p className="text-slate-400 text-sm">
            Your password has been reset. Redirecting to sign in...
          </p>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">Set new password</h1>
        <p className="text-slate-400 text-sm">Your new password must be different from previous passwords.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Password Input */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-medium text-slate-300 ml-1">New Password</label>
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] disabled:opacity-50"
        >
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>

      {/* Back to Login Link */}
      <div className="text-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16"></iconify-icon>
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
