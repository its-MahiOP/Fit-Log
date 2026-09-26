import { Workout } from "@/types/workout";

export async function getWorkouts(): Promise<Workout[]> {
    const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    return res.json();
}

export async function getWorkoutById(id: string): Promise<Workout> {
    const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch workout details");
    return res.json();
}
