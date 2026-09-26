export default function Loading() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#0d0e12]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ccff00] border-t-transparent" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                Loading Workouts...
            </p>
        </div>
    );
}
