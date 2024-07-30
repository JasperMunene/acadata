import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export const NavDesktop = () => {
    return (
        <div className="hidden lg:flex lg:items-center gap-6 text-sm">
            <SignedOut>
            <Link 
                href='/sign-up' 
                className="text-center bg-[#3A5AFF] hover:bg-[#3A5AFF]/90 py-2 px-6 rounded-lg text-white shadow-md transition duration-300 ease-in-out"
            >
                Sign Up
            </Link>
            <Link 
                href='/sign-in' 
                className="text-center border border-gray-300 py-2 px-6 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
                Sign In
            </Link>
            </SignedOut>
            <SignedIn>
          <Link 
          href="/dashboard"
          className="text-center bg-[#3A5AFF] hover:bg-[#3A5AFF]/90 py-4 px-8 rounded-lg text-white shadow-md transition duration-300 ease-in-out"
          >Dashboard</Link>
        </SignedIn>
        </div>
    );
};
