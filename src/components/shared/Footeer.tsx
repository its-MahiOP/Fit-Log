import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-900/60 bg-[#0d0e12] px-6 py-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                {/* Left Side: Brand Logo + FITLOG */}
                <Link href="/" className="flex items-center gap-2.5">
                    <Image
                        src={logo}
                        alt="FITLOG Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    <span className="text-lg font-extrabold tracking-wider text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Right Side: Copyright Text */}
                <p className="text-xs text-gray-400 font-normal tracking-wide">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
