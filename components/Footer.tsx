export default function Footer() {
    const currentYear = 2026;

    return (
        <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm">
                    © {currentYear} Tunja Ward
                </p>

                <p className="text-xs mt-2">
                    Sacrament Meeting Planner
                </p>
            </div>
        </footer>
    );
}