import { getMeetingByDate } from '@/lib/meetings-db';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';

export const instant = false;

export default async function CurrentMeetingPage() {
    await connection();

    // Get today's date in Colombia
    const dateParts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());

    const year = Number(
        dateParts.find(part => part.type === 'year')?.value
    );

    const month = Number(
        dateParts.find(part => part.type === 'month')?.value
    );

    const day = Number(
        dateParts.find(part => part.type === 'day')?.value
    );

    const today = new Date(Date.UTC(year, month - 1, day));

    // Find the upcoming Sunday (or today if it is Sunday)
    const dayOfWeek = today.getUTCDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;

    const sunday = new Date(today);
    sunday.setUTCDate(today.getUTCDate() + daysUntilSunday);

    const sundayDate = sunday.toISOString().slice(0, 10);

    const meeting = await getMeetingByDate(sundayDate);

    if (!meeting) {
        redirect('/meetings');
    }

    redirect(`/meetings/${meeting.id}?from=current`);
}
