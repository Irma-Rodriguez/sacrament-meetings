'use client';

import { useActionState } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import {
    createMeeting,
    updateMeeting,
    type MeetingFormState,
} from '@/lib/actions';

interface MeetingFormProps {
    meeting?: SacramentMeeting;
}

const initialState: MeetingFormState = {
    message: '',
    errors: {},
};

function ErrorMessage({
    field,
    errors,
}: {
    field: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
}) {
    const fieldErrors = errors?.[field];

    return (
        <div
            id={`${field}-error`}
            aria-live="polite"
            className="text-sm text-red-600 mt-1"
        >
            {fieldErrors?.map((error) => (
                <p key={error}>{error}</p>
            ))}
        </div>
    );
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
    const action = meeting
        ? updateMeeting.bind(null, meeting.id)
        : createMeeting;

    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    const fieldClass =
        'w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none';

    return (
        <form action={formAction} className="space-y-6">
            {state.message && (
                <p
                    role="status"
                    aria-live="polite"
                    className="rounded-lg bg-red-50 p-3 text-red-700"
                >
                    {state.message}
                </p>
            )}

            <div>
                <label htmlFor="date" className="block font-semibold mb-2">
                    Meeting Date
                </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={String(state.values?.date ?? meeting?.date ?? '')}
                    aria-describedby="date-error"
                    className={fieldClass}
                />
                <ErrorMessage field="date" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="meetingType" className="block font-semibold mb-2">
                    Meeting Type
                </label>
                <select
                    id="meetingType"
                    name="meetingType"
                    required
                    defaultValue={String(state.values?.meetingType ?? meeting?.meetingType ?? 'regular')}
                    aria-describedby="meetingType-error"
                    className={fieldClass}
                >
                    <option value="regular">Regular</option>
                    <option value="testimony">Testimony</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                    <option value="special">Special</option>
                </select>
                <ErrorMessage field="meetingType" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="presiding" className="block font-semibold mb-2">
                    Presiding
                </label>
                <input
                    id="presiding"
                    name="presiding"
                    required
                    defaultValue={
                        String(state.values?.presiding ?? meeting?.presiding ?? '')
                    }
                    aria-describedby="presiding-error"
                    className={fieldClass}
                />
                <ErrorMessage field="presiding" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="conducting" className="block font-semibold mb-2">
                    Conducting
                </label>
                <input
                    id="conducting"
                    name="conducting"
                    required
                    defaultValue={String(state.values?.conducting ?? meeting?.conducting ?? '')}
                    aria-describedby="conducting-error"
                    className={fieldClass}
                />
                <ErrorMessage field="conducting" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="announcements" className="block font-semibold mb-2">
                    Announcements
                </label>
                <textarea
                    id="announcements"
                    name="announcements"
                    rows={3}
                    placeholder="Enter one announcement per line"
                    defaultValue={String(state.values?.announcements ?? meeting?.announcements?.join('\n') ?? '')}
                    aria-describedby="announcements-error"
                    className={fieldClass}
                />
                <ErrorMessage field="announcements" errors={state.errors} />
            </div>

            <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
                Opening Hymn and Prayer
            </h2>

            <div>
                <label htmlFor="openingHymnNumber" className="block font-semibold mb-2">
                    Opening Hymn Number
                </label>
                <input
                    id="openingHymnNumber"
                    name="openingHymnNumber"
                    type="number"
                    min="1"
                    required
                    defaultValue={String(state.values?.openingHymnNumber ?? meeting?.openingHymn.number ?? '')}
                    aria-describedby="openingHymnNumber-error"
                    className={fieldClass}
                />
                <ErrorMessage field="openingHymnNumber" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="openingHymnTitle" className="block font-semibold mb-2">
                    Opening Hymn Title
                </label>
                <input
                    id="openingHymnTitle"
                    name="openingHymnTitle"
                    required
                    defaultValue={String(state.values?.openingHymnTitle ?? meeting?.openingHymn.title ?? '')}
                    aria-describedby="openingHymnTitle-error"
                    className={fieldClass}
                />
                <ErrorMessage field="openingHymnTitle" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="openingPrayer" className="block font-semibold mb-2">
                    Opening Prayer
                </label>
                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    required
                    defaultValue={String(state.values?.openingPrayer ?? meeting?.openingPrayer ?? '')}
                    aria-describedby="openingPrayer-error"
                    className={fieldClass}
                />
                <ErrorMessage field="openingPrayer" errors={state.errors} />
            </div>

            <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
                Ward Business
            </h2>

            <div>
                <label htmlFor="wardBusiness" className="block font-semibold mb-2">
                    Ward Business
                </label>
                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={3}
                    placeholder="Enter one item per line"
                    defaultValue={
                        String(
                            state.values?.wardBusiness ??
                            meeting?.wardBusiness.map(item => item.description).join('\n') ??
                            ''
                        )
                    }
                    aria-describedby="wardBusiness-error"
                    className={fieldClass}
                />
                <ErrorMessage field="wardBusiness" errors={state.errors} />
            </div>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    name="stakeBusiness"
                    defaultChecked={
                        state.values?.stakeBusiness !== undefined
                            ? state.values.stakeBusiness === true
                            : meeting?.stakeBusiness ?? false
                    }
                    className="h-5 w-5"
                />
                <span className="font-semibold">
                    Stake Business
                </span>
            </label>

            <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
                Sacrament Hymn
            </h2>

            <div>
                <label htmlFor="sacramentHymnNumber" className="block font-semibold mb-2">
                    Sacrament Hymn Number
                </label>
                <input
                    id="sacramentHymnNumber"
                    name="sacramentHymnNumber"
                    type="number"
                    min="1"
                    required
                    defaultValue={String(state.values?.sacramentHymnNumber ?? meeting?.sacramentHymn.number ?? '')}
                    aria-describedby="sacramentHymnNumber-error"
                    className={fieldClass}
                />
                <ErrorMessage field="sacramentHymnNumber" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="sacramentHymnTitle" className="block font-semibold mb-2">
                    Sacrament Hymn Title
                </label>
                <input
                    id="sacramentHymnTitle"
                    name="sacramentHymnTitle"
                    required
                    defaultValue={String(state.values?.sacramentHymnTitle ?? meeting?.sacramentHymn.title ?? '')}
                    aria-describedby="sacramentHymnTitle-error"
                    className={fieldClass}
                />
                <ErrorMessage field="sacramentHymnTitle" errors={state.errors} />
            </div>

            <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
                Speakers
            </h2>

            <div>
                <label htmlFor="speakers" className="block font-semibold mb-2">
                    Speakers and Musical Numbers
                </label>
                <textarea
                    id="speakers"
                    name="speakers"
                    rows={5}
                    placeholder={'One per line: Name|Topic|speaker\nYouth Choir|Love One Another|musical-number'}
                    defaultValue={String(state.values?.speakers ??meeting?.speakers.map(item =>`${item.name}|${item.topic}|${item.type}`).join('\n') ??'')}
                    aria-describedby="speakers-error speakers-help"
                    className={fieldClass}

                />
                <p id="speakers-help" className="text-sm text-gray-500 mt-1">
                    Enter one entry per line using:
                    <br />
                    Name|Topic|speaker
                    <br />
                    Name|Song Title|musical-number
                </p>
                <ErrorMessage field="speakers" errors={state.errors} />
            </div>

            <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
                Closing Hymn and Prayer
            </h2>

            <div>
                <label htmlFor="closingHymnNumber" className="block font-semibold mb-2">
                    Closing Hymn Number
                </label>
                <input
                    id="closingHymnNumber"
                    name="closingHymnNumber"
                    type="number"
                    min="1"
                    required
                    defaultValue={String(state.values?.closingHymnNumber ?? meeting?.closingHymn.number ?? '')}
                    aria-describedby="closingHymnNumber-error"
                    className={fieldClass}
                />
                <ErrorMessage field="closingHymnNumber" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="closingHymnTitle" className="block font-semibold mb-2">
                    Closing Hymn Title
                </label>
                <input
                    id="closingHymnTitle"
                    name="closingHymnTitle"
                    required
                    defaultValue={String(state.values?.closingHymnTitle ?? meeting?.closingHymn.title ?? '')}
                    aria-describedby="closingHymnTitle-error"
                    className={fieldClass}
                />
                <ErrorMessage field="closingHymnTitle" errors={state.errors} />
            </div>

            <div>
                <label htmlFor="closingPrayer" className="block font-semibold mb-2">
                    Closing Prayer
                </label>
                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    required
                    defaultValue={String(state.values?.closingPrayer ?? meeting?.closingPrayer ?? '')}
                    aria-describedby="closingPrayer-error"
                    className={fieldClass}
                />
                <ErrorMessage field="closingPrayer" errors={state.errors} />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
            >
                {isPending
                    ? 'Saving...'
                    : meeting
                        ? 'Update Meeting'
                        : 'Create Meeting'}
            </button>
        </form>
    );
}