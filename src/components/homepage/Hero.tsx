"use client";

import Image from "next/image";
import banner from "@/assets/banner.png";

const Hero = () => {
    const scrollToLibrary = () => {
        const librarySection = document.getElementById("library");
        if (librarySection) {
            librarySection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-gray-800/80 bg-[#12141a] px-8 py-12 md:px-12 md:py-16 lg:px-16">
                <div className="grid items-center gap-8 lg:grid-cols-12">
                    {/* Left Content Area */}
                    <div className="z-10 lg:col-span-7">
                        {/* Eyebrow Text */}
                        <span className="text-xs font-bold tracking-widest text-[#ccff00]">
                            WORKOUT LIBRARY
                        </span>

                        {/* Main Heading */}
                        <h1 className="mt-4 font-black uppercase tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                            TRAIN WITH INTENT. LOG EVERY SET.
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                            FitLog is a dark, no-nonsense gym companion: pick a
                            lift, lock it into today&apos;s plan, and watch the
                            week&apos;s work add up.
                        </p>

                        {/* Primary CTA Button */}
                        <div className="mt-8">
                            <button
                                onClick={scrollToLibrary}
                                className="inline-flex items-center justify-center cursor-pointer rounded-lg bg-[#ccff00] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-200 hover:bg-[#b8e600] active:scale-95"
                            >
                                BROWSE WORKOUTS
                            </button>
                        </div>
                    </div>

                    {/* Right Banner Image */}
                    <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
                        <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-100">
                            <Image
                                src={banner}
                                alt="FitLog Training Hero Image"
                                fill
                                className="object-contain object-center lg:object-right"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
