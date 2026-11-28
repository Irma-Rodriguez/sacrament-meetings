'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

interface NavLinksProps {
    isLoggedIn: boolean;
}

export default function NavLinks({ isLoggedIn }: NavLinksProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const fromCurrent = searchParams.get('from') === 'current';

    const links = [
        { href: '/', label: 'Home' },
        { href: '/meetings', label: 'All Meetings' },
        { href: '/meetings/current', label: 'Current Meeting' },
    ];

    return (
        <nav className="bg-blue-800 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap gap-6">
                    {links.map((link) => {
                        const isActive =
                            link.href === '/meetings/current'
                                ? pathname === '/meetings/current' || fromCurrent
                                : link.href === '/meetings'
                                    ? pathname === '/meetings' ||
                                    (pathname.startsWith('/meetings/') && !fromCurrent)
                                    : pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`font-medium transition-colors ${isActive
                                        ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1'
                                        : 'text-white hover:text-yellow-200'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {isLoggedIn ? (
                    <LogoutButton />
                ) : (
                    <Link
                        href="/login"
                        className="font-medium bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-100"
                    >
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    );
}
