import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
    title: 'Log In | Sacrament Meeting Planner',
    description: 'Sign in to manage sacrament meeting programs.',
};

export default function LoginPage() {
    return (
        <main className="flex min-h-[75vh] items-center justify-center px-6 py-12">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-blue-900 text-center mb-3">
                    Welcome Back
                </h1>

                <p className="text-gray-600 text-center mb-8">
                    Sign in to manage your sacrament meeting programs.
                </p>

                <LoginForm />
            </div>
        </main>
    );
}
