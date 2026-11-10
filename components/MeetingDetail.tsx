import type { SacramentMeeting } from '@/lib/types';
import PrintButton from './PrintButton';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    return (
        <article className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">

            <header className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold text-blue-900">
                    Tunja Ward
                </h1>

                <p className="text-gray-600 mt-2">
                    Sacrament Meeting Program
                </p>

                <p className="font-semibold mt-3">
                    {new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>

                <p className="mt-2 text-gray-600">
                    {meeting.meetingType.toUpperCase()} MEETING
                </p>
            </header>

            <section className="mt-6">
                <p><strong>Presiding:</strong> {meeting.presiding}</p>
                <p><strong>Conducting:</strong> {meeting.conducting}</p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-bold text-blue-900">
                    Announcements
                </h2>

                {meeting.announcements?.length ? (
                    <ul className="list-disc pl-6 mt-2">
                        {meeting.announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-2">
                        No announcements.
                    </p>
                )}
            </section>

            <section className="mt-6 space-y-4">
                <div>
                    <h2 className="font-bold text-blue-900">Opening Hymn</h2>
                    <p>{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
                </div>

                <div>
                    <h2 className="font-bold text-blue-900">Opening Prayer</h2>
                    <p>{meeting.openingPrayer}</p>
                </div>

                <div>
                    <h2 className="font-bold text-blue-900">Ward Business</h2>
                    {meeting.wardBusiness.length ? (
                        <ul className="list-disc pl-6">
                            {meeting.wardBusiness.map((item, index) => (
                                <li key={index}>{item.description}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No ward business.</p>
                    )}
                </div>

                <div>
                    <h2 className="font-bold text-blue-900">Stake Business</h2>
                    <p>{meeting.stakeBusiness ? 'Yes' : 'No'}</p>
                </div>

                <div>
                    <h2 className="font-bold text-blue-900">Sacrament Hymn</h2>
                    <p>{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-bold text-blue-900">
                    Speakers and Musical Numbers
                </h2>

                {meeting.speakers.map((item, index) => (
                    <div key={index} className="mt-3">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600">
                            {item.type === 'speaker' ? 'Speaker' : 'Musical Number'}
                            {item.topic && ` - ${item.topic}`}
                        </p>
                    </div>
                ))}
            </section>

            <section className="mt-6 space-y-4">
                <div>
                    <h2 className="font-bold text-blue-900">Closing Hymn</h2>
                    <p>{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
                </div>

                <div>
                    <h2 className="font-bold text-blue-900">Closing Prayer</h2>
                    <p>{meeting.closingPrayer}</p>
                </div>
            </section>

            <div className="mt-8 text-center print:hidden">
                <PrintButton />
            </div>

        </article>
    );
}