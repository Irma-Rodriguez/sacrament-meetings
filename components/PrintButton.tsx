'use client';

export default function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
        >
            Print Meeting Program
        </button>
    );
}