'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { addMeeting, updateMeeting as updateMeetingInDb, deleteMeeting as deleteMeetingFromDb, } from '@/lib/meetings-db';

const MeetingFormSchema = z.object({
    date: z.string()
        .min(1, 'Please select a meeting date.')
        .refine((value) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                return false;
            }

            const date = new Date(`${value}T00:00:00Z`);

            return !Number.isNaN(date.getTime()) &&
                date.toISOString().slice(0, 10) === value;
        }, 'Enter a valid date.'),

    meetingType: z.enum([
        'testimony',
        'regular',
        'stake',
        'general',
        'special',
    ], { error: 'Please select a meeting type.' }),

    presiding: z.string().trim().min(1, 'Presiding is required.'),
    conducting: z.string().trim().min(1, 'Conducting is required.'),

    announcements: z.string(),

    openingHymnNumber: z.string()
        .regex(/^[1-9]\d*$/, 'Enter a valid hymn number.'),

    openingHymnTitle: z.string().trim()
        .min(1, 'Opening hymn title is required.'),

    openingPrayer: z.string().trim()
        .min(1, 'Opening prayer is required.'),

    wardBusiness: z.string(),

    stakeBusiness: z.boolean(),

    sacramentHymnNumber: z.string()
        .regex(/^[1-9]\d*$/, 'Enter a valid hymn number.'),

    sacramentHymnTitle: z.string().trim()
        .min(1, 'Sacrament hymn title is required.'),

    speakers: z.string().refine((value) => {
        return value.split('\n').every((line) => {
            if (!line.trim()) return true;

            const [name = '', topic = '', type = 'speaker'] =
                line.split('|');

            const validType = [
                'speaker',
                'musical-number',
            ].includes(type.trim());

            return (
                name.trim().length > 0 &&
                topic.trim().length > 0 &&
                validType
            );
        });
    }, 'Use Name|Topic|speaker or Name|Song Title|musical-number.'),

    closingHymnNumber: z.string()
        .regex(/^[1-9]\d*$/, 'Enter a valid hymn number.'),

    closingHymnTitle: z.string().trim()
        .min(1, 'Closing hymn title is required.'),

    closingPrayer: z.string().trim()
        .min(1, 'Closing prayer is required.'),
});

export type MeetingFormState = {
    message?: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
    values?: {
        [key: string]: string | boolean;
    };
};

function getFormData(formData: FormData) {
    return {
        date: String(formData.get('date') ?? ''),
        meetingType: String(formData.get('meetingType') ?? ''),
        presiding: String(formData.get('presiding') ?? ''),
        conducting: String(formData.get('conducting') ?? ''),
        announcements: String(formData.get('announcements') ?? ''),
        openingHymnNumber: String(formData.get('openingHymnNumber') ?? ''),
        openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
        openingPrayer: String(formData.get('openingPrayer') ?? ''),
        wardBusiness: String(formData.get('wardBusiness') ?? ''),
        stakeBusiness: formData.get('stakeBusiness') === 'on',
        sacramentHymnNumber: String(formData.get('sacramentHymnNumber') ?? ''),
        sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),
        speakers: String(formData.get('speakers') ?? ''),
        closingHymnNumber: String(formData.get('closingHymnNumber') ?? ''),
        closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
        closingPrayer: String(formData.get('closingPrayer') ?? ''),
    };
}

function buildMeetingData(data: z.infer<typeof MeetingFormSchema>) {
    return {
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,

        announcements: data.announcements
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean),

        openingHymn: {
            number: Number(data.openingHymnNumber),
            title: data.openingHymnTitle,
        },

        openingPrayer: data.openingPrayer,

        wardBusiness: data.wardBusiness
            .split('\n')
            .map(description => description.trim())
            .filter(Boolean)
            .map(description => ({ description })),

        stakeBusiness: data.stakeBusiness,

        sacramentHymn: {
            number: Number(data.sacramentHymnNumber),
            title: data.sacramentHymnTitle,
        },

        speakers: data.speakers
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => {
                const [name = '', topic = '', type = 'speaker'] = line.split('|');

                return {
                    name: name.trim(),
                    topic: topic.trim(),
                    type: type.trim() as 'speaker' | 'musical-number',
                };
            }),

        closingHymn: {
            number: Number(data.closingHymnNumber),
            title: data.closingHymnTitle,
        },

        closingPrayer: data.closingPrayer,
    };
}

export async function createMeeting(
    _prevState: MeetingFormState,
    formData: FormData
): Promise<MeetingFormState> {
    const formValues = getFormData(formData);

    const validatedFields = MeetingFormSchema.safeParse(formValues);

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
            values: formValues,
        };
    }

    try {
        const meetingData = buildMeetingData(validatedFields.data);
        await addMeeting(meetingData);
    } catch (error) {
        console.error('Failed to create meeting:', error);

        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === '23505'
        ) {
            return {
                message: 'A meeting already exists for this date.',
                errors: {
                    date: ['A meeting already exists for this date.'],
                },
                values: formValues,
            };
        }

        throw new Error(
            'Something went wrong while creating the meeting. Please try again.'
        );
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    _prevState: MeetingFormState,
    formData: FormData
): Promise<MeetingFormState> {
    const formValues = getFormData(formData);

    const validatedFields = MeetingFormSchema.safeParse(formValues);

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
            values: formValues,
        };
    }
        
    try {
        const meetingData = buildMeetingData(validatedFields.data);
        const updatedMeeting = await updateMeetingInDb(id, meetingData);

        if (!updatedMeeting) {
            return {
                message: 'This meeting could not be found.',
            };
        }
    }   catch (error) {
        console.error('Failed to update meeting:', error);

        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === '23505'
        ) {
            return {
                message: 'A meeting already exists for this date.',
                errors: {
                    date: ['A meeting already exists for this date.'],
                },
                values: formValues,
            };
        }

        throw new Error(
            'Something went wrong while updating the meeting. Please try again.'
        );
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    redirect('/meetings');
}

export async function deleteMeeting(
    id: number,
    _formData: FormData
): Promise<void> {
    void _formData;
    try {
        const deleted = await deleteMeetingFromDb(id);

        if (!deleted) {
            throw new Error('Meeting not found.');
        }
    } catch (error) {
        console.error('Failed to delete meeting:', error);
        throw new Error('Something went wrong while deleting the meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}