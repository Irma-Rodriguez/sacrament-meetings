import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import { headers } from 'next/headers';

export default async function MeetingsPage() {
    const headersList = await headers();

    const host =
        headersList.get('x-forwarded-host') ??
        headersList.get('host');

    const protocol =
        headersList.get('x-forwarded-proto') ?? 'http';

    if (!host) {
        throw new Error('Unable to determine application host');
    }

    const response = await fetch(
        `${protocol}://${host}/api/meetings`,
        { cache: 'no-store' }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch meetings');
    }

    const meetings: SacramentMeeting[] = await response.json();

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

            {meetings.length === 0 ? (
                <p>No meetings available.</p>
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
        </section>
    );
}