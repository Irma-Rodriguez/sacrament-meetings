import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '@/components/MeetingDetail';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export const instant = false;

interface MeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MeetingPage({
    params,
}: MeetingPageProps) {
    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
        notFound();
    }

    const headersList = await headers();

    const host =
        headersList.get('x-forwarded-host') ??
        headersList.get('host');

    const protocol =
        headersList.get('x-forwarded-proto') ?? 'http';

    if (!host) {
        throw new Error('Unable to determine application host');
    }

    const response = await fetch(
        `${protocol}://${host}/api/meetings/${id}`,
        { cache: 'no-store' }
    );

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error('Failed to fetch meeting');
    }

    const meeting: SacramentMeeting = await response.json();

    return <MeetingDetail meeting={meeting} />;
}