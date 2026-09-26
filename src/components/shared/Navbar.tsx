"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/logo.png";

interface NavbarProps {
    planCount?: number;
    savedCount?: number;
}

const Navbar = ({ planCount = 0, savedCount = 0 }: NavbarProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Workouts", href: "/" },
        { name: "My Plan", href: "/my-plan" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-900/50 bg-[#0d0e12] px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                {/* Responsive Hamburger Menu & Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none md:hidden"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.8"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.8"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </button>

                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src={logo}
                            alt="FITLOG Logo"
                            width={28}
                            height={28}
                            className="object-contain"
                            priority
                        />
                        <span className="text-xl font-extrabold tracking-wider text-white">
                            FITLOG
                        </span>
                    </Link>
                </div>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden items-center gap-3 md:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? "bg-[#1d270c] text-[#ccff00]"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Status Badges */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    {/* Plan Badge Counter */}
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-gray-300 transition-opacity hover:opacity-80"
                    >
                        <span>Plan</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                            {planCount}
                        </span>
                    </Link>

                    {/* Saved Badge Counter */}
                    <Link
                        href="/my-plan?tab=saved"
                        className="flex items-center gap-2 text-gray-300 transition-opacity hover:opacity-80"
                    >
                        <span>Saved</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 bg-transparent text-xs font-semibold text-gray-300">
                            {savedCount}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Responsive Dropdown */}
            {isOpen && (
                <div
                    className="mt-3 border-t border-gray-800 pt-3 md:hidden"
                    id="mobile-menu"
                >
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                                        isActive
                                            ? "bg-[#1d270c] text-[#ccff00]"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
