'use client';

import { useEffect, useRef } from 'react';

export default function Header() {
    const dateRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const today = new Date();

        const formattedDate = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        if (dateRef.current) {
            dateRef.current.textContent = formattedDate;
        }
    }, []);

    return (
        <header className="bg-blue-900 text-white px-6 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold">
                    Tunja Ward
                </h1>

                <p className="mt-2 text-blue-100">
                    Sacrament Meeting Planner
                </p>

                <p
                    ref={dateRef}
                    className="mt-3 text-sm text-blue-200"
                />
            </div>
        </header>
    );
}