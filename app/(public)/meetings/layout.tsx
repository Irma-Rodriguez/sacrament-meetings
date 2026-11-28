import { Suspense } from 'react';
import MeetingsNavigation from '@/components/MeetingsNavigation';

export default function MeetingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <Suspense fallback={<p>Loading navigation...</p>}>
                <MeetingsNavigation />
            </Suspense>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </div>
        </section>
    );
}
