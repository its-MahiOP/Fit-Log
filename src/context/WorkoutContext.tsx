"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";

interface WorkoutContextType {
    planWorkouts: Workout[];
    savedWorkouts: Workout[];
    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
    toastMessage: string | null;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const addToPlan = (workout: Workout) => {
        if (planWorkouts.some((item) => item.id === workout.id)) {
            showToast(`${workout.name} is already in your plan!`);
            return;
        }
        setPlanWorkouts((prev) => [...prev, workout]);
        showToast(`Added "${workout.name}" to today's plan`);
    };

    const addToSaved = (workout: Workout) => {
        if (savedWorkouts.some((item) => item.id === workout.id)) {
            showToast(`${workout.name} is already saved!`);
            return;
        }
        setSavedWorkouts((prev) => [...prev, workout]);
        showToast(`Saved "${workout.name}" for later`);
    };

    const removeFromPlan = (id: number) => {
        setPlanWorkouts((prev) => prev.filter((item) => item.id !== id));
    };

    const removeFromSaved = (id: number) => {
        setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <WorkoutContext.Provider
            value={{
                planWorkouts,
                savedWorkouts,
                addToPlan,
                addToSaved,
                removeFromPlan,
                removeFromSaved,
                toastMessage,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
};
