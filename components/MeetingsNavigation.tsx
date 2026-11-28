import { auth } from '@/auth';
import NavLinks from '@/components/NavLinks';

export default async function MeetingsNavigation() {
    const session = await auth();

    return (
        <NavLinks isLoggedIn={!!session?.user} />
    );
}
