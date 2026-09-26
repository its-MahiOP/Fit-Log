import { getWorkoutById } from "@/services/workoutService";
import WorkoutDetailClient from "./WorkoutDetailClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
    const { id } = await params;
    const workout = await getWorkoutById(id);

    return <WorkoutDetailClient workout={workout} />;
}
