"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";

interface WorkoutContextType {
    planWorkouts: Workout[];
    savedWorkouts: Workout[];
    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: number, isMarkAsDone?: boolean) => void;
    removeFromSaved: (id: number) => void;
    toastMessage: string | null;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Lazy initial state for planWorkouts
    const [planWorkouts, setPlanWorkouts] = useState<Workout[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const savedPlan = localStorage.getItem("fitlog_plan");
            return savedPlan ? JSON.parse(savedPlan) : [];
        } catch {
            return [];
        }
    });

    // Lazy initial state for savedWorkouts
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const savedSaved = localStorage.getItem("fitlog_saved");
            return savedSaved ? JSON.parse(savedSaved) : [];
        } catch {
            return [];
        }
    });

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Sync state changes to localStorage whenever state updates
    useEffect(() => {
        try {
            localStorage.setItem("fitlog_plan", JSON.stringify(planWorkouts));
        } catch {
            // Storage access blocked or quota exceeded
        }
    }, [planWorkouts]);

    useEffect(() => {
        try {
            localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
        } catch {
            // Storage access blocked or quota exceeded
        }
    }, [savedWorkouts]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const addToPlan = (workout: Workout) => {
        if (planWorkouts.length >= 5) {
            showToast("Daily limit reached! (Cap of 5 workouts)");
            return;
        }
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

    const removeFromPlan = (id: number, isMarkAsDone: boolean = false) => {
        const item = planWorkouts.find((w) => w.id === id);
        setPlanWorkouts((prev) => prev.filter((w) => w.id !== id));
        if (item) {
            if (isMarkAsDone) {
                showToast(`Completed "${item.name}"! Great work!`);
            } else {
                showToast(`Removed "${item.name}" from today's plan`);
            }
        }
    };

    const removeFromSaved = (id: number) => {
        const item = savedWorkouts.find((w) => w.id === id);
        setSavedWorkouts((prev) => prev.filter((w) => w.id !== id));
        if (item) {
            showToast(`Removed "${item.name}" from saved list`);
        }
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
