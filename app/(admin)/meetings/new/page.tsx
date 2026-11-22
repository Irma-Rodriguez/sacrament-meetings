import Link from 'next/link';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <Link
                href="/meetings"
                className="text-blue-800 hover:underline"
            >
                Back to Meetings
            </Link>

            <h1 className="text-3xl font-bold text-blue-900 mt-6 mb-3">
                Create Sacrament Meeting
            </h1>

            <p className="text-gray-600 mb-8">
                Complete the information below to create a new meeting program.
            </p>

            <MeetingForm />
        </main>
    );
}