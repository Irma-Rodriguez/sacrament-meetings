import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '@/components/MeetingCard';
import { connection } from 'next/server';

export const instant = false;

async function getMeetings(): Promise<SacramentMeeting[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/meetings`,
        { cache: 'no-store' }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch meetings');
    }

    return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
    await connection();

    const meetings = await getMeetings();

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