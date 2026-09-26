import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center bg-[#0d0e12]">
            <span className="text-6xl font-black text-[#ccff00]">404</span>
            <h1 className="mt-4 text-2xl font-black uppercase tracking-wider text-white sm:text-3xl">
                Page Not Found
            </h1>
            <p className="mt-2 text-sm text-gray-400">
                The workout route you are looking for does not exist or has been
                moved.
            </p>
            <Link
                href="/"
                className="mt-6 rounded-xl bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition-transform hover:scale-105"
            >
                Return to Workouts
            </Link>
        </div>
    );
}
