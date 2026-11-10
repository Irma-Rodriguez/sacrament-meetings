import { getMeetings } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';

export const instant = false;

export default function MeetingsPage() {
    const meetings = getMeetings();

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