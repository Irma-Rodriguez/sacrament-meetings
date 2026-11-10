import { getMeetingById } from '@/lib/meetings-db';

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return Response.json(
            { message: 'Invalid meeting ID' },
            { status: 400 }
        );
    }

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
        return Response.json(
            { message: 'Meeting not found' },
            { status: 404 }
        );
    }

    return Response.json(meeting);
}