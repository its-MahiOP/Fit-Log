import Hero from "@/components/homepage/Hero";
import WorkoutGrid from "@/components/homepage/WorkoutGrid";
import { getWorkouts } from "@/services/workoutService";

export default async function HomePage() {
    const workouts = await getWorkouts();

    return (
        <main className="min-h-screen bg-[#0d0e12] pb-16">
            <Hero />
            <WorkoutGrid workouts={workouts} />
        </main>
    );
}
