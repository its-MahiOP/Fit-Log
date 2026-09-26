"use client";

import { useWorkout } from "@/context/WorkoutContext";

const Toast = () => {
    const { toastMessage } = useWorkout();

    if (!toastMessage) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black shadow-2xl transition-all duration-300">
            <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                />
            </svg>
            <span>{toastMessage}</span>
        </div>
    );
};

export default Toast;
