import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
    workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800/80 bg-[#12141a] p-4 transition-all duration-300 hover:border-gray-700 hover:bg-[#161922] hover:shadow-xl"
        >
            <div>
                {/* Card Top: Image Container */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-900">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Muscle Group Category Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group, idx) => (
                        <span
                            key={idx}
                            className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
                        >
                            {group}
                        </span>
                    ))}
                </div>

                {/* Workout Name */}
                <h3 className="mt-3 font-black uppercase tracking-tight text-white text-lg group-hover:text-[#ccff00] transition-colors">
                    {workout.name}
                </h3>

                {/* Equipment Line */}
                <p className="mt-1 text-xs text-gray-400 font-medium">
                    {workout.equipment}
                </p>
            </div>

            {/* Stats Row */}
            <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-gray-400 border-t border-gray-800/60 pt-3">
                {/* Duration */}
                <div className="flex items-center gap-1.5">
                    <svg
                        className="h-4 w-4 stroke-gray-400"
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
                    <span>{workout.duration} min</span>
                </div>

                {/* Calories */}
                <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 fill-gray-400" viewBox="0 0 24 24">
                        <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.82-8.86 8.35-13.31.39-.39 1.01-.39 1.4 0C17.18 6.14 21 10.81 21 15c0 4.42-4.03 8-9 8zm0-18.78C8.19 8.1 5 12.01 5 15c0 3.31 3.13 6 7 6s7-2.69 7-6c0-2.99-3.19-6.9-7-10.78z" />
                    </svg>
                    <span>{workout.caloriesBurned} kcal</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                    <svg
                        className="h-4 w-4 stroke-gray-400"
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
                    <span>{workout.rating}</span>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;
