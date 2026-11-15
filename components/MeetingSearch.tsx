'use client';

import { useSearchParams, usePathname, useRouter, } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', '1');

        if (term.trim()) {
            params.set('query', term.trim());
        } else {
            params.delete('query');
        }

        const queryString = params.toString();

        router.replace(
            queryString ? `${pathname}?${queryString}` : pathname
        );
    }, 300);

    return (
        <div className="mb-6">
            <input
                id="meeting-search"
                name="query"
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings"
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
        </div>
    );
}