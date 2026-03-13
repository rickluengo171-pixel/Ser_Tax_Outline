import { useState, useRef, useEffect } from 'react';

export default function Verify() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...code];

    if (value.length > 1) {
      newCode[index] = value.slice(-1);
    } else {
      newCode[index] = value;
    }

    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const codeString = code.join('');

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-light text-white mb-2">Check your phone</h1>
          <p className="text-gray-400 text-sm">We sent a 6-digit code to ••••••-7823</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="flex gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white text-2xl font-light text-center focus:outline-none focus:border-[#b89968] transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || codeString.length !== 6}
            className="w-full py-3 bg-[#b89968] hover:bg-[#a68959] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Verify
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Didn't receive a code? <button className="text-gray-300 hover:text-white transition-colors">Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
}
