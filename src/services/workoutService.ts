import { Workout } from "@/types/workout";

export async function getWorkouts(): Promise<Workout[]> {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
        next: { revalidate: 3600 }, // Cache revalidation for 1 hour
    });

    if (!res.ok) {
        throw new Error("Failed to fetch workouts");
    }

    return res.json();
}
