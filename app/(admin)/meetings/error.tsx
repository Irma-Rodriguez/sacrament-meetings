'use client';

import Link from 'next/link';

interface MeetingsErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function MeetingsError({
    error,
    reset,
}: MeetingsErrorProps) {
    console.error(error);
    return (
        <main className="max-w-xl mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl font-bold text-red-700">
                Something went wrong!
            </h1>

            <p className="text-gray-600 mt-4">
                We could not load the meetings. Please try again.
            </p>

            <button
                onClick={reset}
                className="mt-6 rounded-lg bg-blue-900 px-6 py-3 text-white hover:bg-blue-800"
            >
                Try Again
            </button>

            <div className="mt-4">
                <Link
                    href="/meetings"
                    className="text-blue-800 hover:underline"
                >
                    Back to Meetings
                </Link>
            </div>
        </main>
    );
}
