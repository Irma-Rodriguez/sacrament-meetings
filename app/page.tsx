import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-4xl font-bold text-blue-900">
            Welcome to Tunja Ward
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Welcome to our Sacrament Meeting Planner. Find meeting schedules, announcements, hymns and speakers.
          </p>

          <Link href="/meetings" className="inline-block mt-6 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
            View Meetings
          </Link>

        </div>

        <div>
          <Image
            src="/chruch.jpg"
            alt="Church meetinghouse for Tunja Ward"
            width={800}
            height={500}
            priority
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>

      </div>
    </section>
  );
}