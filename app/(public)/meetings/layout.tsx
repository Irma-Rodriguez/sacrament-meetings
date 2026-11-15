import NavLinks from '@/components/NavLinks';
import { Suspense } from 'react';

export default function MeetingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>

            <Suspense fallback={<p>Loading navigation...</p>}>
                <NavLinks />
            </Suspense>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </div>
        </section>
    );
}
