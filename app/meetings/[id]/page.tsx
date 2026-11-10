import type { SacramentMeeting } from '@/lib/types';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';
import { notFound } from 'next/navigation';

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

    const meeting: SacramentMeeting | null = getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}