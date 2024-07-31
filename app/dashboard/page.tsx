'use client'
import { UserButton, SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const { user } = useUser()
  return (
    <div>
      <SignedIn>
        <h1 className='text-7xl font-bold text-blue-600 m-6 p-10'>Hello {user?.firstName}</h1>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default DashboardPage;
