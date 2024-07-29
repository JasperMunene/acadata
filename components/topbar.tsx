import { NavMobile } from "./nav-mobile";
import { NavDesktop } from "./nav-desktop";
import Link from "next/link";

export const Topbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-sm z-50">
            <nav className="container mx-auto flex items-center justify-between py-3 lg:py-5 px-4 lg:px-8">
                <Link href='/' className="text-4xl font-mono font-semibold text-[#3A5AFF]">
                    AcaData
                </Link>
                <div className="lg:hidden">
                    <NavMobile />
                </div>
                <div className="hidden lg:flex">
                    <NavDesktop />
                </div>
            </nav>
        </div>
    );
};
