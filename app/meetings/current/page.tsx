import { getMeetings } from '@/lib/meetings-db';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';

export const instant = false;

export default async function CurrentMeetingPage() {
    // Wait for the request before accessing the current date
    await connection();

    const today = new Date();

    // Find the most recent Sunday
    const dayOfWeek = today.getDay();

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    // Format date as YYYY-MM-DD
    const sundayDate = [
        sunday.getFullYear(),
        String(sunday.getMonth() + 1).padStart(2, '0'),
        String(sunday.getDate()).padStart(2, '0'),
    ].join('-');

    // Find the meeting for that Sunday
    const meetings = getMeetings(sundayDate);

    if (meetings.length === 0) {
        redirect('/meetings');
    }

    redirect(`/meetings/${meetings[0].id}?from=current`);
}