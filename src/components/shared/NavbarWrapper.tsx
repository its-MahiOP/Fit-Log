"use client";

import Navbar from "./Navbar";
import { useWorkout } from "@/context/WorkoutContext";

const NavbarWrapper = () => {
    const { planWorkouts, savedWorkouts } = useWorkout();

    return (
        <Navbar
            planCount={planWorkouts.length}
            savedCount={savedWorkouts.length}
        />
    );
};

export default NavbarWrapper;
