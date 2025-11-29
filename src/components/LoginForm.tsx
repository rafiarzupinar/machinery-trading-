"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
      const router = useRouter();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                  const result = await signIn('credentials', {
                        email,
                        password,
                        redirect: false,
                  });

                  if (result?.error) {
                        setError('Invalid email or password');
                  } else {
                        router.push('/admin');
                        router.refresh();
                  }
            } catch (err) {
                  setError('An error occurred. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                              <input
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                              />
                        </div>
                        <div>
                              <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                              />
                        </div>
                  </div>

                  {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                  )}

                  <div>
                        <button
                              type="submit"
                              disabled={loading}
                              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                              {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                  </div>
            </form>
      );
}
