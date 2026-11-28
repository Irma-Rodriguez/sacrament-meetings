'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/auth-actions';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <form action={formAction} className="space-y-5">
            <div>
                <label htmlFor="email" className="block font-semibold mb-2">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                    placeholder="admin@example.com"
                />
            </div>

            <div>
                <label htmlFor="password" className="block font-semibold mb-2">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                    placeholder="Enter your password"
                />
            </div>

            {errorMessage && (
                <p role="alert" className="text-sm text-red-600">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
            >
                {isPending ? 'Signing in...' : 'Log In'}
            </button>
        </form>
    );
}
