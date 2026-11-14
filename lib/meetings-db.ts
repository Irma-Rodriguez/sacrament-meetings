import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-11-08',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: [
            'Ward temple night: May 10',
            'Youth activity: May 15',
        ],
        openingHymn: { number: 2, title: 'The Spirit of God', },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' },],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering',},
        speakers: [
            {
                name: 'Sister Brown',
                topic: 'Faith in Jesus Christ',
                type: 'speaker',
            },
            {
                name: 'Youth Choir',
                topic: 'I Am a Child of God',
                type: 'musical-number',
            },
            {
                name: 'Brother Davis',
                topic: 'Following the Savior',
                type: 'speaker',
            },
        ],
        closingHymn: { number: 31,title: 'O God, Our Help in Ages Past',},
        closingPrayer: 'Brother Davis',
    },
    {
        id: 2,
        date: '2026-11-15',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Sister Johnson',
        announcements: ['Mother’s Day celebration'],
        openingHymn: {number: 89, title: 'The Lord Is My Light',},
        openingPrayer: 'Sister Miller',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 193, title: 'I Stand All Amazed',},
        speakers: [
            {
                name: 'Ward Members',
                topic: 'Personal testimonies',
                type: 'speaker',
            },
        ],
        closingHymn: { number: 152, title: 'God Be with You Till We Meet Again',},
        closingPrayer: 'Brother Wilson',
    },
    {
        id: 3,
        date: '2026-05-17',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Brown',
        announcements: ['Ward picnic: May 23'],
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet',},
        openingPrayer: 'Brother Taylor',
        wardBusiness: [
            { description: 'Primary activity announcement' },
        ],
        stakeBusiness: true,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now',},
        speakers: [
            {
                name: 'Sister Anderson',
                topic: 'The Power of Prayer',
                type: 'speaker',
            },
            {
                name: 'Ward Choir',
                topic: 'Love One Another',
                type: 'musical-number',
            },
        ],
        closingHymn: { number: 85, title: 'How Firm a Foundation', },
        closingPrayer: 'Sister Clark',
    },
    {
        id: 4,
        date: '2026-05-24',
        meetingType: 'stake',
        presiding: 'Stake President Lee',
        conducting: 'Brother White',
        announcements: ['Stake conference preparation'],
        openingHymn: {number: 27, title: 'Praise to the Man',},
        openingPrayer: 'Brother Harris',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King',},
        speakers: [
            {
                name: 'President Lee',
                topic: 'Service and Discipleship',
                type: 'speaker',
            },
        ],
        closingHymn: { number: 98, title: 'I Need Thee Every Hour',},
        closingPrayer: 'Sister Adams',
    },
    {
        id: 5,
        date: '2026-05-31',
        meetingType: 'general',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: ['Upcoming summer activities'],
        openingHymn: {number: 3, title: 'Now Let Us Rejoice',},
        openingPrayer: 'Sister Green',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 174, title: 'While of These Emblems We Partake',},
        speakers: [
            {
                name: 'Sister White',
                topic: 'Finding Peace Through Christ',
                type: 'speaker',
            },
        ],
        closingHymn: { number: 100, title: 'Nearer, My God, to Thee', },
        closingPrayer: 'Brother Clark',
    },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}