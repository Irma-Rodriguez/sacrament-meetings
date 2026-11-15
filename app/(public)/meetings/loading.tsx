export default function MeetingsLoading() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin"></div>

            <p className="mt-4 text-blue-900 font-semibold">
                Loading sacrament meetings...
            </p>
        </div>
    );
}
