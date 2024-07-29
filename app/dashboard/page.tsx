// /app/dashboard/page.tsx
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

const DashboardPage = () => {
  return (
    <div>
      <SignedIn>
        {/* <h1>Welcome to your Dashboard</h1> */}
        {/* <UserButton /> */}
        {/* Add other dashboard components here */}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default DashboardPage;
