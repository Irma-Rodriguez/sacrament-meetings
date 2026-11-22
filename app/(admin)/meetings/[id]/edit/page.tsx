import Link from 'next/link';
import { notFound } from 'next/navigation';

import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

export const instant = false;

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
        notFound();
    }

    const meeting = await getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <Link
                href={`/meetings/${meeting.id}`}
                className="text-blue-800 hover:underline"
            >
                Back to Meeting
            </Link>

            <h1 className="text-3xl font-bold text-blue-900 mt-6 mb-3">
                Edit Sacrament Meeting
            </h1>

            <p className="text-gray-600 mb-8">
                Update the meeting information below.
            </p>

            <MeetingForm meeting={meeting} />
        </main>
    );
}