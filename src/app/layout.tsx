import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/shared/NavbarWrapper";
import Footer from "@/components/shared/Footer";
import Toast from "@/components/shared/Toast";
import { WorkoutProvider } from "@/context/WorkoutContext";

export const metadata: Metadata = {
    title: "FITLOG - Workout Library",
    description: "Train hard, log honest.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#0d0e12] text-white antialiased">
                <WorkoutProvider>
                    <NavbarWrapper />
                    {children}
                    <Footer />
                    <Toast />
                </WorkoutProvider>
            </body>
        </html>
    );
}
