import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';

interface MeetingsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const params = await searchParams;

    const query = params.query ?? '';

    const parsedPage = Number(params.page ?? '1');

    const currentPage =
        Number.isInteger(parsedPage) && parsedPage > 0
            ? parsedPage
            : 1;

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <section>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    Sacrament Meetings
                </h1>

                <p className="text-gray-600 mt-2">
                    View current and past sacrament meeting programs.
                </p>
            </div>

            <MeetingSearch />

            {meetings.length === 0 ? (
                <p className="text-gray-600 py-8">
                    No meetings found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            )}
        </section>
    );
}