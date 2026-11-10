import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps { meeting: SacramentMeeting; }

export default function MeetingCard({ meeting }: MeetingCardProps) {
    const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <p className="text-sm text-blue-700 font-semibold uppercase">
                {meeting.meetingType} meeting
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-2">
                {formattedDate}
            </h2>

            <div className="mt-4 space-y-2 text-gray-600">
                <p>
                    <strong>Presiding:</strong> {meeting.presiding}
                </p>

                <p>
                    <strong>Conducting:</strong> {meeting.conducting}
                </p>

                <p>
                    <strong>Opening Hymn:</strong>{' '}
                    {meeting.openingHymn.number} - {meeting.openingHymn.title}
                </p>
            </div>

            <Link
                href={`/meetings/${meeting.id}`}
                className="inline-block mt-5 bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
            >
                View Meeting Details
            </Link>
        </article>
    );
}