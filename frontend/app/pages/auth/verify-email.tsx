import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

type VerificationState = 'loading' | 'success' | 'error';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [state, setState] = useState<VerificationState>(token ? 'loading' : 'success');

  useEffect(() => {
    if (token) {
      // Simulate API call to verify email
      const verifyEmail = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          // Simulate successful verification
          setState('success');
        } catch {
          setState('error');
        }
      };
      verifyEmail();
    }
  }, [token]);

  if (state === 'loading') {
    return (
      <div className="w-full max-w-[400px] space-y-8 text-center">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <iconify-icon icon="solar:letter-linear" width="32" className="text-indigo-500"></iconify-icon>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Verifying your email...</h1>
          <p className="text-slate-400 text-sm">Please wait while we verify your email address.</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="w-full max-w-[400px] space-y-8 text-center">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto">
          <iconify-icon icon="solar:close-circle-bold" width="32" className="text-rose-500"></iconify-icon>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Verification failed</h1>
          <p className="text-slate-400 text-sm">
            The verification link is invalid or has expired. Please request a new verification email.
          </p>
        </div>
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] space-y-8 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
        <iconify-icon icon="solar:check-circle-bold" width="32" className="text-emerald-500"></iconify-icon>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
          {token ? 'Email verified!' : 'Check your email'}
        </h1>
        <p className="text-slate-400 text-sm">
          {token
            ? 'Your email has been verified successfully. You can now sign in to your account.'
            : 'We\'ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.'}
        </p>
      </div>

      {/* Email Icon */}
      {!token && (
        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <iconify-icon icon="solar:letter-opened-linear" width="24" className="text-indigo-400"></iconify-icon>
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-200">Didn't receive the email?</p>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Click to resend
              </button>
            </div>
          </div>
        </div>
      )}

      <Link
        to="/auth/login"
        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
      >
        {token ? 'Continue to sign in' : 'Back to sign in'}
      </Link>
    </div>
  );
}
