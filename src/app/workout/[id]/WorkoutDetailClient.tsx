"use client";

import Image from "next/image";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutDetailClientProps {
    workout: Workout;
}

const WorkoutDetailClient = ({ workout }: WorkoutDetailClientProps) => {
    const { addToPlan, addToSaved } = useWorkout();

    const specs = [
        { label: "EQUIPMENT", value: workout.equipment },
        { label: "DIFFICULTY", value: workout.difficulty },
        { label: "SETS", value: workout.sets },
        { label: "REPS", value: workout.reps },
        { label: "DURATION", value: `${workout.duration} min` },
        { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
        { label: "RATING", value: workout.rating },
    ];

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
                {/* Left Side */}
                <div className="relative h-100 w-full overflow-hidden rounded-2xl bg-[#12141a] sm:h-125 lg:col-span-5 lg:h-155">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                </div>

                {/* Right Side */}
                <div className="flex flex-col lg:col-span-7">
                    {/* Title & Subtitle */}
                    <h1 className="font-black uppercase tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl">
                        {workout.name}
                    </h1>
                    <p className="mt-3 text-sm text-gray-400 font-medium leading-relaxed sm:text-base">
                        {workout.description}
                    </p>

                    {/* Category Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {workout.muscleGroups.map((group, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-[#ccff00] px-3.5 py-1 text-xs font-black uppercase text-black"
                            >
                                {group}
                            </span>
                        ))}
                    </div>

                    {/* Specs Panel */}
                    <div className="mt-8 rounded-2xl border border-gray-800/80 bg-[#12141a]/60 p-5 divide-y divide-gray-800/60">
                        {specs.map((spec, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between py-2.5 text-xs font-semibold"
                            >
                                <span className="tracking-wider text-gray-400 uppercase">
                                    {spec.label}
                                </span>
                                <span className="text-white font-bold">
                                    {spec.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Instructions Section */}
                    <div className="mt-8">
                        <h3 className="font-black uppercase tracking-wider text-white text-sm">
                            INSTRUCTIONS
                        </h3>
                        <ol className="mt-4 space-y-3 text-xs sm:text-sm text-gray-300">
                            {workout.instructions.map((step, idx) => (
                                <li
                                    key={idx}
                                    className="flex gap-2.5 leading-relaxed"
                                >
                                    <span className="font-bold text-white">
                                        {idx + 1}.
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => addToPlan(workout)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-xs font-black uppercase text-black transition-all hover:bg-[#b8e600] active:scale-95"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span>Add to today&apos;s plan</span>
                        </button>

                        <button
                            onClick={() => addToSaved(workout)}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-transparent px-6 py-3.5 text-xs font-black uppercase text-gray-200 transition-all hover:border-gray-500 hover:bg-gray-800/50 active:scale-95"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                            </svg>
                            <span>Save for later</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WorkoutDetailClient;
