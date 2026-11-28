import { logout } from '@/lib/auth-actions';

export default function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="font-medium text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition-colors"
            >
                Log Out
            </button>
        </form>
    );
}
