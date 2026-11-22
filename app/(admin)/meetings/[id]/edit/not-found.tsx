import Link from 'next/link';

export default function MeetingNotFound() {
    return (
        <div className="max-w-xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-blue-900">
                Meeting not found
            </h1>

            <p className="text-gray-600 mt-3">
                The meeting you are looking for does not exist.
                It may have been deleted.
            </p>

            <Link
                href="/meetings"
                className="inline-block mt-6 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
                Back to Meetings
            </Link>
        </div>
    );
}