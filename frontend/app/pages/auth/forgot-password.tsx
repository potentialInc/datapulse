import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import { Button } from '~/components/ui/button';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Reset password for:', data.email);
      setIsSuccess(true);
    } catch (error) {
      console.error('Forgot password error:', error);
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
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Check your email</h1>
          <p className="text-slate-400 text-sm">
            We've sent a password reset link to your email address. Please check your inbox.
          </p>
        </div>
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16"></iconify-icon>
          Back to sign in
        </Link>
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
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">Forgot password?</h1>
        <p className="text-slate-400 text-sm">No worries, we'll send you reset instructions.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-slate-300 ml-1">
            Email
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Reset password'}
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
