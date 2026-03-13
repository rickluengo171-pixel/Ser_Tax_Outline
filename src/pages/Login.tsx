import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#b89968] transform -rotate-45"></div>
              <div className="w-4 h-4 bg-[#b89968] transform -rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="w-4 h-4 bg-[#b89968] transform -rotate-45 translate-x-2 -translate-y-2"></div>
              <div className="w-4 h-4 bg-[#b89968] transform -rotate-45 translate-x-3 -translate-y-3"></div>
            </div>
          </div>
          <h1 className="text-4xl font-light text-white mb-2">SOVEREIGN</h1>
          <p className="text-gray-400 text-sm mb-8">Secured with multi-factor authentication</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl text-white mb-1">Tax Preparation Client Portal</h2>
          <p className="text-gray-500 text-sm">Sign in to your tax portal</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#b89968] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#b89968] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full py-3 bg-[#b89968] hover:bg-[#a68959] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center mb-6">
            New client? You'll receive an invite from your tax preparer.
          </p>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0a0a0a] text-gray-500">Or sign in with</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center mb-4">
            If your firm uses Microsoft 365 or Google Workspace, sign in below
          </p>

          <div className="space-y-3">
            <button className="w-full py-3 border border-gray-700 rounded-lg text-white hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <button className="w-full py-3 border border-gray-700 rounded-lg text-white hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#0078D4" d="M11.4 24H0V11.4h11.4V24zM24 24H12.6V11.4H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              Sign in with Microsoft
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center mt-8">
          By signing in, you agree to our <button className="text-gray-400 hover:text-gray-300">Terms of Service</button> and <button className="text-gray-400 hover:text-gray-300">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}
