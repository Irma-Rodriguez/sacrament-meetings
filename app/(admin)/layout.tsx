import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const instant = false;

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <section>
            {children}
        </section>
    );
}
