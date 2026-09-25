// src/components/home/WorkoutGrid.tsx
import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutGridProps {
    workouts: Workout[];
}

const WorkoutGrid = ({ workouts }: WorkoutGridProps) => {
    return (
        <section
            id="library"
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
            {/* Section Header */}
            <div className="mb-8">
                <h2 className="font-black uppercase tracking-tight text-white text-3xl sm:text-4xl">
                    THE LIBRARY
                </h2>
                <p className="mt-2 text-sm text-gray-400 font-medium">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* 3x4 Responsive Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
};

export default WorkoutGrid;
