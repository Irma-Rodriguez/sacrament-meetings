'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({
    totalPages,
    currentPage,
}: PaginationProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', String(page));

        router.push(`${pathname}?${params.toString()}`);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Meeting pagination"
            className="flex justify-center items-center gap-2 mt-10"
        >
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Previous
            </button>

            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    aria-current={
                        currentPage === page ? 'page' : undefined
                    }
                    className={`px-4 py-2 rounded-lg border ${currentPage === page
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 rounded-lg border border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200"
            >
                Next
            </button>
        </nav>
    );
}