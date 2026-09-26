"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

type SortOption = "duration" | "calories" | "rating";

function MyPlanContent() {
    const { planWorkouts, savedWorkouts, removeFromPlan, removeFromSaved } =
        useWorkout();
    const searchParams = useSearchParams();
    const router = useRouter();

    const tabParam = searchParams.get("tab");
    const activeTab: "plan" | "saved" = tabParam === "saved" ? "saved" : "plan";

    const [sortBy, setSortBy] = useState<SortOption>("duration");
    const [isLoading, setIsLoading] = useState(true);

    // Function to switch tabs by updating the URL search params
    const handleTabChange = (tab: "plan" | "saved") => {
        if (tab === "saved") {
            router.push("/my-plan?tab=saved");
        } else {
            router.push("/my-plan");
        }
    };

    // Smooth loading transition
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const currentList = activeTab === "plan" ? planWorkouts : savedWorkouts;

    // Live calculated stats summary
    const totalExercises = currentList.length;
    const totalMinutes = currentList.reduce(
        (acc, item) => acc + item.duration,
        0,
    );
    const totalCalories = currentList.reduce(
        (acc, item) => acc + item.caloriesBurned,
        0,
    );

    // Sorting list logic
    const sortedList = [...currentList].sort((a, b) => {
        if (sortBy === "duration") return b.duration - a.duration;
        if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh]">
            {/* Title & Subtitle */}
            <h1 className="font-black uppercase tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl">
                MY PLAN
            </h1>
            <p className="mt-2 text-sm text-gray-400 font-medium">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            {/* Metrics Summary Row (3 Stat Cards) */}
            <div className="mt-8 rounded-2xl border border-gray-800/80 bg-[#12141a] p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-gray-800/80">
                    {/* Exercises */}
                    <div className="flex flex-col sm:px-4 first:pl-0">
                        <span className="text-xs font-semibold text-gray-400">
                            Exercises
                        </span>
                        <span className="mt-2 text-4xl font-black text-[#ccff00]">
                            {totalExercises}
                        </span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col sm:px-6">
                        <span className="text-xs font-semibold text-gray-400">
                            Minutes
                        </span>
                        <span className="mt-2 text-4xl font-black text-white">
                            {totalMinutes}
                        </span>
                    </div>

                    {/* Calories */}
                    <div className="flex flex-col sm:px-6">
                        <span className="text-xs font-semibold text-gray-400">
                            Calories
                        </span>
                        <span className="mt-2 text-4xl font-black text-white">
                            {totalCalories}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Controls: Tabs & Sort Dropdown */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Tab Toggle Switch */}
                <div className="inline-flex rounded-xl bg-[#12141a] p-1.5 border border-gray-800/80 w-fit">
                    <button
                        onClick={() => handleTabChange("plan")}
                        className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                            activeTab === "plan"
                                ? "bg-[#1d270c] text-[#ccff00]"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => handleTabChange("saved")}
                        className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                            activeTab === "saved"
                                ? "bg-[#1d270c] text-[#ccff00]"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs font-medium text-gray-400">
                        Sort By
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setSortBy(e.target.value as SortOption)
                        }
                        className="rounded-xl border border-gray-800 bg-[#12141a] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-[#ccff00]"
                    >
                        <option value="duration">Duration</option>
                        <option value="calories">Calories</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            {/* List / Loading / Empty Content Section */}
            <div className="mt-6 space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center rounded-2xl border border-gray-800/80 bg-[#12141a] py-20">
                        <p className="text-sm font-semibold text-gray-400 animate-pulse">
                            Loading workouts…
                        </p>
                    </div>
                ) : sortedList.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800/80 bg-[#12141a] px-4 py-20 text-center">
                        <h3 className="font-black uppercase tracking-wider text-white text-xl sm:text-2xl">
                            NOTHING HERE YET
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
                            Browse the library and add a lift to get today
                            moving.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition-transform hover:scale-105 active:scale-95"
                        >
                            Go to workouts
                        </Link>
                    </div>
                ) : (
                    /* Workout Item Cards */
                    sortedList.map((item: Workout) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-800/80 bg-[#12141a] p-4 transition-all hover:border-gray-700"
                        >
                            {/* Thumbnail & Details */}
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-24 sm:h-24 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-gray-900">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-black uppercase tracking-tight text-white text-base sm:text-lg">
                                        {item.name}
                                    </h4>
                                    <p className="mt-0.5 text-xs text-gray-400 font-medium">
                                        {item.equipment}
                                    </p>

                                    {/* Inline Stats */}
                                    <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <svg
                                                className="h-3.5 w-3.5 stroke-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {item.duration} min
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <svg
                                                className="h-3.5 w-3.5 fill-gray-400"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.82-8.86 8.35-13.31.39-.39 1.01-.39 1.4 0C17.18 6.14 21 10.81 21 15c0 4.42-4.03 8-9 8zm0-18.78C8.19 8.1 5 12.01 5 15c0 3.31 3.13 6 7 6s7-2.69 7-6c0-2.99-3.19-6.9-7-10.78z" />
                                            </svg>
                                            {item.caloriesBurned} kcal
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <svg
                                                className="h-3.5 w-3.5 stroke-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                />
                                            </svg>
                                            {item.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 self-end sm:self-center w-full sm:w-auto justify-end">
                                {/* View Details */}
                                <Link
                                    href={`/workout/${item.id}`}
                                    className="rounded-xl border border-gray-700 bg-transparent px-4 py-2 text-xs font-bold text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
                                >
                                    View Details
                                </Link>

                                {/* Mark as Done Button */}
                                {activeTab === "plan" && (
                                    <button
                                        onClick={() =>
                                            removeFromPlan(item.id, true)
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#ccff00] px-4 py-2 text-xs font-bold text-black transition-transform hover:bg-[#b8e600] active:scale-95"
                                    >
                                        <svg
                                            className="h-3.5 w-3.5"
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
                                        <span>Mark as Done</span>
                                    </button>
                                )}

                                {/* Remove Icon Button */}
                                <button
                                    onClick={() =>
                                        activeTab === "plan"
                                            ? removeFromPlan(item.id)
                                            : removeFromSaved(item.id)
                                    }
                                    className="p-1.5 text-gray-500 hover:text-white transition-colors"
                                    aria-label="Remove workout"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}

export default function MyPlanPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0d0e12]" />}>
            <MyPlanContent />
        </Suspense>
    );
}
